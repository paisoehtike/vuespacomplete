<template>
    <div>
        <div class="order-container">
            <SquareImage></SquareImage>
            <div @click="$router.go(-1)" class="order-header-row">
                <i class="fas fa-chevron-left"></i>
                <h2>Profile</h2>
            </div>
        </div>
        <LSPProfileHeader></LSPProfileHeader>
        <LSPProfileBody></LSPProfileBody>
        <div class="logout-button">
            <FinishButton :type="'Logout'"></FinishButton>
        </div>
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import LSPProfileHeader from "./../reuseable-lsp-profile/LSPProfileHeaderComponent";
import LSPProfileBody from "./../reuseable-lsp-profile/LSPProfileBodyComponent";
import FinishButton from "./../resuable-lsp-detail/FinishButtonComponent";

export default {
    components: {
        SquareImage,
        LSPProfileHeader,
        LSPProfileBody,
        FinishButton,
    }
}
</script>