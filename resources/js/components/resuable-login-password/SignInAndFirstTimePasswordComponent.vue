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
            <input v-model="phone" class="activate-input" type="text" name="phone">
        </div>
        <div>
            <label v-show="!isSignIn" class="activate-label">Confirm Password</label>
            <label v-show="isSignIn" class="activate-label" for="onu-sn">Password</label>
            <span v-if="errors.password">{{ errors.password }}</span>
            <input v-model="password" class="activate-input" type="password" name="password">
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
        'type', 'isAdmin', 'errorMessage',
    ],
    data() {
        return {
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
        formSubmit() {
            let formData = {
                'phone': this.phone,
                'password': this.password
            }
            this.resetErrorMessages();

            if(this.phone !== this.password) {
                this.errors.passwordDoesntMatch = "Password Doesn't Match!";
                this.isMatch = false;
            } else {
                this.isMatch = true;
            }

            if(!this.phone) {
                this.errors.phone = "*This field is required*";
            }
            if(!this.password) {
                this.errors.password = "*This field is required*";
            }
            
            if(!this.isSignIn) {
                if(this.phone && this.password && this.isMatch) {
                    this.$emit('submit', formData);
                    this.resetErrorMessages();
                }
            } else {
                if(this.phone && this.password) {
                    this.$emit('submit', formData);
                    this.resetErrorMessages();
                }
            }
        },
        whichType() {
            if(this.type !== 'sign-in') {
                this.isSignIn = false;
            }
        },
        resetErrorMessages() {
            this.errors.phone = null;
            this.errors.password = null;
            this.errors.passwordDoesntMatch = null;
        }
    },
    mounted() {
        this.whichType();
    }
}
</script>