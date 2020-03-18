<template>
  <div class="home-container">
    <div class="home-container-row">
      <div class="home-header-row">
        <Header></Header>
      </div>
      <div class="home-customer-header-button">
        <HomeHeaderButton>
          <template v-slot:new>{{header.new}}</template>
          <template v-slot:accept>{{header.accept}}</template>
          <template v-slot:history>{{header.history}}</template>
        </HomeHeaderButton>
      </div>
      <div class="home-customer-row">
        <Customer v-for="(customer,index) in customers" :key="index">
          <CustomerHeader :id="customer.name" :step="customer.orderStep"></CustomerHeader>

          <CustomerTypeChip :value="customer.customerType" slot="customer-chip"></CustomerTypeChip>
          <OrderStepChip :value="customer.orderStep" slot="order-chip"></OrderStepChip>

          <CustomerIssueDate slot="customer-date">
            {{customer.date}}
            <template v-slot:issue>{{customer.issue}}</template>
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

    <HomeFooterButton></HomeFooterButton>
  </div>
</template>
<script>
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
      header: {
        new: "New",
        accept: "Accept",
        history: "History"
      },
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
          issue: "No Internet Connection"
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
          issue: "Broke"
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
          issue: "Wifi Error"
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
          issue: "Cable Error"
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
          issue: "Something"
        }
      ]
    };
  }
};
</script>