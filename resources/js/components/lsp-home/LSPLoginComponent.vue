<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <SignInAndFirstTimePassword 
            @submit="formSubmit" 
            :type='"sign-in"' 
            :isAdmin="'Admin'"
            :errorMessage="errorMessage">
            
            LSP
        </SignInAndFirstTimePassword>
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import SignInAndFirstTimePassword from "./../resuable-login-password/SignInAndFirstTimePasswordComponent";

const axios = require('axios');

export default {
    components: {
        SquareImage,
        SignInAndFirstTimePassword,
    },
    data() {
        return {
            errorMessage: null,
        }
    },
    methods: {
        authenticated(response) {
            this.$cookie.set('token', response.data.data.token, '1m');
            this.errorMessage = null;
            if(response.data.data.is_admin == 1) {
                this.$router.push('/home/new');
            } else {
                if(response.data.data.is_password_change == null) {
                    this.$router.push('/lsp-team/first-time-password');
                } else {
                    this.$router.push('/lsp-home/remaining');
                }
            }
        },
        formSubmit(formData) {
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/create_token', formData)
            .then( response => {
                this.authenticated(response);
            })
            .catch(error => {
    			this.errorMessage = error.response.data.message;
    		});
        }
    }
}
</script>