<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <SignInAndFirstTimePassword
            @submit="formSubmit" 
            :type='"password"' 
            :isAdmin="'Admin'"
            :errorMessage="errorMessage">
            LSP Team
        </SignInAndFirstTimePassword>
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import SignInAndFirstTimePassword from "./../resuable-login-password/SignInAndFirstTimePasswordComponent";

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
        redirect(res) {
            if(res.status == 200) {
                this.$router.push('/');
            } 
        },
        redirectLogIn(response) {
            if (response.status == 200) {
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
                this.redirectLogIn(response);
            }).catch( error => {
                this.errorMessage = error.response.data.message;
            });
        }
    }
}
</script>