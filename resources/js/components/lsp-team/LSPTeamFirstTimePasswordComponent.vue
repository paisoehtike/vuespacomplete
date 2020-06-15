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
// import GetToken from "./../mixins/GetToken"

export default {
    components: {
        SquareImage,
        SignInAndFirstTimePassword,
    },
    // mixins: [
    //     GetToken
    // ],
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
        redirect(res) {
            if(res.status == 200) {
                this.$router.push('/');
            } 
        },
        authenticated(response) {
            if(response.status == 200) {
                axios.post(`${this.base_url}logout`)
                .then( res => { 
                    this.redirect(res);
                } )
                .catch( console.log('Error') );
            }
        },
        formSubmit(formData) {
            axios.post(this.base_url + 'lsp_team/change_password', formData)
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