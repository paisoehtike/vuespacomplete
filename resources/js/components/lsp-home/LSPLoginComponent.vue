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
        formSubmit(formData) {
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/create_token', formData)
            .then( response => {
                this.$cookie.set('token', response.data.token, 1);
                this.errorMessage = null;
                console.log('Token Saved!');
            })
            .catch(error => {
    			this.errorMessage = error.response.data.message;
    		});
        }
    }
}
</script>