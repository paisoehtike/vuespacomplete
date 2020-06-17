<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link tag="div" :to="{ path: '/order/' + this.$route.params.id + '/installation'}" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Survey</h2>
        </router-link>
        <ProgressBar :stepNo="'1'" :type="'admin'" :id="this.$route.params.id"></ProgressBar>
        <TeamInfo>
            <TableRow v-for="(value, label) in issueLists" :key="label" :value="value"></TableRow>
        </TeamInfo>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import TeamInfo from "./../lsp-home-team/TeamInfoComponent";
import TableRow from "./../reuseable-component/TableRowComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        TeamInfo,
        TableRow,
    },
    data() {
        return {
            issueLists: null,
        }
    },
    methods: {
        bindData(res) {
            this.issueLists = res.data.data;
        },
        get() {
            axios.get(`${this.base_url}survey?installation_id=${this.$route.params.id}`)
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