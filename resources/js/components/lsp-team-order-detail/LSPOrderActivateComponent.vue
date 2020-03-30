<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link to="/lsp-order/splicing" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Activating For ONU</h2>
        </router-link>
        <ProgressBar :stepNo="'4'"></ProgressBar>
        <form action="" class="activate-form">
            <label class="activate-label" for="image">Add Image :</label>
            <div class="add-img">
                <div class="img-item">
                    <i class="fas fa-plus center-align"></i>
                </div>
            </div>
            <div>
                <label class="activate-label" for="ppoe-username">PPOE Username :</label>
                <input class="activate-input" type="text" value="YGN233HTt" id="ppoe-username" name="ppoe-username" readonly>
            </div>
            <div>
                <label class="activate-label" for="ppoe-password">PPOE Password :</label>
                <input class="activate-input" type="text" value="YGN233HTt" id="ppoe-password" name="ppoe-password" readonly>
            </div>
            <div>
                <label class="activate-label" for="olt">OLT :</label>
                <input class="activate-input" type="text" id="olt" name="olt">
            </div>
            <div>
                <label class="activate-label" for="fdt">FDT :</label>
                <input class="activate-input" type="text" id="fdt" name="fdt">
            </div>
            <div>
                <label class="activate-label" for="fat-port">FAT Port :</label>
                <input class="activate-input" type="text" id="fat-port" name="fat-port">
            </div>
            <div>
                <label class="activate-label" for="onu-sn">ONU S/N :</label>
                <input class="activate-input" type="text" id="onu-sn" name="onu-sn">
            </div>
            <label class="activate-label" for="onu-type">ONU S/N :</label>
            <TypeSlider id="onu-type" :type="onuType"></TypeSlider>
            <label class="activate-label" for="fpc">Fibre Patch Cord :</label>
            <TypeSlider id="fpc" :type="fpc"></TypeSlider>
            <div>
                <label class="activate-label" for="fb-cable">Fibre Cable :</label>
                <input class="activate-input" type="text" id="fb-cable" name="fb-cable">
            </div>
        </form>
        <MultipleRemark></MultipleRemark>
        <FinishButton :type="'Save'"></FinishButton>
        <FinishButton :type="'Finish'"></FinishButton>
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import TypeSlider from "./../resuable-lsp-detail/TypeSliderComponent";
import FinishButton from "./../resuable-lsp-detail/FinishButtonComponent";
import MultipleRemark from "./../resuable-lsp-detail/MultipleRemarkComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        TypeSlider,
        MultipleRemark,
        FinishButton,
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
        }
    }
}
</script>