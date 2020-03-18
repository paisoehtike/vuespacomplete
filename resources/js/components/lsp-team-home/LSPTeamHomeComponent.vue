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
        <Customer>
          <div class="home-customer-container">
            <div class="customer-header-row">
              <div class="customer-home-header">
                <h4>5531</h4>
                <span>Installation</span>
              </div>
              <div class="customer-type-container">
                <div class="customer-type-row">
                  <CustomerTypeChip :value="customerType"></CustomerTypeChip>
                  <OrderStepChip :value="orderStep"></OrderStepChip>
                </div>
                <div class="customer-date">
                  <span>2020/09/02</span>
                </div>
              </div>
            </div>
            <div class="customer-home-body-row">
              <CustomerDetailChip :value="customerName" :address="address"></CustomerDetailChip>
            </div>
          </div>
          <div class="customer-home-footer-row">
            <div class="customer-home-footer-detail-row">
              <div class="customer-home-assigned-team">
                <label for="assigned-header">Assigned Team</label>
                <br />
                <span>Not Assigned</span>
              </div>
              <div class="customer-home-assigned-button">
                <a class="btn">Accept</a>
              </div>
            </div>
          </div>
        </Customer>
      </div>
    </div>
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

export default {
  components: {
    Header,
    Customer,
    CustomerTypeChip,
    OrderStepChip,
    CustomerDetailChip,
    HomeHeaderButton,
    HomeFooterButton
  },
  data() {
    return {
      customerType: "VIP",
      orderStep: "Installation",
      customerName: "U Min Thant",
      address: "Mingalar Taung Nyunt"
    };
  }
};
</script>