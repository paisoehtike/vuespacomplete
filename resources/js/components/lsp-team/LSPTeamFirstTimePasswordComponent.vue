<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <SignInAndFirstTimePassword
            @submit="formSubmit" 
            :type='"password"'
            :errorMessage="errorMessage">
            LSP Team
        </SignInAndFirstTimePassword>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import SignInAndFirstTimePassword from "./../resuable-login-password/SignInAndFirstTimePasswordComponent";
import GetToken from "./../mixins/GetToken"

export default {
    components: {
        SquareImage,
        SignInAndFirstTimePassword,
    },
    mixins: [
        GetToken
    ],
    data() {
        return {
            errorMessage: null
        }
    },
    methods: {
        isAuthenticate() {
            if(!this.$cookie.get('token')) {
                this.$router.push('/');
            }
        },
        authenticated(response) {
            if(response.status == 200) {
                this.$router.push('/lsp-home/remaining');
            }
        },
        formSubmit(formData) {
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/change_password',
                 { password: formData.password },
                 this.headerConfig)
            .then( response => {
                this.authenticated(response);
            })
            .catch(error => {
    			this.errorMessage = error.response.data.message;
    		});
        }
    },
    created() {
        this.isAuthenticate();
    }
}
</script>