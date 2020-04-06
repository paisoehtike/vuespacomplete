<template>
  <div class="home-container">
    <div class="home-container-row">
      <div class="home-header-row">
        <Header></Header>
      </div>
      <div class="home-customer-header-button">
        <HomeHeaderButton :firstUrl="url.new" :secondUrl="url.accept" :thirdUrl="url.history">
          <template v-slot:new>{{label.new}}</template>
          <template v-slot:accept>{{label.accept}}</template>
          <template v-slot:history>{{label.history}}</template>
        </HomeHeaderButton>
      </div>
      <div class="home-customer-row">
        <Customer @click.native="toOrder" v-for="(request, index) in requests" :key="index">
          <CustomerHeader :id="request.customer" :step="request.installation_step"></CustomerHeader>

          <CustomerTypeChip v-if="request.customer_type" :value="request.customer_type" slot="customer-chip"></CustomerTypeChip>
          <OrderStepChip v-if="request.installation_step" :value="request.installation_step" slot="order-chip"></OrderStepChip>

          <CustomerIssueDate v-if="request.due_date" slot="customer-date">
            <!-- <span>{{customer.date}}</span> -->
            {{request.due_date}}
            <template
              v-slot:priority-date
              v-if="request.priority_level"
            >| {{request.priority_level}} Hrs</template>
            <!-- <template v-slot:issue>{{ customer.issue }}</template> -->
          </CustomerIssueDate>

          <CustomerDetailChip
            slot="customer-detail-chip"
            :value="request.name"
            :address="request.address"
          ></CustomerDetailChip>
          <CustomerHomeFooterButton slot="customer-home-footer">
            <template v-if="request.team = null" v-slot:assign>Not Assigned</template>
            <template v-if="request.team" v-slot:assign>{{ request.team.name }}</template>
          </CustomerHomeFooterButton>
        </Customer>
      </div>
    </div>

    <HomeFooterButton></HomeFooterButton>
  </div>
</template>
<script>
const axios = require('axios');

import Header from "./../reuseable-home/HeaderComponent";
import Customer from "./../reuseable-home/CustomerComponent";
import CustomerTypeChip from "./../reuseable-component/CustomerTypeChipComponent";
import OrderStepChip from "./../reuseable-component/OrderStepChipComponent";
import CustomerDetailChip from "./../reuseable-component/CustomerDetailChipComponent";
import HomeHeaderButton from "./../reuseable-component/HomeHeaderButtonComponent";
import HomeFooterButton from "./../reuseable-component/HomeFooterButtonComponent";
import CustomerIssueDate from "./../reuseable-component/CustomerIssueDateComponent";
import CustomerHomeFooterButton from "./../reuseable-component/CustomerHomeFooterButton";
import CustomerHeader from "./../reuseable-home/CustomerHeaderComponent";

export default {
  components: {
    Header,
    Customer,
    CustomerTypeChip,
    OrderStepChip,
    CustomerDetailChip,
    HomeHeaderButton,
    HomeFooterButton,
    CustomerIssueDate,
    CustomerHomeFooterButton,
    CustomerHeader
  },
  data() {
    return {
      label: {
        new: "New",
        accept: "Accepted",
        history: "History"
      },
      url: {
        new: "/home/new",
        accept: "/home/accept",
        history: "/home/history"
      },
      requests: null,
      customers: [
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned",
          priority: "24",
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned",
          priority: "24",
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned",
          priority: "24",
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned",
          priority: "24",
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned",
          priority: "24",
        }
      ]
    };
  },
  methods: {
    toOrder() {
      this.$router.push('/order');
    },
    bindResponseData(response) {
      this.requests = response.data.data;
      console.log(this.requests);
    },
    getNew() {
      axios.get('http://s-5bb-lsp-management-dashboard.test/api/installation_requests?type=accepted')
      .then( response => { this.bindResponseData(response) })
      .catch(console.log('Something Went Wrong!'));
    }
  },
  created() {
    this.getNew();
  }
};
</script>