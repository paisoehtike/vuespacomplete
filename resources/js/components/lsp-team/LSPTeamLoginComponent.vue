<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <SignInAndFirstTimePassword :type='"sign-in"'>
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
    }
}
</script>