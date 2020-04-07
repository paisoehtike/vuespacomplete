<template>
    <div class="home-customer-row">
        <Customer @click.native="toOrder(request)" v-for="(request, index) in requests" :key="index">
          <CustomerHeader :id="request.customer" :step="request.installation_step"></CustomerHeader>

          <CustomerTypeChip v-if="request.customer_type" :value="request.customer_type" slot="customer-chip"></CustomerTypeChip>
          <OrderStepChip v-if="request.installation_step" :value="request.installation_step" slot="order-chip"></OrderStepChip>

          <CustomerIssueDate v-if="request.due_date" slot="customer-date">
            <!-- <span>{{customer.date}}</span> -->
            {{request.due_date}}
            <template
              v-slot:priority-date
              v-if="request.priority_level"
            >| {{request.priority_level}} Hrs</template>
            <!-- <template v-slot:issue>{{ customer.issue }}</template> -->
          </CustomerIssueDate>

          <CustomerDetailChip
            slot="customer-detail-chip"
            :value="request.name"
            :address="request.address"
          ></CustomerDetailChip>
          <CustomerHomeFooterButton slot="customer-home-footer">
            <template v-slot:assign>Not Assigned</template>
          </CustomerHomeFooterButton>
        </Customer>
    </div>
</template>

<script>

import Customer from "./../reuseable-home/CustomerComponent";
import CustomerTypeChip from "./../reuseable-component/CustomerTypeChipComponent";
import OrderStepChip from "./../reuseable-component/OrderStepChipComponent";
import CustomerDetailChip from "./../reuseable-component/CustomerDetailChipComponent";
import CustomerIssueDate from "./../reuseable-component/CustomerIssueDateComponent";
import CustomerHomeFooterButton from "./../reuseable-component/CustomerHomeFooterButton";
import CustomerHeader from "./../reuseable-home/CustomerHeaderComponent";

export default {
    props: [
        'requests'
    ],
    components: {
        Customer,
        CustomerTypeChip,
        OrderStepChip,
        CustomerDetailChip,
        CustomerIssueDate,
        CustomerHomeFooterButton,
        CustomerHeader
    },
}
</script>