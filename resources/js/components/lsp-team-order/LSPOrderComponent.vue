<template>
  <!-- <div class="order-container">
    <router-link to="/lsp-home/remaining" tag="div" class="order-header-row">
        <i class="fas fa-chevron-left"></i>
        <h2>Detail</h2>
    </router-link>
    <div class="order-image-container">
      <SquareImage></SquareImage>
    </div>
    <div class="order-detail-row">
      <OrderDetail>
        <div class="order-detail-header">
          <CustomerTypeChip :value="customerType"></CustomerTypeChip>
          <OrderStepChip :value="orderStep"></OrderStepChip>
        </div>
        <div class="order-detail-id">
          <h4>{{orderDetailID}}</h4>
        </div>
        <div class="order-type">
          <p>{{orderType}}</p>
        </div>
      </OrderDetail>
    </div>
    <div class="customer-info-row">
      <CustomerInfo>
        <TableRow
          v-for="(value,label) in customerDetails"
          :key="label"
          :label="label"
          :value="value"
        ></TableRow>
      </CustomerInfo>
    </div>
    <div class="order-info-row">
      <OrderInfo>
        <TableRow v-for="(value,label) in orderDetails" :key="label" :label="label" :value="value"></TableRow>
      </OrderInfo>
    </div>
    <div class="team-order-button">
      <router-link to="/lsp-team-order/survey" tag="div" class="col s12 m6 l3 complete-btn">
        <a class="waves-effect waves-light btn orange">Start Installation</a>
      </router-link>
    </div>
  </div> -->
  <div class="order-container">
    <router-link to="/lsp-home/remaining" tag="div" class="order-header-row">
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
          <p>Order Type : <span>{{order_type}}</span></p>
        </div>
        <div v-if="order_type == 'on_call'" class="order-type">
          <p>Possible Issue : <span class="issue">{{issueType}}</span></p>
        </div>
        <div v-if="detail.due_date" class="order-type">
          <p>Due Date : <span>{{detail.due_date | format-date}}</span></p>
        </div>
        <div v-if="detail.priority_level != null" class="order-type">
          <p>Priority Level : <span class="priority-level">{{detail.priority_level.name}}</span></p>
        </div>
      </OrderDetail>
    </div>
    <div class="customer-info-row">
      <CustomerInfo>
        <TableRow :label="'Customer Name'" :value="detail.name"></TableRow>
        <TableRow :label="'Customer Account No'" :value="detail.customer"></TableRow>
        <TableRow :label="'Customer RMN'" :value="detail.customer_detail.rmn"></TableRow>
        <TableRow :label="'PPOE Username'" :value="detail.customer_detail.ppoe_user_name"></TableRow>
        <TableRow :label="'PPOE Password'" :value="detail.customer_detail.ppoe_password"></TableRow>
        <TableRow :label="'Phone'" :value="detail.customer_detail.phone"></TableRow>
        <TableRow :label="'Address'" :value="detail.customer_detail.address"></TableRow>
        <TableRow :label="'Township'" :value="detail.customer_detail.township.name"></TableRow>
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
        <TableRow :label="'Order Id'" :value="detail.id"></TableRow>
        <TableRow :label="'Plan Name'" :value="detail.plan"></TableRow>
        <TableRow :label="'Promo Name'" :value="detail.promotion"></TableRow>
        <TableRow :label="'Create Date'" :value="detail.created_at"></TableRow>
      </OrderInfo>
      <!-- <OrderInfo>
        <TableRow v-for="(value,label) in orderDetails" :key="label" :label="label" :value="value"></TableRow>
      </OrderInfo> -->
    </div>
    <div class="team-order-button">
      <div @click="toSurvey" class="col s12 m6 l3 complete-btn">
        <a class="waves-effect waves-light btn orange">Start Installation</a>
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
    OrderStepChip
  },
  data() {
    return {
      detail: null,
      request_id: null,
      order_type: null,
    }
  },
  methods: {
    getDetail() {
      axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/home/' + this.$route.params.id + '?request_type=' + this.order_type)
      .then( response => { this.bindResponseData(response) })
      .catch(console.log('Something Went Wrong!'));
    },
    whichType() {
      if (this.$route.params.orderType == 'installation' || this.$route.params.orderType == 'relocation') {
        this.order_type = 'installation';
      } else {
        this.order_type = 'on_call';
      }
    },
    bindResponseData(response) {
      this.detail = response.data.data;
    },
    toSurvey() {
      if(this.order_type == 'installation') {
        this.$router.push({ name: 'LSPTeamOrderSurvey', params: { id: this.detail.id } });
      } else {
        this.$router.push({ name: 'LSPTeamOrderRepair', params: { id: this.detail.id } });
      }
    },
  },
  created() {
    // this.order_type = this.$route.params.orderType;
    this.whichType();
    this.getDetail();
  }
}
</script>