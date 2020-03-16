<template>
  <div class="order-container">
    <div class="order-header-row">
      <i class="fas fa-chevron-left"></i>
      <h5>Detail</h5>
    </div>
    <div class="order-image-container">
      <SquareImage></SquareImage>
    </div>
    <div class="order-detail-row">
        <OrderDetail></OrderDetail>
    </div>
    <div class="order-assigned-row">
      <span>Not Assigned</span>
      <a class="waves-effect btn">Assign</a>
    </div>
    <div class="customer-info-row">
      <CustomerInfo></CustomerInfo>
    </div>
    <div class="order-info-row">
      <OrderInfo></OrderInfo>
    </div>
    <div class="order-button">
      <div class="col s12 m6 l3 view-detail">
        <a>View Installation Detail</a>
      </div>
      <div class="col s12 m6 l3 complete-btn">
        <a class="waves-effect waves-light btn orange">Complete</a>
      </div>
    </div>
  </div>
</template>
<script>
import CustomerInfo from "./../reuseable-customer/CustomerInfoComponent";
import OrderInfo from "./../reuseable-customer/OrderInfoComponent";
import OrderDetail from "./../reuseable-customer/OrderDetailComponent";
import SquareImage from "./../reuseable-customer/SquareImageComponent";

export default {
  components: {
    CustomerInfo,
    OrderInfo,
    OrderDetail,
    SquareImage
  }
};
</script>