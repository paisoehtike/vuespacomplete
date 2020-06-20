<template>
  <div class="order-container">
    <router-link :to="orderType == 'installation' ? '/home/new': '/on-call/new'" tag="div" class="order-header-row">
      <i class="fas fa-chevron-left"></i>
      <h2>Detail</h2>
    </router-link>
    <div class="order-image-container">
      <SquareImage></SquareImage>
    </div>
    <div class="order-detail-row">
      <OrderDetail>
        <div class="order-detail-header">
          <CustomerTypeChip v-if="detail.customer_type != null" :value="detail.customer_type.name"></CustomerTypeChip>
          <OrderStepChip v-if="detail.installation_step != null" :value="detail.installation_step.name"></OrderStepChip>
        </div>
        <div class="order-detail-id">
          <h4>{{detail.customer}}</h4>
        </div>
        <div class="order-type">
          <p v-if="detail.type">Order Type : <span>{{detail.type | capitalize}}</span></p>
          <p v-else>Order Type : <span>{{orderType | capitalize}}</span></p>
        </div>
        <div v-if="orderType == 'on_call'" class="order-type">
          <p>Possible Issue : <span class="issue">{{detail.estimated_issue.name}}</span></p>
        </div>
        <div v-if="detail.due_date" class="order-type">
          <p>Due Date : <span>{{detail.due_date | format-date}}</span></p>
        </div>
        <div v-else class="order-type">
          <p>Due Date : <span>N/A</span></p>
        </div>
        <div class="order-type">
          <p>Remark : <span>{{detail.remark}}</span></p>
        </div>
        <div v-if="detail.priority_level != null" class="order-type">
          <p>Priority Level : <span class="priority-level">{{detail.priority_level.name}}</span></p>
        </div>
      </OrderDetail>
    </div>
    <div class="order-assigned-row">
      <span>Assigned Team :</span>
      <span v-if="!detail.lsp_team" class="dummy">N/A</span>
      <span v-else class="dummy">{{ detail.lsp_team.name }}</span>

      <AssignOrSwitchTeamComponent v-if="!detail.lsp_team" 
      @reload="refresh"
      :customer="detail"
      :teams="teams" 
      :type="'New'"
      :requestType="orderType"
      :assignedTeam="detail.lsp_team"></AssignOrSwitchTeamComponent>

      <AssignOrSwitchTeamComponent v-else
      @reload="refresh" 
      :customer="detail"
      :type="'Accept'"
      :teams="teams" 
      :requestType="orderType"
      :assignedTeam="detail.lsp_team"></AssignOrSwitchTeamComponent>

      <!-- <a class="waves-effect btn">Assign</a> -->
    </div>
    <div class="customer-info-row">
      <CustomerInfo>
        <TableRow :label="'Customer Name'" :value="detail.name" :type="'request-detail'"></TableRow>
        <TableRow :label="'Customer Account No'" :value="detail.customer" :type="'request-detail'"></TableRow>
        <TableRow :label="'Customer RMN'" :value="detail.customer_detail.rmn" :type="'request-detail'"></TableRow>
        <TableRow :label="'PPOE Username'" :value="detail.customer_detail.ppoe_user_name" :type="'request-detail'"></TableRow>
        <TableRow :label="'PPOE Password'" :value="detail.customer_detail.ppoe_password" :type="'request-detail'"></TableRow>
        <TableRow :label="'Phone'" :value="detail.customer_detail.phone" :type="'request-detail'"></TableRow>
        <TableRow :label="'Address'" :value="detail.customer_detail.address" :type="'request-detail'"></TableRow>
        <TableRow :label="'Township'" :value="detail.customer_detail.township.name" :type="'request-detail'"></TableRow>
        <!-- <TableRow
          v-for="(value,label) in customerDetails"
          :key="label"
          :label="label"
          :value="value"
        ></TableRow> -->
      </CustomerInfo>
    </div>
    <div class="order-info-row">
      <OrderInfo>
        <TableRow :label="'Order Id'" :value="detail.id" :type="'request-detail'"></TableRow>
        <TableRow :label="'Plan Name'" :value="detail.plan" :type="'request-detail'"></TableRow>
        <TableRow :label="'Promo Name'" :value="detail.promotion" :type="'request-detail'"></TableRow>
        <TableRow :label="'Create Date'" :value="detail.created_at" :type="'request-detail'"></TableRow>
      </OrderInfo>
      <!-- <OrderInfo>
        <TableRow v-for="(value,label) in orderDetails" :key="label" :label="label" :value="value"></TableRow>
      </OrderInfo> -->
    </div>
    <div class="order-button">
      <div @click="toInstallationDetail" class="col s12 m6 l3 view-detail" v-if="orderType == 'installation'">
        <p v-if="alert" class="no-record-alert">*No Installation Record Yet</p>
        <a>View Installation Detail</a>
      </div>
      <router-link tag="div" :to="{ path: '/lsp-order/review/repair/' + detail.id }" class="col s12 m6 l3 view-detail" v-else>
        <a>View Repair Detail</a>
      </router-link>
      <div class="col s12 m6 l3 complete-btn">
        <a @click="acceptByLsp" class="waves-effect waves-light btn orange">Finish</a>
      </div>
    </div>
  </div>
</template>
<script>
const axios = require('axios');

import CustomerInfo from "./../reuseable-customer/CustomerInfoComponent";
import OrderInfo from "./../reuseable-customer/OrderInfoComponent";
import OrderDetail from "./../reuseable-customer/OrderDetailComponent";
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import TableRow from "./../reuseable-component/TableRowComponent";
import CustomerTypeChip from "./../reuseable-component/CustomerTypeChipComponent";
import OrderStepChip from "./../reuseable-component/OrderStepChipComponent";
import AssignOrSwitchTeamComponent from "./../lsp-home/AssignOrSwitchTeamComponent";

export default {
  props: [
    'id', 'orderType'
  ],
  components: {
    CustomerInfo,
    OrderInfo,
    OrderDetail,
    SquareImage,
    TableRow,
    CustomerTypeChip,
    OrderStepChip,
    AssignOrSwitchTeamComponent
  },
  data() {
    return {
      detail: null,
      request_id: null,
      teams: null,
      alert: false,
    };
  },
  methods: {
    toInstallationDetail() {
      if(this.detail.installation_step != null)
      this.$router.push('/lsp-order/review/' + this.detail.id + '/survey')
      this.alert = true
    },
    refresh() {
      this.getDetail();
      this.getTeams();
    },
    acceptByLsp() {
      if (this.orderType == 'installation' || this.orderType == 'relocation') {
        axios.post(this.base_url + 'installation_step_completed/' + this.$route.params.id)
        .then( res => { console.log(res) } ).catch(console.log('Error'));
      } else {
        axios.post(this.base_url + 'on_call_step_completed/' + this.$route.params.id)
        .then( res => { console.log(res) } ).catch(console.log('Error'));
      }
    },
    getDetail() {
      if(this.orderType == 'installation' || this.orderType == 'relocation') {
        axios.get(this.base_url + 'installation_requests/' + this.$route.params.id)
        .then( response => { this.bindResponseData(response) })
        .catch(console.log('Something Went Wrong!'));
      } else {
        axios.get(this.base_url + 'on_call_requests/' + this.$route.params.id)
        .then( response => { this.bindResponseData(response) })
        .catch(console.log('Something Went Wrong!'));
      }
    },
    getTeams() {
      axios.get(this.base_url + 'team_lists')
      .then( res => { this.bindTeams(res) } )
      .catch( console.log('Something Went Wrong!') );
    },
    bindResponseData(response) {
      this.detail = response.data.data;
    },
    bindTeams(res) {
      this.teams = res.data.data;
    }
  },
  created() {
    this.getDetail();
    this.getTeams();
  }
};
</script>