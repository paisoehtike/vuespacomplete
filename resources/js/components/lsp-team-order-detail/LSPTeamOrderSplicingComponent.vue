<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/lsp-team-order/' + this.$route.params.id + '/cabling'}" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Splicing</h2>
        </router-link>
        <ProgressBar :stepNo="'3'" :type="'team'" :id="this.$route.params.id"></ProgressBar>
        <MultipleRemark></MultipleRemark>
        <FinishButton :type="'Finish'"></FinishButton>
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