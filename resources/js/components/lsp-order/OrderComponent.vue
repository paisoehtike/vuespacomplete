<template>
  <div class="order-container">
    <div @click="$router.go(-1)" class="order-header-row">
      <i class="fas fa-chevron-left"></i>
      <h2>Detail</h2>
    </div>
    <div class="order-image-container">
      <SquareImage></SquareImage>
    </div>
    <div class="order-detail-row">
      <OrderDetail>
        <div class="order-detail-header">
          <CustomerTypeChip :value="detail.customer_type"></CustomerTypeChip>
          <OrderStepChip :value="detail.installation_step"></OrderStepChip>
        </div>
        <div class="order-detail-id">
          <h4>{{detail.customer}}</h4>
        </div>
        <div class="order-type">
          <p>Order Type : <span>{{order_type}}</span></p>
        </div>
        <div v-if="order_type == 'On Call'" class="order-type">
          <p>Possible Issue : <span class="issue">{{issueType}}</span></p>
        </div>
        <div v-if="detail.due_date" class="order-type">
          <p>Due Date : <span>{{detail.due_date}}</span></p>
        </div>
        <div v-if="detail.priority_level" class="order-type">
          <p>Priority Level : <span class="priority-level">{{detail.priority_level}} Hrs</span></p>
        </div>
      </OrderDetail>
    </div>
    <div class="order-assigned-row">
      <span>Assigned Team :</span>
      <span v-if="!detail.team">Not Assigned</span>
      <span v-else>{{ detail.team.name }}</span>
      <AssignOrSwitchTeamComponent v-if="!detail.team" :customer="customer" :type="'New'"></AssignOrSwitchTeamComponent>
      <AssignOrSwitchTeamComponent v-else :customer="customer" :type="'Accept'"></AssignOrSwitchTeamComponent>
      <!-- <a class="waves-effect btn">Assign</a> -->
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
        <TableRow :label="'Order Id'" :value="detail.order_id"></TableRow>
        <TableRow :label="'Order Type'" :value="detail.order_type"></TableRow>
        <TableRow :label="'Due'" :value="detail.due_date"></TableRow>
        <TableRow :label="'Status'" :value="detail.status"></TableRow>
        <TableRow :label="'Plan Name'" :value="detail.plan"></TableRow>
        <TableRow :label="'Promotion'" :value="detail.promotion"></TableRow>
        <TableRow :label="'Create Date'" :value="detail.createdDate"></TableRow>
      </OrderInfo>
      <!-- <OrderInfo>
        <TableRow v-for="(value,label) in orderDetails" :key="label" :label="label" :value="value"></TableRow>
      </OrderInfo> -->
    </div>
    <div class="order-button">
      <router-link tag="div" to="/lsp-order/survey" class="col s12 m6 l3 view-detail">
        <a>View Installation Detail</a>
      </router-link>
      <div class="col s12 m6 l3 complete-btn">
        <a class="waves-effect waves-light btn orange">Complete</a>
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
    'id', 'order_type'
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
      customer: {
        name: "5531",
        orderStep: "Installation",
        date: "2020/3/19",
        customerType: "VIP",
        orderStep: "Installation",
        customerName: "U Min Thant",
        address: "Mingalar Taung Nyunt",
        assigned: "Not Assigned",
        priority: "24"
      },
      customerDetails: {
        name: "Mg Mg",
        accountNo: "YGNFX008",
        rmn: "93123456",
        ppoeName: "YGNFX008",
        ppoePassword: "YGNFX008",
        phone: "095385377",
        address: "No(20), 19th Street,Latha Township, Yangon",
        township: "Latha"
      },
      orderDetails: {
        orderId: "5531",
        orderType: "Relocation",
        due: "22-02-2020",
        status: "Splicing",
        planName: "Premium",
        promoName: "-",
        createdDate: "17-02-2020"
      },
      customerType: "VVIP",
      orderStep: "Splicing",
      orderDetailID: "5531",
      // orderType: "On Call",
      issueType: "No Internet Connection",
      dueDate: "2020/1/19",
      priorityLevel: "24"
    };
  },
  methods: {
    getDetail() {
      this.request_id = this.$route.params.id;
      axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests/' + this.request_id)
      .then( response => { this.bindResponseData(response) })
      .catch(console.log('Something Went Wrong!'));
    },
    bindResponseData(response) {
      this.detail = response.data.data;
      console.log(this.detail);
    },
  },
  created() {
    this.getDetail();
  }
};
</script>