<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/order/' + this.$route.params.id + '/installation'}" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Cabling</h2>
        </router-link>
        <ProgressBar :stepNo="'2'" :type="'admin'" :id="this.$route.params.id"></ProgressBar>
        <div class="remarks">
            <h3>Remarks</h3>
            <Remarks v-for="(value, key) in remarks" :key="key" :value="value"></Remarks>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import Remarks from "./../resuable-lsp-detail/RemarksComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        Remarks,
    },
    data() {
        return {
            remarks: null,
        }
    },
    methods: {
        bindData(res) {
            this.remarks = res.data.data;
        },
        get() {
            axios.get(`${this.base_url}cabling?installation_id=${this.$route.params.id}`)
            .then( res => {
                this.bindData(res)
            }).catch(console.log('Error'));
        }
    },
    mounted() {
        this.get();
    }
}
</script>