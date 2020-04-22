<template>
    <div>
        <div class="order-container">
            <SquareImage></SquareImage>
            <router-link to="/lsp-home/remaining" tag="div" class="order-header-row">
                <i class="fas fa-chevron-left"></i>
                <h2>Profile</h2>
            </router-link>
        </div>
        <LSPProfileHeader></LSPProfileHeader>
        <LSPProfileBody></LSPProfileBody>
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
    methods: {
        redirect(res) {
            if(res.status == 200) {
                this.$router.push('/');
            } 
        },
        logout() {
            axios.post(`${this.base_url}logout`)
            .then( res => { 
                this.redirect(res);
            } )
            .catch( console.log('Error') );
        }
    }
}
</script>