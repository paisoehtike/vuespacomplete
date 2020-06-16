<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/order/' + this.$route.params.id + '/installation'}" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Activating For ONU</h2>
        </router-link>
        <ProgressBar :stepNo="'4'" :type="'admin'" :id="this.$route.params.id"></ProgressBar>
        <TeamInfo>
            <TableRow :label="'PPOE Username'" :value="data.ppoe_username" :type="'request-detail'"></TableRow>
            <TableRow :label="'PPOE Password'" :value="data.ppoe_password" :type="'request-detail'"></TableRow>
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