<template>
  <div class="home-container">
    <div class="home-container-row">
      <div class="home-header-row">
        <Header></Header>
      </div>
      <div class="home-customer-header-button">
        <HomeHeaderButton :firstUrl="url.remain" :secondUrl="url.history" :thirdUrl="url.complete">
          <template v-slot:new>{{label.remain}}</template>
          <template v-slot:accept>{{label.history}}</template>
          <template v-slot:history>{{label.complete}}</template>
        </HomeHeaderButton>
      </div>
      <div class="home-customer-row">
        <router-link to="/lsp-order">
          <Customer v-for="(customer,index) in customers" :key="index">
            <CustomerHeader :id="customer.name" :step="customer.orderStep"></CustomerHeader>

            <CustomerTypeChip :value="customer.customerType" slot="customer-chip"></CustomerTypeChip>
            <OrderStepChip :value="customer.orderStep" slot="order-chip"></OrderStepChip>

            <CustomerIssueDate slot="customer-date">
              <!-- <span>{{customer.date}}</span> -->
              {{customer.date}}
              <template v-slot:issue>{{ customer.issue }}</template>
            </CustomerIssueDate>
            <CustomerDetailChip
              slot="customer-detail-chip"
              :value="customer.customerName"
              :address="customer.address"
            ></CustomerDetailChip>
          </Customer>
        </router-link>
      </div>
    </div>

    <!-- <HomeFooterButton></HomeFooterButton> -->
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
      url: {
        remain: '/lsp-home/remaining',
        history: '/lsp-home/history',
        complete: '/lsp-home/complete'
      },
      label: {
        remain: "Remaining",
        history: "History",
        complete: "Complete"
      },
      customers: [
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          issue: "24 Hrs",
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
          issue: "24 Hrs",
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
          issue: "24 Hrs",
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
          issue: "24 Hrs",
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
          issue: "24 Hrs",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        }
      ]
    };
  }
};
</script>