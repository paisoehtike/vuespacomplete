<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <div @click="$router.go(-1)" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Repair</h2>
        </div>
        <div class="replace-item">
            <h3>Replace Items</h3>
            <TeamInfo v-if="detail.product_usage != null">
                <TableRow :label="'Image'" :value="detail.images" :type="'image'"></TableRow>
                <TableRow v-for="(value,label) in detail.product_usage" :key="label" :label="label" :value="value" :type="'repair-detail'"></TableRow>
            </TeamInfo>
            <TeamInfo v-else>
                <TableRow :label="'Image'" :value="demy" :type="'repair-detail'"></TableRow>
                <TableRow :label="'Onu Type'" :value="demy" :type="'repair-detail'"></TableRow>
                <TableRow :label="'Fiber Patch Cord'" :value="demy" :type="'repair-detail'"></TableRow>
                <TableRow :label="'Fiber Cable'" :value="demy" :type="'repair-detail'"></TableRow>
                <TableRow :label="'Onu Adapter'" :value="demy" :type="'repair-detail'"></TableRow>
            </TeamInfo>
        </div>
        <div class="remarks" v-if="detail.remarks != null">
            <h3>Remarks</h3>
            <Remarks v-for="(value, key) in detail.remarks" :key="key" :value="value"></Remarks>
        </div>
        <div class="remarks" v-else>
            <h3>Remarks</h3>
            <p>No Remark Yet!</p>
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
            demy: {
                name: '-'
            }
        }
    },
    methods: {
        getDetail() {
            axios.get(this.base_url + 'repair?on_call_request_id=' + this.$route.params.id)
            .then( response => { this.bindResponseData(response) })
            .catch(console.log('Something Went Wrong!'));
        },
        bindResponseData(response) {
            this.detail = response.data.data;
        },
    },
    created() {
        this.getDetail();
    }
}
</script>