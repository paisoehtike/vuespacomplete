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
        <Customer v-for="(customer,index) in customers" :key="index">
          <CustomerHeader :id="customer.name" :step="customer.orderStep"></CustomerHeader>

          <CustomerTypeChip :value="customer.customerType" slot="customer-chip"></CustomerTypeChip>
          <OrderStepChip :value="customer.orderStep" slot="order-chip"></OrderStepChip>

          <CustomerIssueDate slot="customer-date">
            {{customer.date}}
            <template
              v-slot:priority-date
              v-if="customer.priority"
            >| {{customer.priority}} Hrs</template>
            <template v-slot:issue>{{customer.issue}}</template>
          </CustomerIssueDate>

          <CustomerDetailChip
            slot="customer-detail-chip"
            :value="customer.customerName"
            :address="customer.address"
          ></CustomerDetailChip>

          <CustomerHomeFooterButton :customer="customer" slot="customer-home-footer">
            <template v-slot:assign>{{customer.assigned}}</template>
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
      label: {
        new: "New",
        accept: "Accept",
        history: "History"
      },
      url: {
        new: "/on-call/new",
        accept: "/on-call/accept",
        history: "/on-call/history"
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