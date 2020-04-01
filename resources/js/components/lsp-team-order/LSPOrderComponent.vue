<template>
  <div class="order-container">
    <router-link to="/lsp-home/remaining" tag="div" class="order-header-row">
        <i class="fas fa-chevron-left"></i>
        <h2>Detail</h2>
    </router-link>
    <div class="order-image-container">
      <SquareImage></SquareImage>
    </div>
    <div class="order-detail-row">
      <OrderDetail>
        <div class="order-detail-header">
          <CustomerTypeChip :value="customerType"></CustomerTypeChip>
          <OrderStepChip :value="orderStep"></OrderStepChip>
        </div>
        <div class="order-detail-id">
          <h4>{{orderDetailID}}</h4>
        </div>
        <div class="order-type">
          <p>{{orderType}}</p>
        </div>
      </OrderDetail>
    </div>
    <div class="customer-info-row">
      <CustomerInfo>
        <TableRow
          v-for="(value,label) in customerDetails"
          :key="label"
          :label="label"
          :value="value"
        ></TableRow>
      </CustomerInfo>
    </div>
    <div class="order-info-row">
      <OrderInfo>
        <TableRow v-for="(value,label) in orderDetails" :key="label" :label="label" :value="value"></TableRow>
      </OrderInfo>
    </div>
    <div class="team-order-button">
      <router-link to="/lsp-team-order/survey" tag="div" class="col s12 m6 l3 complete-btn">
        <a class="waves-effect waves-light btn orange">Start Installation</a>
      </router-link>
    </div>
  </div>
</template>
<script>
import CustomerInfo from "./../reuseable-customer/CustomerInfoComponent";
import OrderInfo from "./../reuseable-customer/OrderInfoComponent";
import OrderDetail from "./../reuseable-customer/OrderDetailComponent";
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import TableRow from "./../reuseable-component/TableRowComponent";
import CustomerTypeChip from "./../reuseable-component/CustomerTypeChipComponent";
import OrderStepChip from "./../reuseable-component/OrderStepChipComponent";

export default {
  components: {
    CustomerInfo,
    OrderInfo,
    OrderDetail,
    SquareImage,
    TableRow,
    CustomerTypeChip,
    OrderStepChip
  },
  data() {
    return {
      customerDetails: {
        name: "Mg Mg",
        accountNo: "YGNFX008",
        rmn: "93123456",
        ppoeName: "YGNFX008",
        ppoePassword: "YGNFX008",
        phone: "095385377",
        address: "No(20), 19th Street,Latha Township, Yangon",
        township: "Latha"
      },
      orderDetails: {
        orderId: "5531",
        orderType: "Relocation",
        due: "22-02-2020",
        status: "Splicing",
        planName: "Premium",
        promoName: "-",
        createdDate: "17-02-2020"
      },
      customerType: "VVIP",
      orderStep: "Splicing",
      orderDetailID: "5531",
      orderType: "On Call"
    };
  }
};
</script>