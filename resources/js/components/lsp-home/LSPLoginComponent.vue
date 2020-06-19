<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <SignInAndFirstTimePassword 
            @submit="formSubmit" 
            :type='"sign-in"' 
            :isAdmin="'Admin'"
            :errorMessage="errorMessage"
            :prePhoneNumber="prePhone">
            
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
            prePhone: null,
        }
    },
    methods: {
        authenticated(response) {
            this.errorMessage = null;
            this.$cookie.set('token', response.data.data.token, '1m');
            if(response.data.data.is_admin == 1) {
                this.$router.push('/home/new');
            } else {
                if(response.data.data.is_admin == 0 && response.data.data.is_password_change == 0) {
                    this.$router.push('/lsp-team/first-time-password/' + response.data.data.phone);
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
                alert(error.response.data.message)
    		});
        }
    },
    created() {
        if(this.$route.query.phone) {
            this.prePhone = this.$route.query.phone
        }
    }
}
</script>