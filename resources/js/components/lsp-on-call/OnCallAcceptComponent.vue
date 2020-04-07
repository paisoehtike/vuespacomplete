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
        <Customer @click.native="toRepair" v-for="(request, index) in requests" :key="index">
          <CustomerHeader :id="request.customer"></CustomerHeader>

          <CustomerTypeChip v-if="request.customer_type" :value="request.customer_type.name" slot="customer-chip"></CustomerTypeChip>
          <!-- <OrderStepChip :value="customer.orderStep" slot="order-chip"></OrderStepChip> -->

          <CustomerIssueDate slot="customer-date">
            {{ request.due_date | format-date }}
            <template
              v-slot:priority-date
              v-if="request.priority_level"
            >| {{request.priority_level.name}} Hrs</template>
            <template v-if="request.estimated_issue" v-slot:issue>{{request.estimated_issue.name}}</template>
          </CustomerIssueDate>

          <CustomerDetailChip
            slot="customer-detail-chip"
            :value="request.name"
            :address="request.address"
          ></CustomerDetailChip>

          <CustomerHomeFooterButton slot="customer-home-footer">
            <template v-if="request.team = null" v-slot:assign>Not Assigned</template>
            <template v-if="request.team != null" v-slot:assign>{{ request.team.name }}</template>
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
        new: "/on-call/new",
        accept: "/on-call/accept",
        history: "/on-call/history"
      },
      requests: null
    };
  },
  methods: {
    toRepair() {
      this.$router.push('/lsp-order/repair');
    },
    bindResponseData(response) {
      this.requests = response.data.data;
      console.log(this.requests);
    },
    getNew() {
      axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests?type=accepted')
      .then( response => { this.bindResponseData(response) })
      .catch(console.log('Something Went Wrong!'));
    }
  },
  created() {
    this.getNew();
  }
};
</script>