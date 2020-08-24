<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/lsp-team-order/' + this.$route.params.id + '/cabling'}" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Splicing</h2>
        </router-link>
        <ProgressBar :stepNo="'3'" :type="'team'" :id="this.$route.params.id"></ProgressBar>
        <MultipleRemark :type="'splicing'"
                        :id="this.$route.params.id"
                        :isComplete="isComplete"
                        :multipleRemarks="remarks"
                        @reload="getSplicing()"></MultipleRemark>
        <FinishButton @click.native="storeStep" :type="'Finish'"></FinishButton>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import FinishButton from "./../resuable-lsp-detail/FinishButtonComponent";
import MultipleRemark from "./../resuable-lsp-detail/MultipleRemarkComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        FinishButton,
        MultipleRemark,
    },
    data() {
        return {
            remarks: null,
            detail: null,
            isComplete: null,
        }
    },
    methods: {
        bindResponseData(response) {
            this.detail = response.data.data;
        },
        getDetail() {
            axios.get(this.base_url + 'lsp_team/home/' + this.$route.params.id + '?request_type=installation')
            .then( response => { this.bindResponseData(response) })
            .catch(console.log('Something Went Wrong!'));
        },
        getRemarks(response) {
            this.remarks = response.data.data;
        },
        getSplicing() {
            axios.get(this.base_url + 'lsp_team/splicing?installation_id=' + this.$route.params.id)
                .then( response => { this.getRemarks(response) } )
                .catch(console.log('Error'));
        },
        storeStep() {
            if(this.isComplete) {
                this.$router.push('/lsp-team-order/' + this.$route.params.id + '/activate');
            } else {
                axios.post(this.base_url + 'lsp_team/installation_step', 
                {
                    installation_request_id: this.$route.params.id,
                    step: 'splicing'
                }
                ).then( res => { 
                    if(res.status == 200) {
                        this.$router.push('/lsp-team-order/' + this.$route.params.id + '/activate');
                    }
                } ).catch( console.log('Error') );
            }
        }
    },
    created() {
        this.getDetail()
        this.getSplicing()
    },
    watch: {
        detail(val) {
            if(val.complete_at_by_5BB != null) {
                this.isComplete = true
            }
        }
    }
}
</script>