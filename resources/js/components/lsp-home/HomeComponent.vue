<template>
  <div class="home-container">
    <div class="home-container-row">
      <div class="home-header-row">
        <Header></Header>
      </div>
      <div class="home-customer-header-button">
        <HomeHeaderButton></HomeHeaderButton>
      </div>
      <div class="home-customer-row">
        <Customer v-for="(customer,index) in customers" :key="index">
          <div class="customer-home-header" slot="customer-header">
            <h4>{{ customer.name }}</h4>
            <span>{{ customer.orderStep }}</span>
          </div>
          <div class="customer-type-row" slot="customer-type-row">
            <CustomerTypeChip :value="customer.customerType"></CustomerTypeChip>
            <OrderStepChip :value="customer.orderStep"></OrderStepChip>
          </div>
          <CustomerDate slot="customer-date">
            <span>{{customer.date}}</span>
          </CustomerDate>
          <CustomerDetailChip
            slot="customer-detail-chip"
            :value="customer.customerName"
            :address="customer.address"
          ></CustomerDetailChip>
          <CustomerHomeFooterButton slot="customer-home-footer">
            <span>{{customer.assigned}}</span>
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
import CustomerDate from "./../reuseable-component/CustomerDateComponent";
import CustomerHomeFooterButton from "./../reuseable-component/CustomerHomeFooterButton";

export default {
  components: {
    Header,
    Customer,
    CustomerTypeChip,
    OrderStepChip,
    CustomerDetailChip,
    HomeHeaderButton,
    HomeFooterButton,
    CustomerDate,
    CustomerHomeFooterButton
  },
  data() {
    return {
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
      ]
    };
  }
};
</script>