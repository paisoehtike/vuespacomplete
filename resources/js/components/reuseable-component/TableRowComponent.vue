<template>
  <div class="table-row-component">
    <tr>
      <td class="table-color" v-if="type == 'request-detail'">{{ label }}</td>
      <td class="table-color" v-else-if="type == 'repair-detail'">{{ label | capitalize}}</td>
      <td class="table-color" v-else-if="type == 'image'">{{ label }}</td>
      <td class="table-color" v-else>{{ value.name }}</td>

      <td v-if="type == 'image'">
        <!-- <span v-for="(index, data) in value" :key="data">{{ index.thumbnail_image }}</span> -->
        <img v-for="(index, data) in value" :key="data" :src="index.thumbnail_image" class="activate-show-image">
      </td>
      <td v-else>
        <p v-if="type == 'request-detail'">{{ value }}</p>
        <p v-else-if="type == 'repair-detail'">{{ value.name }}</p>
        <p v-else>{{ value.status | passOrFail}}</p>

        <p v-if="value.remark != null" class="single-remark">{{ value.remark.name }}</p>
      </td>
    </tr>
  </div>
</template>
<script>
export default {
    props: ['value', 'label', 'type'],
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
                remainJob: "Remaining Job",
                poleIssue: "Pole Issue",
                fat: "FAT",
                authority: "Authority",
                odnIssue: "ODN Issue",
                customerIssue: "Customer Issue",
                onuType: "ONU Type",
                fiberPatchCord: "Fiber Patch Cord",
                terminationBox: "Termination Box",
                odnIssue: "ODN Issue",
                fiberCable: "Fiber Cable",
                image: "Image",
                ppoeUserName: "PPOE User Name",
                ppoePassword: "PPOE Password",
                olt: "OLT",
                fdt: "FDT",
                fatPort: "FAT Port",
                onuSn: "ONU S/N",
            },
        }
    },
}
</script>