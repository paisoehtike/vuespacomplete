<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/lsp-order/' + this.$route.params.id }" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Repair</h2>
        </router-link>
        <form action="" class="activate-form">
            <h6>Replace Items</h6>
            <label class="activate-label">ONU S/N :</label>
            <TypeSlider :type="onuType"></TypeSlider>
            <label class="activate-label">Fibre Patch Cord :</label>
            <TypeSlider :type="fpc"></TypeSlider>
            <label class="activate-label">Termination Box :</label>
            <TypeSlider :type="tBox"></TypeSlider>
            <div>
                <label class="activate-label" for="fb-cable">Fibre Cable :</label>
                <input class="activate-input" type="text" name="fb-cable">
            </div>
        </form>
        <MultipleRemark></MultipleRemark>
        <FinishButton :type="'Save'"></FinishButton>
        <FinishButton :type="'Finish'"></FinishButton>
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import FinishButton from "./../resuable-lsp-detail/FinishButtonComponent";
import MultipleRemark from "./../resuable-lsp-detail/MultipleRemarkComponent";
import TypeSlider from "./../resuable-lsp-detail/TypeSliderComponent";

export default {
    components: {
        SquareImage,
        TypeSlider,
        FinishButton,
        MultipleRemark,
    },
    methods: {
        onuType() {
            return [
                'Huawei',
                'ZTE',
                'Xiaomi',
                'Sony',
                'Sony',
                'Sony',
                'Sony',
            ];
        },
        fpc() {
            return [
                'SC_APC/SC_APC',
                'SC_APC/SC_APC',
                'SC_APC/SC_APC',
                'SC_APC/SC_APC',
                'SC_APC/SC_APC',
                'SC_APC/SC_APC',
                'SC_APC/SC_APC',
            ];
        },
        tBox() {
            return [
                '1 Cores OTB',
                '1 Cores OTB',
                '1 Cores OTB',
                '1 Cores OTB',
                '1 Cores OTB',
                '1 Cores OTB',
            ]
        }
    }
}
</script>