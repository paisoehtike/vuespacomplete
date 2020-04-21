<template>
  <div class="home-customer-row">
    <Customer
      @click.native="type !== 'team' ? toOrder(request, $event) : toTeamOrder(request)"
      v-for="(request, index) in requests"
      :key="index"
    >
      <CustomerHeader :id="request.customer" :step="request.installation_step"></CustomerHeader>
      <CustomerTypeChip
        v-if="request.customer_type"
        :value="request.customer_type.name"
        slot="customer-chip"
      ></CustomerTypeChip>
      <OrderStepChip
        v-if="request.installation_step"
        :value="request.installation_step"
        slot="order-chip"
      ></OrderStepChip>
      <CustomerIssueDate v-if="request.due_date" slot="customer-date">
        <!-- <span>{{customer.date}}</span> -->
        {{request.due_date | format-date}}
        <template
          v-slot:priority-date
          v-if="request.priority_level"
        >| {{request.priority_level.name}} Hrs</template>
        <!-- <template v-slot:issue>{{ customer.issue }}</template> -->
      </CustomerIssueDate>
      <CustomerDetailChip
        slot="customer-detail-chip"
        :value="request.name"
        :address="request.address"
      ></CustomerDetailChip>
      <CustomerHomeFooterButton v-show="type !== 'team'" slot="customer-home-footer">
        <template v-if="request.team !== null" v-slot:assign>{{ request.team.name }}</template>
        <template v-else v-slot:assign>Not Assigned</template>
      </CustomerHomeFooterButton>
    </Customer>
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
export default {
  props: ["type", "status"],
  data() {
    return {
      requests: null,
      errorMessage: "Something Went Wrong!",
      apis: {
        new:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests?type=new",
        accepted:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests?type=accepted",
        history:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests?type=history",
        oncallNew:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests?type=new",
        oncallAccepted:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests?type=accepted",
        oncallHistory:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests?type=history",
        lspTeamRemain:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/home?type=remaining",
        lspTeamHistory:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/home?type=history",
        lspTeamComplete:
          "https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/home?type=complete"
      }
    };
  },
  components: {
    Customer,
    CustomerTypeChip,
    OrderStepChip,
    CustomerDetailChip,
    CustomerIssueDate,
    CustomerHomeFooterButton,
    CustomerHeader
  },
  methods: {
    bindResponseData(response) {
      this.requests = response.data.data;
    },
    apiCall(url) {
      axios
        .get(url)
        .then(response => {
          this.bindResponseData(response);
        })
        .catch(this.errorMessage);
    },
    getNew() {
      switch (this.status) {
        case "new":
          this.apiCall(this.apis.new);
          break;
        case "accepted":
          this.apiCall(this.apis.accepted);
          break;
        case "history":
          this.apiCall(this.apis.history);
          break;
        case "oncall-new":
          this.apiCall(this.apis.oncallNew);
          break;
        case "oncall-accepted":
          this.apiCall(this.apis.oncallAccepted);
          break;
        case "oncall-history":
          this.apiCall(this.apis.oncallHistory);
          break;
        case "lsp-team-remain":
          this.apiCall(this.apis.lspTeamRemain);
          break;
        case "lsp-team-history":
          this.apiCall(this.apis.lspTeamHistory);
          break;
        case "lsp-team-complete":
          this.apiCall(this.apis.lspTeamComplete);
          break;
        default:
          this.errorMessage;
          break;
      }
    },
    toOrder(request, event) {
      if (event.target.id == "accept") {
        if (this.type == "On-call") {
          axios
            .post(
              "https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests_accepted/" +
                request.id
            )
            .then(response => {
              this.getNew();
            })
            .catch(this.errorMessage);
        } else {
          axios
            .post(
              "https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests_accepted/" +
                request.id
            )
            .then(response => {
              this.getNew();
            })
            .catch(this.errorMessage);
        }
      } else {
        if (this.type == "On-call") {
          this.$router.push({
            name: "order-repair",
            params: { id: request.id, order_type: "On Call" }
          });
        } else {
          this.$router.push({
            name: "order",
            params: { id: request.id, order_type: "Installation" }
          });
        }
      }
    },
    toTeamOrder(request) {
      this.$router.push({
        name: "lsp-order",
        params: { id: request.id, order_type: request.request_type }
      });
    }
  },
  created() {
    this.getNew();
  }
};
</script>