<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link to="/lsp-order/survey" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <p>Cabling</p>
        </router-link>
        <ProgressBar :step="'cabling'"></ProgressBar>
        <MultipleRemark></MultipleRemark>
        <FinishButton></FinishButton>
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import FinishButton from "./../resuable-lsp-detail/FinishButtonComponent";
import MultipleRemark from "./../resuable-lsp-detail/MultipleRemarkComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        FinishButton,
        MultipleRemark,
    }
}
</script>