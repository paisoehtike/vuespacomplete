<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/order/' + this.$route.params.id + '/installation'}" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Activating For ONU</h2>
        </router-link>
        <ProgressBar :stepNo="'4'" :type="'admin'" :id="this.$route.params.id"></ProgressBar>
        <TeamInfo>
            <TableRow :label="'Image'" :value="data.images" :type="'image'"></TableRow>

            <TableRow :label="'PPOE Username'" :value="data.ppoe_username" :type="'request-detail'"></TableRow>
            <TableRow :label="'PPOE Password'" :value="data.ppoe_password" :type="'request-detail'"></TableRow>

            <TableRow v-if="data.olt" :label="'OLT'" :value="data.olt.name" :type="'request-detail'"></TableRow>
            <TableRow v-else :label="'OLT'" :value="'-'" :type="'request-detail'"></TableRow>

            <TableRow v-if="data.fdt" :label="'FDT'" :value="data.fdt.name" :type="'request-detail'"></TableRow>
            <TableRow v-else :label="'FDT'" :value="'-'" :type="'request-detail'"></TableRow>

            <TableRow v-if="data.fat" :label="'FAT'" :value="data.fat.name" :type="'request-detail'"></TableRow>
            <TableRow v-else :label="'FAT'" :value="'-'" :type="'request-detail'"></TableRow>

            <TableRow v-if="data.fat_port" :label="'FAT Port'" :value="data.fat_port.name" :type="'request-detail'"></TableRow>
            <TableRow v-else :label="'FAT Port'" :value="'-'" :type="'request-detail'"></TableRow>

            <TableRow v-if="data.product_usage.onu_adapter" :label="'Router'" :value="data.product_usage.onu_adapter.name" :type="'request-detail'"></TableRow>
            <TableRow v-else :label="'ONU S/N'" :value="'-'" :type="'request-detail'"></TableRow>

            <TableRow v-if="data.product_usage.onu_type" :label="'ONU Type'" :value="data.product_usage.onu_type.name" :type="'request-detail'"></TableRow>
            <TableRow v-else :label="'ONU Type'" :value="'-'" :type="'request-detail'"></TableRow>

            <TableRow v-if="data.product_usage.fiber_patch_cord" :label="'Fiber Patch Cord'" :value="data.product_usage.fiber_patch_cord.name" :type="'request-detail'"></TableRow>
            <TableRow v-else :label="'Fiber Patch Cord'" :value="'-'" :type="'request-detail'"></TableRow>

            <TableRow v-if="data.product_usage.fiber_cable" :label="'Fiber Cable'" :value="data.product_usage.fiber_cable.quantity" :type="'request-detail'"></TableRow>
            <TableRow v-else :label="'Fiber Cable'" :value="'-'" :type="'request-detail'"></TableRow>
        </TeamInfo>
        <div class="remarks">
            <h3>Remarks</h3>
            <Remarks v-for="(value, key) in data.remarks" :key="key" :value="value"></Remarks>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import TeamInfo from "./../lsp-home-team/TeamInfoComponent";
import TableRow from "./../reuseable-component/TableRowComponent";
import Remarks from "./../resuable-lsp-detail/RemarksComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        TeamInfo,
        TableRow,
        Remarks,
    },
    data() {
        return {
            data: null,
        }
    },
    methods: {
        bindData(res) {
            this.data = res.data.data;
        },
        get() {
            axios.get(`${this.base_url}onu_step?installation_id=${this.$route.params.id}`)
            .then( res => {
                this.bindData(res)
            }).catch( console.log('Error'));
        }
    },
    mounted() {
        this.get();
    }
}
</script>