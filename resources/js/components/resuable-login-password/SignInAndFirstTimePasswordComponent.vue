<template>
    <div class="activate-form">
        <h5><slot></slot></h5>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <p v-if="!isMatch" class="error-message">{{ errors.passwordDoesntMatch }}</p>
        <div>
            <p v-show="!isSignIn" class="password-label">Set your new password</p>
            <label v-show="!isSignIn" class="activate-label">Password</label>
            <label v-show="isSignIn" class="activate-label">Phone</label>
            <span v-if="errors.phone">{{ errors.phone }}</span>
            <div v-if="type == 'password'">
                <input v-model="phone" class="activate-input" :type="isShowPassword" name="phone">
                <i @click="showHidePassword" v-if="changeState == true" class="far fa-eye show-or-hide"></i>
                <i @click="showHidePassword" v-else class="fas fa-eye-slash show-or-hide"></i>
            </div>
            <input v-else v-model="phone" class="activate-input" type="number" min="1" name="phone">
        </div>
        <div>
            <label v-show="!isSignIn" class="activate-label">Confirm Password</label>
            <label v-show="isSignIn" class="activate-label" for="onu-sn">Password</label>
            <span v-if="errors.password">{{ errors.password }}</span>
            <div>
                <input v-model="password" class="activate-input" :type="isShow" name="password">
                <i @click="showHide" v-if="changeStatePassword == true" class="far fa-eye show-or-hide"></i>
                <i @click="showHide" v-else class="fas fa-eye-slash show-or-hide"></i>
            </div>
        </div>
        <div class="right">
            <!-- <router-link v-show="type == 'sign-in'" 
                         :to="isAdmin == 'Admin' ? '/lsp/first-time-password': '/lsp-team/first-time-password'"
                         tag="button">
            Sign In
            </router-link>
            <router-link v-show="type !== 'sign-in'" 
                         :to="isAdmin == 'Admin' ? '/home/new': '/lsp-home/remaining'" 
                         tag="button">
            Save
            </router-link> -->
            <button @click="formSubmit" v-show="isSignIn">Sign In</button>
            <button @click="formSubmit" v-show="!isSignIn">Save</button>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'type', 'isAdmin', 'errorMessage', 'prePhoneNumber'
    ],
    data() {
        return {
            isShow: 'password',
            isShowPassword: 'password',
            changeState: true,
            changeStatePassword: true,
            isSignIn: true,
            phone: null,
            password: null,
            isMatch: true,
            errors: {
                phone: null,
                password: null,
                passwordDoesntMatch: null
            }
        }
    },
    methods: {
        showHide() {
            if(this.isShow == 'password') {
                this.isShow = 'text'
                this.changeStatePassword = false
            } else {
                this.isShow = 'password'
                this.changeStatePassword = true
            }
        },
        showHidePassword() {
            if(this.isShowPassword == 'password') {
                this.isShowPassword = 'text'
                this.changeState = false
            } else {
                this.isShowPassword = 'password'
                this.changeState = true
            }
        },
        formSubmit() {
            this.resetErrorMessages();

            if(!this.isSignIn) {
                if(this.phone !== this.password) {
                    this.errors.passwordDoesntMatch = "Password Doesn't Match!";
                    this.isMatch = false;
                } else {
                    this.isMatch = true;
                }
            }

            if(!this.phone) {
                this.errors.phone = "*This field is required*";
            }
            if(!this.password) {
                this.errors.password = "*This field is required*";
            }
            
            // if(!this.isSignIn) {
            //     let formData = {
            //         'password': this.password
            //     }
            // } else if(this.isSignIn) {
            //     let formData = {
            //         'phone': this.phone,
            //         'password': this.password
            //     }
            // }
            // let formData = {
            //     'phone': this.phone,
            //     'password': this.password
            // }

            if(!this.isSignIn) {
                if(this.phone && this.password && this.isMatch) {
                    this.$emit('submit', {'password': this.password});
                    this.resetErrorMessages();
                }
            } else {
                if(this.phone && this.password) {
                    this.$emit('submit', {'phone': this.phone, 'password': this.password});
                    this.resetErrorMessages();
                }
            }
        },
        whichType() {
            if(this.type !== 'sign-in') {
                this.isSignIn = false;
            }
            if(this.prePhoneNumber) this.phone = this.prePhoneNumber
        },
        resetErrorMessages() {
            this.errors.phone = null;
            this.errors.password = null;
            this.errors.passwordDoesntMatch = null;
        }
    },
    created() {
        this.whichType();
    }
}
</script>