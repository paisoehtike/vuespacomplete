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
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import LSPProfileHeader from "./../reuseable-lsp-profile/LSPProfileHeaderComponent";
import LSPProfileBody from "./../reuseable-lsp-profile/LSPProfileBodyComponent";

export default {
    components: {
        SquareImage,
        LSPProfileHeader,
        LSPProfileBody,
    }
}
</script>