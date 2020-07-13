<template>
    <div class="">
        <!-- <p class="model-text">Reset Password</p> -->
        <p v-if="type == 'password-reset'" @click="showModal = true" class="model-text">Reset Password</p>
        <i v-else @click="showOrHideModal" class="far fa-trash-alt remark-setting"></i>

        <transition name="fade" appear>
            <div class="modal-box1" v-if="showModal" @click="showModal = false">
            </div>
        </transition>

        <transition v-if="type == 'password-reset'" name="slide" appear>
            <div class="modal-box" v-if="showModal">
                <div class="cross-close">
                    <span>Reset Password</span>
                    <i @click="showModal = false" class="fas fa-times"></i>
                </div>
                <p v-if="!isMatch" class="error-message">{{ errors.passwordDoesntMatch }}</p>
                <div>
                    <label class="activate-label">New Password</label>
                    <span v-if="errors.newPassword">{{ errors.newPassword }}</span>
                    <input v-model="newPassword" class="activate-input" :type="isShowPassword"  name="phone">
                    <i @click="showHidePassword" v-if="changeState == true" class="far fa-eye show-or-hide"></i>
                    <i @click="showHidePassword" v-else class="fas fa-eye-slash show-or-hide"></i>
                </div>
                <div>
                    <label class="activate-label">Confirm Password</label>
                    <span v-if="errors.confirmPassword">{{ errors.confirmPassword }}</span>
                    <input v-model="confirmPassword" class="activate-input" :type="isShow"  name="password">
                    <i @click="showHide" v-if="changeStatePassword == true" class="far fa-eye show-or-hide"></i>
                    <i @click="showHide" v-else class="fas fa-eye-slash show-or-hide"></i>
                </div>
                <div class="reset-button-container">
                    <button @click="resetPassword" class="remark-save-btn">Reset Now</button>
                </div>
            </div>
        </transition>

        <transition v-else name="slide" appear>
            <div class="modal-box" v-if="showModal">
                <h3 class="text-center">Are you sure to delete?</h3>
                <button @click="showModal = false" class="remark-cancel-btn">Cancel</button>
                <button @click="submitRemark" class="remark-save-btn">Confirm</button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: [ 'type', 'isComplete'],
    data() {
        return {
            showModal: false,
            newPassword: null,
            confirmPassword: null,
            isMatch: null,
            changeState: true,
            changeStatePassword: true,
            isShowPassword: 'password',
            isShow: 'password',
            errors: {
                newPassword: null,
                confirmPassword: null,
                passwordDoesntMatch: null
            }
        }
    },
    methods: {
        showOrHideModal() {
            if(!this.isComplete) {
                this.showModal = true
            }
        },
        submitRemark() {
            this.$emit('delete-confirm');
            this.showModal = false;
        },
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
        resetPassword() {
            if(this.newPassword !== this.confirmPassword) {
                this.errors.passwordDoesntMatch = "Password Doesn't Match!";
                this.isMatch = false;
            } else {
                this.isMatch = true;
            }

            if(!this.newPassword) {
                this.errors.newPassword = "*This field is required*";
            }
            if(!this.confirmPassword) {
                this.errors.confirmPassword = "*This field is required*";
            }

            if(this.newPassword && this.confirmPassword && this.isMatch) {
                this.$emit('submit', this.confirmPassword);
                this.showModal = false;
                this.resetErrorMessages();
            }
        },
        resetErrorMessages() {
            this.errors.newPassword = null;
            this.errors.confirmPassword = null;
            this.errors.passwordDoesntMatch = null;
        }
    }
}
</script>