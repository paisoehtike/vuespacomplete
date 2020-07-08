<template>
    <div class="home-customer-row">
        <Customer @click.native="type !== 'team' ? toOrder(request, $event) : toTeamOrder(request)" v-for="(request, index) in requests" :key="index">
          <CustomerHeader :id="request.customer" :step="request.request_type"></CustomerHeader>

          <CustomerTypeChip v-if="request.customer_type != null" :value="request.customer_type.name" slot="customer-chip"></CustomerTypeChip>
          <OrderStepChip v-if="request.complete_at_by_5BB != null" :status="'Finish'" :value="'Finish'" slot="order-chip"></OrderStepChip>
          <OrderStepChip v-else-if="request.installation_step != null && request.complete_at_by_5BB == null" :status="request.status" :value="request.installation_step.name" slot="order-chip"></OrderStepChip>

          <CustomerIssueDate v-if="request.created_at != null" slot="customer-date">
            <!-- <span>{{customer.date}}</span> -->
            <template
              v-slot:lsp-accept-date
              v-if="request.due_date != null"
              >{{request.due_date | format-date}}</template>
            <template
              v-slot:priority-date
              v-if="request.priority_level != null && request.priority_level.name != 'Default'"
            >{{request.priority_level.name}} </template>
            <template v-slot:issue v-if="request.estimated_issue != null">{{ request.estimated_issue.name }}</template>
          </CustomerIssueDate>

          <CustomerDetailChip
            slot="customer-detail-chip"
            :value="request.name"
            :address="request"
            :remark="request.remark"
          ></CustomerDetailChip>
          <CustomerHomeFooterButton v-show="type !== 'team'" slot="customer-home-footer">
            <template v-if="request.lsp_team != null" v-slot:assign>{{ request.lsp_team.name }}</template>
            <template v-else v-slot:assign>Not Assigned</template>

            <template v-if="request.lsp_accepted_at == null && isHistory == false" v-slot:isAccept>
              <a class="btn" id="accept">Accept</a>
            </template>
            <template v-else-if="request.lsp_team && isHistory == false" v-slot:isAccept>
              <a class="btn" id="assignOrSwitch">Switch Team</a>
            </template>
            <template v-else-if="!request.lsp_team && isHistory == false" v-slot:isAccept>
              <a class="btn" id="assignOrSwitch">Assign Team</a>
            </template>
          </CustomerHomeFooterButton>
        </Customer>
        
        <p v-if="noRecordYet" class="no-record-yet-message">No Record Yet!</p>

        <transition name="fade" appear>
          <div class="modal-box1" v-if="showModal" @click="showModal = false"></div>
        </transition>

        <transition name="slide" appear>
          <div class="modal-box" v-if="showModal">
            <div class="assign-team-modal-header">
              <CustomerTypeChip
                v-if="request.customer_type != null"
                :value="request.customer_type.name"
                slot="customer-chip"
              ></CustomerTypeChip>
              <OrderStepChip
                v-if="request.installation_step != null"
                :value="request.installation_step.name"
                slot="order-chip"
              ></OrderStepChip>
            </div>
            <div class="customer-request-detail">
              <div>
                <CustomerHeader :id="request.customer" :step="request.type"></CustomerHeader>
              </div>
              <div class="customer-request-date">
                <CustomerIssueDate slot="customer-date">
                  <template
                    v-slot:lsp-accept-date
                    v-if="request.due_date != null"
                  >{{request.due_date | format-date}}</template>
                  <template
                    v-slot:priority-date
                    v-if="request.priority_level != null"
                  >{{request.priority_level.name}}</template>
                  <template v-slot:issue v-if="request.estimated_issue != null">{{ request.estimated_issue.name }}</template>
                </CustomerIssueDate>
              </div>
            </div>
            <CustomerDetailChip
              slot="customer-detail-chip"
              :value="request.name"
              :address="request"
              :remark="request.remark"
            ></CustomerDetailChip>
            <h2 v-if="request.lsp_team != null">Assigned Team :</h2>
            <Teams v-if="request.lsp_team != null">
              <template v-slot:team-name>{{request.lsp_team.name}}</template>

              <template v-slot:customer-name>{{request.lsp_team.leader_name}}</template>

              <template v-slot:total-remaining>{{request.lsp_team.remaining_jobs}}</template>

              <template v-slot:total-man-power>{{request.lsp_team.man_power}}</template>

              <template v-slot:total-complete>{{request.lsp_team.completed_jobs}}</template>
            </Teams>
            <h2>Select Team to Assign :</h2>
            <div class="assign-team-wrapper">
              <Teams
                @click.native="teamSelect(team, index)"
                :class="{teamClick:selected == index}"
                v-for="(team, index) in availableTeams"
                :key="index"
              >
                <template v-slot:team-name>{{team.name}}</template>

                <template v-slot:customer-name>{{team.leader_name}}</template>

                <template v-slot:total-remaining>{{team.remaining_jobs}}</template>

                <template v-slot:total-man-power>{{team.man_power}}</template>

                <template v-slot:total-complete>{{team.completed_jobs}}</template>
              </Teams>
            </div>
            <div class="modal-button-box">
              <button @click="showModal = false" class="cancel-button">Cancel</button>
              <button @click="assignTeam" class="remark-save-btn">Done</button>
            </div>
          </div>
        </transition>
    </div>
</template>
<script>
const axios = require("axios");
import Customer from "./../reuseable-home/CustomerComponent";
import CustomerTypeChip from "./../reuseable-component/CustomerTypeChipComponent";
import OrderStepChip from "./../reuseable-component/OrderStepChipComponent";
import CustomerDetailChip from "./../reuseable-component/CustomerDetailChipComponent";
import CustomerIssueDate from "./../reuseable-component/CustomerIssueDateComponent";
import CustomerHomeFooterButton from "./../reuseable-component/CustomerHomeFooterButton";
import CustomerHeader from "./../reuseable-home/CustomerHeaderComponent";
import Teams from "./../lsp-home-team/TeamComponent";

export default {
  props: ["request_type", "type", "status", "isHistory"],
  components: {
    Customer,
    CustomerTypeChip,
    OrderStepChip,
    CustomerDetailChip,
    CustomerIssueDate,
    CustomerHomeFooterButton,
    CustomerHeader,
    Teams,
  },
  data() {
    return {
      requests: [],
      page: 1,
      total_page: null,
      showModal: false,
      selected: null,
      teamId: null,
      requesterType: null,
      requestId: null,
      request: null,
      availableTeams: [],
      errorMessage: "Something Went Wrong!",
      noRecordYet: false,
      apis: {
        new: "https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests?type=new",
        accepted: "https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests?type=accepted",
        history: 'https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests?type=history',
        oncallNew: "https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests?type=new",
        oncallAccepted: "https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests?type=accepted",
        oncallHistory: "https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests?type=history",
        lspTeamRemain: "https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/home?type=remaining",
        lspTeamHistory: "https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/home?type=history",
        lspTeamComplete: "https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/home?type=complete"
      },
    };
  },
  beforeMount() {
    window.addEventListener("scroll", this.infiniteHandler)
  },
  methods: {
    infiniteHandler() {
      if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
        if (this.page <= this.total_page) {
          this.getNew();
        }
      }
    },
    assignTeam() {
      axios
        .post(this.base_url + "assigned_team", {
          requested_id: this.request.id,
          requested_type: this.requesterType,
          lsp_team_id: this.teamId
        })
        .then(res => {
          if (res.status == 201) {
            this.showModal = false;
            alert('successfully Processed!')
          }
        })
        .catch(console.log("Error"));
    },
    teamSelect(team, index) {
      this.selected = index;
      this.teamId = team.id;
    },
    bindResponseData(response) {
      if(!response.data.data.length) {
        this.noRecordYet = true
      }
      response.data.data.forEach(result => {
        this.requests.push(result);
      });
      this.page = response.data.meta.current_page +1; //to get next page
      this.total_page = response.data.meta.total_pages;
    },
    apiCall(url, page) {
      axios
        .get(`${url}&page=${page}`)
        .then(response => {
          this.bindResponseData(response);
        })
        .catch(this.errorMessage);
    },
    getNew() {
      switch (this.status) {
        case "new":
          this.apiCall(this.apis.new, this.page);
          break;
        case "accepted":
          this.apiCall(this.apis.accepted, this.page);
          break;
        case "history":
          this.apiCall(this.apis.history, this.page);
          break;
        case "oncall-new":
          this.apiCall(this.apis.oncallNew, this.page);
          break;
        case "oncall-accepted":
          this.apiCall(this.apis.oncallAccepted, this.page);
          break;
        case "oncall-history":
          this.apiCall(this.apis.oncallHistory, this.page);
          break;
        case "lsp-team-remain":
          this.apiCall(this.apis.lspTeamRemain, this.page);
          break;
        case "lsp-team-history":
          this.apiCall(this.apis.lspTeamHistory, this.page);
          break;
        case "lsp-team-complete":
          this.apiCall(this.apis.lspTeamComplete, this.page);
          break;
        default:
          this.errorMessage;
          break;
      }
    },
    filterRequest(id) {
      this.requests = this.requests.filter( request => {
        return request.id != id;
      })
    },
    toOrder(request, event) {
      if (event.target.id == "accept") {
        if (this.request_type == "on_call") {
          axios
            .post(
              this.base_url + "on_call_requests_accepted/" +
              request.id
            )
            .then(response => {
              if(response.data.code == 200) alert('Successfully Professed!')
              this.filterRequest(request.id);
            })
            .catch(console.log('Error'));
        } else {
          axios
            .post(
              this.base_url + "installation_requests_accepted/" +
                request.id
            )
            .then(response => {
              if(response.data.code == 200) alert('Successfully Professed!')
              this.filterRequest(request.id);
            })
            .catch(console.log('Error'));
        }
      } else if(event.target.id == "assignOrSwitch") {
        this.request = request
        if(request.type == 'installation' || request.type == 'relocation') {
          this.requesterType = 'installation'
        } else {
          this.requesterType = 'on_call'
        }
        if(request.lsp_team != null) {
          this.availableTeams = this.availableTeams.filter( team => {
            return team.id != request.lsp_team.id
          })
        }
        this.showModal = true

      } else {
        this.$router.push({ name: 'order', params: { id: request.id, orderType: this.request_type }});
        // if(this.request_type == 'on_call') {
        //   this.$router.push({ name: 'order-repair', params: { id: request.id, orderType: this.request_type } });
        // } else {
        //   this.$router.push({ name: 'order', params: { id: request.id, orderType: this.request_type }});
        // }
      }
    },
    toTeamOrder(request) {
      this.$router.push({ name: 'lsp-order', params: { id: request.id, orderType: request.request_type }});
    },
    getTeams() {
      if(this.type == 'admin' && this.status == 'accepted' || this.status == 'oncall-accepted') {
        axios.get(this.base_url + 'team_lists')
        .then( res => { this.bindTeams(res) } )
        .catch( console.log('Something Went Wrong!') );
      }
    },
    bindTeams(res) {
      res.data.data.forEach(element => {
        this.availableTeams.push(element)
      });
    }
  },
  watch: {
    showModal(val) {
      if (val) {
        document.documentElement.style.overflow = "hidden";
      } else {
        document.documentElement.style.overflow = "auto";
      }
    }
  },
  created() {
    this.getNew();
    this.getTeams();
  }
};
</script>
