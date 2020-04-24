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
                <input class="activate-input" type="text" v-model="ppoeUserName" id="ppoe-username" name="ppoe-username" readonly>
            </div>
            <div>
                <label class="activate-label" for="ppoe-password">PPOE Password :</label>
                <input class="activate-input" type="text" v-model="ppoePassword" id="ppoe-password" name="ppoe-password" readonly>
            </div>
            <div>
                <label class="activate-label" for="olt">OLT :</label>
                <input class="activate-input" v-model="olt" type="text" id="olt" name="olt">
            </div>
            <div>
                <label class="activate-label" for="fdt">FDT :</label>
                <input class="activate-input" v-model="fdt" type="text" id="fdt" name="fdt">
            </div>
            <div>
                <label class="activate-label" for="fat-port">FAT Port :</label>
                <input class="activate-input" v-model="fat_port" type="text" id="fat-port" name="fat-port">
            </div>
            <div>
                <label class="activate-label" for="onu-sn">ONU S/N :</label>
                <input class="activate-input" v-model="onu_sn" type="text" id="onu-sn" name="onu-sn">
            </div>
            <label class="activate-label" for="onu-type">ONU S/N :</label>
            <TypeSlider id="onu-type" v-if="selectedOnuType" :type="onu_type" :defaultId="selectedOnuType" @type-id="setOnuId"></TypeSlider>
            <TypeSlider id="onu-type" v-else :type="onu_type" :defaultId="selectedOnuType" @type-id="setOnuId"></TypeSlider>
            <label class="activate-label" for="fpc">Fibre Patch Cord :</label>
            <TypeSlider id="fpc" v-if="selectedFpc" :type="fiber_patch_cord" :defaultId="selectedFpc" @type-id="setFpcId"></TypeSlider>
            <TypeSlider id="fpc" v-else :type="fiber_patch_cord" :defaultId="selectedFpc" @type-id="setFpcId"></TypeSlider>
            <div>
                <label class="activate-label" for="fb-cable">Fibre Cable Length:</label>
                <input class="activate-input" v-model="fiber_cable_length" type="text" id="fb-cable" name="fb-cable">
            </div>
        </div>
        <MultipleRemark :type="'activation'" :id="this.$route.params.id" :multipleRemarks="remarks" @reload="getActivation"></MultipleRemark>
        <FinishButton @click.native="storeOnuStep" :type="'Save'"></FinishButton>
        <FinishButton @click.native="storeStep" :type="'Finish'"></FinishButton>
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
            selectedOnuType: null,
            selectedFpc: null,
            remarks: null,
            images: null,
            image: null,
            imageFile: null,

            ppoeUserName: null,
            ppoePassword: null,
            olt: null,
            fdt: null,
            fat_port: null,
            onu_sn: null,
            fiber_cable_length: null,

            fiber_cable: null,
            fiber_patch_cord: null,
            fpcId: null,
            onu_adapter: null,
            onu_type: null,
            onuId: null,
            termination_box: null,
        }
    },
    methods: {
        storeOnuStep() {
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/activation_store',
                {
                    olt: this.olt,
                    fdt: this.fdt,
                    fat_port: this.fat_port,
                    onu_sn: this.onu_sn,
                    installation_request_id: this.$route.params.id,
                    onu_type_id: this.onuId,
                    onu_type_quantity: 1,
                    fiber_patch_cord_id: this.fpcId,
                    fiber_patch_cord_quantity: 1,
                    fiber_cable_id: this.fiber_cable[0].id,
                    fiber_cable_length: this.fiber_cable_length,
                    type: 'installation'
                }
            ).then( res => { console.log(res) } ).catch( console.log('Sry Pl!') )
        },
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
        preconfig(data) {
            this.onu_type = data.onu_type;
            this.fiber_patch_cord = data.fiber_patch_cord;
            this.fiber_cable = data.fiber_cable;
        },
        setOnuId(id) {
            this.onuId = id;
        },  
        setFpcId(id) {
            this.fpcId = id;
        },
        loadPreRemarks(remarks) {
            this.remarks = remarks;
        },
        getActivate() {
            axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/onu_step?installation_id=' + this.$route.params.id)
                .then( res => { 
                    this.loadPreImages(res.data.data.images);
                    this.loadPreRemarks(res.data.data.remarks);
                    this.ppoeUserName = res.data.data.ppoe_username;
                    this.ppoePassword = res.data.data.ppoe_password;
                    this.olt = res.data.data.olt;
                    this.fdt = res.data.data.fdt;
                    this.fat_port = res.data.data.fat_port;
                    this.onu_sn = res.data.data.onu_sn;

                    if(res.data.data.product_usage !== null) {
                        this.selectedOnuType = res.data.data.product_usage.onu_type.id;
                        this.selectedFpc = res.data.data.product_usage.fiber_patch_cord.id;
                        this.fiber_cable_length = res.data.data.product_usage.fiber_cable.quantity;
                    }
                } )
                .catch( console.log('Error') );
        },
        getInventory() {
            axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/activation_inventory')
                .then( res => {
                    this.preconfig(res.data.data);
                }).catch( console.log('Error') );
        },
        getActivation() {
            this.getActivate();
        },
        storeStep() {
            axios.post(this.base_url + 'lsp_team/installation_step', 
                {
                    installation_request_id: this.$route.params.id,
                    step: 'splicing'
                }
            ).then( res => { 
                if(res.status == 200) {
                    this.$router.push('/lsp-home/remaining');
                }
            } ).catch( console.log('Error') );
        }
    },
    created() {
        this.getActivate();
        this.getInventory();
    }
}
</script>