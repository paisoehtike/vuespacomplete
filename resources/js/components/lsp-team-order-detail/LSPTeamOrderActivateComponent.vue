<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/lsp-team-order/' + this.$route.params.id + '/splicing'}" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Activating For ONU</h2>
        </router-link>
        <ProgressBar :stepNo="'4'" :type="'team'" :id="this.$route.params.id"></ProgressBar>
        <div action="" class="activate-form">
            <label class="activate-label" for="image">Add Image :</label>
            <input type="file" @change="onFileSelected" ref="fileInput" style="display: none;">
            <div class="add-img">
                <div v-for="(image, index) in images" :key="index" class="pre-img-item">
                    <img :src="image.full_image" class="center-align">
                </div>
                <div @click="$refs.fileInput.click()" class="img-item">
                    <i class="fas fa-plus center-align"></i>
                </div>
            </div>
            <div v-show="image !== null" class="upload-img">
                <img :src="image">
                <button @click="image = null" class="cancel">Cancel</button>
                <button @click="uploadImage" class="submit">Submit</button>
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
        </div>
        <MultipleRemark></MultipleRemark>
        <FinishButton :type="'Save'"></FinishButton>
        <FinishButton :type="'Finish'"></FinishButton>
    </div>
</template>

<script>
const axios = require('axios');

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
    data() {
        return {
            images: null,
            image: null,
            imageFile: null,
        }
    },
    methods: {
        onFileSelected(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
            // this.image = files[0];
        },
        createImage(file) {
            var image = new Image();
            var reader = new FileReader();
            reader.onload = (e) => {
                this.image = e.target.result;
                this.imageFile = file
            };
            reader.readAsDataURL(file);
            // this.uploadImage();
        },
        uploadImage() {
            const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            
            let formData = new FormData();
            formData.append('image', this.imageFile);
            formData.append('installation_request_id', this.$route.params.id);
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/image_store',
            formData, config
            ).then( res => { 
                this.appendImage(res.data.data) 
            } ).catch(console.log('Cant Image'));
        },
        appendImage(img) {
            this.images.push(img);
            this.image = null;
        },
        loadPreImages(images) {
            this.images = images;
        },
        getActivate() {
            axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/onu_step?installation_id=' + this.$route.params.id)
                .then( res => { 
                    this.loadPreImages(res.data.data.images); 
                } )
                .catch( console.log('Error') );
        },
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
    },
    created() {
        this.getActivate();
    }
}
</script>