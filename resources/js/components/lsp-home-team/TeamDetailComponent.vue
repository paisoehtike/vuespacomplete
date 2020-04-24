<template>
  <div class="team-detail-container">
    <div class="detail-header-row">
      <router-link to="/team" tag="i" class="fas fa-chevron-left"></router-link>
      <h5>{{ teamDetail.name }}</h5>
      <i class="fas fa-edit"></i>
    </div>
    <SquareImage></SquareImage>
    <TeamInfo>
      <TableRow :label="'Leader Name'" :value="teamDetail.leader_name"></TableRow>
      <TableRow :label="'Man Power'" :value="teamDetail.man_power"></TableRow>
      <TableRow :label="'Assigned Jobs'" :value="teamDetail.assigned_job"></TableRow>
      <TableRow :label="'Remaining Jobs'" :value="teamDetail.remaining_job"></TableRow>
    </TeamInfo>
    <div class="detail-button">
      <a class="button remain" @click="remain" :class="isRemainClass">Remaining</a>
      <a class="button complete" @click="complete" :class="isCompleteClass">Complete</a>
      <a class="button history" @click="history" :class="isHistoryClass">History</a>
    </div>

    <div class="team-customer-detail" v-if="isRemain">
      <Customer v-for="(customer,index) in customers" :key="index">
        <CustomerHeader :id="customer.customer" :step="customer.request_type"></CustomerHeader>

        <CustomerTypeChip :value="customer.customer_type.name" slot="customer-chip"></CustomerTypeChip>
        <OrderStepChip v-if="customer.installation_step != null" :value="customer.installation_step.name" slot="order-chip"></OrderStepChip>

        <CustomerIssueDate slot="customer-date">
          <!-- <span>{{customer.date}}</span> -->
          {{customer.start_assign_at | format-date}}
        </CustomerIssueDate>
        <CustomerDetailChip
          slot="customer-detail-chip"
          :value="customer.name"
          :address="customer.address"
        ></CustomerDetailChip>
        <CustomerHomeFooterButton slot="customer-home-footer">
          <template v-if="customer.lsp_team != null" v-slot:assign>{{customer.lsp_team.name}}</template>
          <a class="btn" slot="button">Accept</a>
        </CustomerHomeFooterButton>
      </Customer>
    </div>

    <div class="team-customer-detail" v-if="isRemain == false && isComplete">
      <Customer v-for="(customer,index) in completeCustomers" :key="index">
        <CustomerHeader :id="customer.customer" :step="customer.request_type"></CustomerHeader>

        <CustomerTypeChip :value="customer.customer_type.name" slot="customer-chip"></CustomerTypeChip>
        <OrderStepChip v-if="customer.installation_step != null" :value="customer.installation_step.name" slot="order-chip"></OrderStepChip>

        <CustomerIssueDate slot="customer-date">
          <!-- <span>{{customer.date}}</span> -->
          {{customer.start_assign_at | format-date}}
        </CustomerIssueDate>
        <CustomerDetailChip
          slot="customer-detail-chip"
          :value="customer.name"
          :address="customer.address"
        ></CustomerDetailChip>
        <CustomerHomeFooterButton slot="customer-home-footer">
          <template v-if="customer.lsp_team != null" v-slot:assign>{{customer.lsp_team.name}}</template>
          <a class="btn" slot="button">Accept</a>
        </CustomerHomeFooterButton>
      </Customer>
    </div>

    <div class="team-customer-detail" v-if="isRemain == false && isComplete == false && isHistory">
      <Customer v-for="(customer,index) in historyCustomers" :key="index">
        <CustomerHeader :id="customer.customer" :step="customer.request_type"></CustomerHeader>

        <CustomerTypeChip :value="customer.customer_type.name" slot="customer-chip"></CustomerTypeChip>
        <OrderStepChip v-if="customer.installation_step != null" :value="customer.installation_step.name" slot="order-chip"></OrderStepChip>

        <CustomerIssueDate slot="customer-date">
          <!-- <span>{{customer.date}}</span> -->
          {{customer.start_assign_at | format-date}}
        </CustomerIssueDate>
        <CustomerDetailChip
          slot="customer-detail-chip"
          :value="customer.name"
          :address="customer.address"
        ></CustomerDetailChip>
        <CustomerHomeFooterButton slot="customer-home-footer">
          <template v-if="customer.lsp_team != null" v-slot:assign>{{customer.lsp_team.name}}</template>
          <a class="btn" slot="button">Accept</a>
        </CustomerHomeFooterButton>
      </Customer>
    </div>
  </div>
</template>
<script>
const axios = require('axios');

import Header from "./../reuseable-home/HeaderComponent";
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import TeamInfo from "./TeamInfoComponent";
import TableRow from "./../reuseable-component/TableRowComponent";
import Customer from "./../reuseable-home/CustomerComponent";
import CustomerTypeChip from "./../reuseable-component/CustomerTypeChipComponent";
import OrderStepChip from "./../reuseable-component/OrderStepChipComponent";
import CustomerDetailChip from "./../reuseable-component/CustomerDetailChipComponent";
import CustomerIssueDate from "./../reuseable-component/CustomerIssueDateComponent";
import CustomerHomeFooterButton from "./../reuseable-component/CustomerHomeFooterButton";
import CustomerHeader from "./../reuseable-home/CustomerHeaderComponent";

export default {
  components: {
    Header,
    SquareImage,
    TeamInfo,
    TableRow,
    Customer,
    CustomerTypeChip,
    OrderStepChip,
    CustomerDetailChip,
    CustomerIssueDate,
    CustomerHomeFooterButton,
    CustomerHeader
  },
  data() {
    return {
      teamDetail: null,
      isRemain: false,
      isComplete: false,
      isHistory: false,
      isRemainClass: "",
      isCompleteClass: "",
      isHistoryClass: "",
      customers: null,
      completeCustomers: null,
      historyCustomers: null,
    };
  },
  methods: {
    bindTeamDetail(response) {
      this.teamDetail = response.data.data
    },
    getDetail() {
      axios.get(this.base_url + 'teams/' + this.$route.params.id)
        .then( response => { this.bindTeamDetail(response) } )
        .catch( console.log('Error') );
    },

    getRemain() {
      axios.get(this.base_url + 'teams_home?type=remaining&lsp_team_id=' + this.$route.params.id)
      .then( res => { this.bindRemain(res) }).catch(console.log('Error'));
    },
    bindRemain(res) {
      this.customers = res.data.data;
    },
    remain() {
      this.isRemain = true;
      this.isRemainClass = "remain-class";
      this.isCompleteClass = "";
      this.isHistoryClass = "";
    },

    bindComplete(res) {
      this.completeCustomers = res.data.data;
    },
    complete() {
      axios.get(this.base_url + 'teams_home?type=complete&lsp_team_id=' + this.$route.params.id)
      .then( res => { this.bindComplete(res) }).catch(console.log('Error'));
      this.isRemain = false;
      this.isComplete = true;
      this.isRemainClass = "";
      this.isCompleteClass = "complete-class";
      this.isHistoryClass = "";
    },

    bindHistory(res) {
      this.historyCustomers = res.data.data;
    },
    history() {
      axios.get(this.base_url + 'teams_home?type=history&lsp_team_id=' + this.$route.params.id)
      .then( res => { this.bindHistory(res) }).catch(console.log('Error'));
      this.isRemain = false;
      this.isComplete = false;
      this.isHistory = true;
      this.isRemainClass = "";
      this.isCompleteClass = "";
      this.isHistoryClass = "history-class";
    }
  },
  created() {
    this.remain();
    this.getDetail();
    this.getRemain();
  }
}
</script>