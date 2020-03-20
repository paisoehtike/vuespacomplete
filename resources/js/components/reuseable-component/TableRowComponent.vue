<template>
  <div class="table-row-component">
    <tr>
      <td class="table-color">{{ data[label] }}</td>
      <td>{{value}}</td>
    </tr>
  </div>
</template>
<script>
export default {
    props: ['value', 'label'],
    data() {
        return {
            data: {
                name : 'Customer Name',
                accountNo : 'Customer Account No',
                rmn : 'Customer RMN',
                ppoeName : 'PPOE Username',
                ppoePassword : 'PPOE Password',
                phone : 'Phone',
                address : 'Address',
                township : 'Township',
                orderId: "OrderID",
                orderType: "Order Type",
                due: "Due",
                status: "Status",
                planName: "Plan Name",
                promoName: "Promo Name",
                createdDate: "Created Date",
                leaderName: "Leader Name",
                manPower: "Man Power",
                assignJob: "Assigned Job",
                remainJob: "Remaining Job"
            },
        }
    },
}
</script>