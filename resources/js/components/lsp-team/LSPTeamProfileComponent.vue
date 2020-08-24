<template>
    <div>
        <div class="order-container">
            <SquareImage></SquareImage>
            <router-link to="/lsp-home/remaining" tag="div" class="order-header-row">
                <i class="fas fa-chevron-left"></i>
                <h2>Profile</h2>
            </router-link>
        </div>
        <LSPProfileHeader :response="response"></LSPProfileHeader>
        <!-- <LSPProfileBody></LSPProfileBody> -->
        <div class="logout-button">
            <FinishButton @click.native="logout" :type="'Logout'"></FinishButton>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import LSPProfileHeader from "./../reuseable-lsp-profile/LSPProfileHeaderComponent";
import LSPProfileBody from "./../reuseable-lsp-profile/LSPProfileBodyComponent";
import FinishButton from "./../resuable-lsp-detail/FinishButtonComponent";

export default {
    components: {
        SquareImage,
        LSPProfileHeader,
        LSPProfileBody,
        FinishButton,
    },
    data() {
        return {
            response: null,
        }
    },
    methods: {
        redirect(res) {
            if(res.status == 200) {
                this.$router.push('/');
            } 
        },
        bindData(res) {
            this.response = res.data;
        },
        get() {
            axios.get(`${this.base_url}lsp_team/team_profile`)
            .then( res => {
                this.bindData(res);
            }).catch(console.log('Error'));
        },
        logout() {
            axios.post(`${this.base_url}logout`)
            .then( res => { 
                this.redirect(res);
            } )
            .catch( console.log('Error') );
        }
    },
    mounted() {
        this.get();
    }
}
</script>