<template>
    <form action="" class="activate-form">
        <h5><slot></slot></h5>
        <div>
            <p v-show="!isSignIn" class="password-label">Set your new password</p>
            <label v-show="!isSignIn" class="activate-label">Password</label>
            <label v-show="isSignIn" class="activate-label">User Name</label>
            <input class="activate-input" type="text" name="fat-port">
        </div>
        <div>
            <label v-show="!isSignIn" class="activate-label">Confirm Password</label>
            <label v-show="isSignIn" class="activate-label" for="onu-sn">Password</label>
            <input class="activate-input" type="text" name="onu-sn">
        </div>
        <div class="right">
            <router-link v-show="type == 'sign-in'" 
                         :to="isAdmin == 'Admin' ? '/lsp/first-time-password': '/lsp-team/first-time-password'"
                         tag="button">
            Sign In
            </router-link>
            <router-link v-show="type !== 'sign-in'" 
                         :to="isAdmin == 'Admin' ? '/home/new': '/lsp-home/remaining'" 
                         tag="button">
            Save
            </router-link>
            <!-- <button v-show="isSignIn">Sign In</button> -->
            <!-- <button v-show="!isSignIn">Save</button> -->
        </div>
    </form>
</template>

<script>
export default {
    props: [
        'type', 'isAdmin',
    ],
    data() {
        return {
            isSignIn: true,
        }
    },
    methods: {
        whichType() {
            if(this.type !== 'sign-in') {
                this.isSignIn = false;
            }
        }
    },
    mounted() {
        this.whichType();
    }
}
</script>