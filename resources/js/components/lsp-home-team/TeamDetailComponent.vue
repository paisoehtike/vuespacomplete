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
        <CustomerHeader :id="customer.name" :step="customer.orderStep"></CustomerHeader>

        <CustomerTypeChip :value="customer.customerType" slot="customer-chip"></CustomerTypeChip>
        <OrderStepChip :value="customer.orderStep" slot="order-chip"></OrderStepChip>

        <CustomerIssueDate slot="customer-date">
          <!-- <span>{{customer.date}}</span> -->
          {{customer.date}}
        </CustomerIssueDate>
        <CustomerDetailChip
          slot="customer-detail-chip"
          :value="customer.customerName"
          :address="customer.address"
        ></CustomerDetailChip>
        <CustomerHomeFooterButton slot="customer-home-footer">
          <template v-slot:assign>{{customer.assigned}}</template>
          <a class="btn" slot="button">Accept</a>
        </CustomerHomeFooterButton>
      </Customer>
    </div>

    <div class="team-customer-detail" v-if="isRemain == false && isComplete">
      <Customer v-for="(customer,index) in completeCustomers" :key="index">
        <CustomerHeader :id="customer.name" :step="customer.orderStep"></CustomerHeader>

        <CustomerTypeChip :value="customer.customerType" slot="customer-chip"></CustomerTypeChip>
        <OrderStepChip :value="customer.orderStep" slot="order-chip"></OrderStepChip>

        <CustomerIssueDate slot="customer-date">
          <!-- <span>{{customer.date}}</span> -->
          {{customer.date}}
        </CustomerIssueDate>
        <CustomerDetailChip
          slot="customer-detail-chip"
          :value="customer.customerName"
          :address="customer.address"
        ></CustomerDetailChip>
        <CustomerHomeFooterButton slot="customer-home-footer">
          <template v-slot:assign>{{customer.assigned}}</template>
          <a class="btn" slot="button">Accept</a>
        </CustomerHomeFooterButton>
      </Customer>
    </div>

    <div class="team-customer-detail" v-if="isRemain == false && isComplete == false && isHistory">
      <Customer v-for="(customer,index) in historyCustomers" :key="index">
        <CustomerHeader :id="customer.name" :step="customer.orderStep"></CustomerHeader>

        <CustomerTypeChip :value="customer.customerType" slot="customer-chip"></CustomerTypeChip>
        <OrderStepChip :value="customer.orderStep" slot="order-chip"></OrderStepChip>

        <CustomerIssueDate slot="customer-date">
          <!-- <span>{{customer.date}}</span> -->
          {{customer.date}}
        </CustomerIssueDate>
        <CustomerDetailChip
          slot="customer-detail-chip"
          :value="customer.customerName"
          :address="customer.address"
        ></CustomerDetailChip>
        <CustomerHomeFooterButton slot="customer-home-footer">
          <template v-slot:assign>{{customer.assigned}}</template>
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
      customers: [
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        }
      ],
      completeCustomers: [
        {
          name: "5501",
          orderStep: "Complete",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Complete",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        },
        {
          name: "5501",
          orderStep: "Complete",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "Complete",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        }
      ],
      historyCustomers: [
        {
          name: "6601",
          orderStep: "History",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "History",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        },
        {
          name: "6601",
          orderStep: "History",
          date: "2020/3/19",
          customerType: "VIP",
          orderStep: "History",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        }
      ]
    };
  },
  methods: {
    bindTeamDetail(response) {
      this.teamDetail = response.data.data
    },
    getDetail() {
      axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/teams/' + this.$route.params.id)
        .then( response => { this.bindTeamDetail(response) } )
        .catch( console.log('Error') );
    },
    remain() {
      this.isRemain = true;
      this.isRemainClass = "remain-class";
      this.isCompleteClass = "";
      this.isHistoryClass = "";
    },
    complete() {
      this.isRemain = false;
      this.isComplete = true;
      this.isRemainClass = "";
      this.isCompleteClass = "complete-class";
      this.isHistoryClass = "";
    },
    history() {
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
  }
}
</script>