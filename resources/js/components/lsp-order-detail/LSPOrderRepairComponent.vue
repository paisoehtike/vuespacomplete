<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <div @click="$router.go(-1)" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Repair</h2>
        </div>
        <div class="replace-item">
            <h3>Replace Items</h3>
            <TeamInfo>
                <TableRow v-for="(value,label) in detail.product_usage" :key="label" :label="label" :value="value" :type="'repair-detail'"></TableRow>
            </TeamInfo>
        </div>
        <div class="remarks">
            <h3>Remarks</h3>
            <Remarks v-for="(value, key) in detail.remarks" :key="key" :value="value"></Remarks>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import Remarks from "./../resuable-lsp-detail/RemarksComponent";
import TeamInfo from "./../lsp-home-team/TeamInfoComponent";
import TableRow from "./../reuseable-component/TableRowComponent";

export default {
    components: {
        SquareImage,
        Remarks,
        TeamInfo,
        TableRow,
    },
    data() {
        return {
            detail: null,
            remarks: [
                {
                    remark: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. In illo sapiente officiis. Officia inventore earum exercitationem sit reiciendis dicta iure!',
                    created_at: '2020/03/12 | 14:92'
                },
                {
                    remark: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. In illo sapiente officiis. Officia inventore earum exercitationem sit reiciendis dicta iure!',
                    created_at: '2020/03/12 | 14:92'
                }
            ],
            issueLists: {
                onuType: "ZTE",
                fiberPatchCord: "SC_APC/SC_APC",
                terminationBox: "1 Cores OTB",
                odnIssue: "No Issue",
                fiberCable: "500m",
            }
        }
    },
    methods: {
        getDetail() {
            axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/repair?on_call_request_id=' + this.$route.params.id)
            .then( response => { this.bindResponseData(response) })
            .catch(console.log('Something Went Wrong!'));
        },
        bindResponseData(response) {
            this.detail = response.data.data;
            console.log(this.detail);
        },
    },
    created() {
        this.getDetail();
    }
}
</script>