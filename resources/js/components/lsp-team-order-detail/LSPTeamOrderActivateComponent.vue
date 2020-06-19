<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/lsp-order/' + this.$route.params.id + '/installation' }" tag="div" class="order-header-row">
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
                    <i @click="deleteImage(image)" class="far fa-trash-alt image-trash-icon"></i>
                </div>
                <div @click="$refs.fileInput.click()" class="img-item">
                    <i class="fas fa-plus center-align"></i>
                </div>
            </div>
            <!-- <div v-show="image !== null" class="upload-img">
                <img :src="image">
                <button @click="image = null" class="cancel">Cancel</button>
                <button @click="uploadImage" class="submit">Submit</button>
            </div> -->
            <div>
                <label class="activate-label" for="ppoe-username">PPOE Username :</label>
                <input class="activate-input" type="text" v-model="ppoeUserName" id="ppoe-username" name="ppoe-username" readonly>
            </div>
            <div>
                <label class="activate-label" for="ppoe-password">PPOE Password :</label>
                <input class="activate-input" type="text" v-model="ppoePassword" id="ppoe-password" name="ppoe-password" readonly>
            </div>
            <transition name="fade" appear>
                <div class="modal-box1" v-if="showModal || showModal1" @click="modalClose">
                </div>
            </transition>
            <div>
                <label class="activate-label" for="olt">Search and Select OLT</label>
                <span v-if="this.errors.olt">*Requried</span>
                <div @click="showModal = true" class="custom-search-box">
                    <p>{{ oltResult }}</p>
                </div>
                <transition name="slide" appear>
                    <div class="modal-box" v-if="showModal">
                        <div class="cross-close">
                            <span>Search and Select OLT</span>
                            <i @click="modalClose" class="fas fa-times"></i>
                        </div>
                        <input class="activate-input" v-model="oltSearchIndex" type="text">
                        <div class="result-box">
                            <div v-for="(value, key) in oltSearchResult" :key="key" @click="setOltSearchResult(value)" class="result-list">
                                <p>{{ value.name }}</p>
                                <hr>
                            </div>
                            <button class="load-more-button" v-if="oltPage < oltTotalPage" @click="moreOlt">Load More</button>
                        </div>
                    </div>
                </transition>
            </div>
            <div>
                <label class="activate-label" for="fdt">Search and Select FDT</label>
                <span v-if="this.errors.fdt">*Requried</span>
                <div @click="showModal1 = true" class="custom-search-box">
                    <p>{{ fdtResult }}</p>
                </div>
                <transition name="slide" appear>
                    <div class="modal-box" v-if="showModal1">
                        <div class="cross-close">
                            <span>Search and Select FDT</span>
                            <i @click="modalClose" class="fas fa-times"></i>
                        </div>
                        <p v-if="this.errors.olt_null_error_for_fdt_search">*Search OLT First</p>
                        <input class="activate-input" v-model="fdtSearchIndex" type="text">
                        <div class="result-box">
                            <div v-for="(value, key) in fdtSearchResult" :key="key" @click="setFdtSearchResult(value)" class="result-list">
                                <p>{{ value.name }}</p>
                                <hr>
                            </div>
                            <button class="load-more-button" v-if="fdtPage < fdtTotalPage" @click="moreFdt">Load More</button>
                        </div>
                    </div>
                </transition>
            </div>
            <div>
                <label class="activate-label" for="fat-port">FAT :</label>
                <span v-if="this.errors.fat">*Requried</span>
                <select v-model="fat" class="activate-input" @change="getFatPort">
                    <option disabled v-bind:value="''">Select FAT</option>
                    <option v-for="(data, index) in fats" :key="index" v-bind:value="data.id">
                        {{ data.name }}
                    </option>
                </select>
            </div>
            <div>
                <label class="activate-label" for="fat-port">FAT Port :</label>
                <span v-if="this.errors.fat_port">*Requried</span>
                <select v-model="fat_port" class="activate-input">
                    <option disabled v-bind:value="''">Select FAT Port</option>
                    <option v-for="(data, index) in fat_ports" :key="index" v-bind:value="data.id">
                        {{ data.name }}
                    </option>
                </select>
            </div>
            <!-- <div>
                <label class="activate-label" for="onu-sn">ONU S/N :</label>
                <input class="activate-input" v-model="onu_sn" type="text" id="onu-sn" name="onu-sn">
            </div> -->

            <label class="activate-label" for="onu-type">Select Router :</label>
            <span v-if="this.errors.onuId">*Requried</span>
            <TypeSlider id="onu-type" v-if="selectedOnuType" :isInstallation="true" :type="onu_type" :defaultId="selectedOnuType" @type-id="setOnuId"></TypeSlider>
            <TypeSlider id="onu-type" v-else :type="onu_type" :isInstallation="true" @type-id="setOnuId"></TypeSlider>

            <label class="activate-label" for="fpc">Fibre Patch Cord :</label>
            <span v-if="this.errors.fpcId">*Requried</span>
            <TypeSlider id="fpc" v-if="selectedFpc" :isInstallation="true" :type="fiber_patch_cord" :defaultId="selectedFpc" @type-id="setFpcId"></TypeSlider>
            <TypeSlider id="fpc" v-else :type="fiber_patch_cord" :isInstallation="true" :defaultId="selectedFpc" @type-id="setFpcId"></TypeSlider>

            <label class="activate-label" for="fpc">ONU Adapter :</label>
            <span v-if="this.errors.onuAdapterId">*Requried</span>
            <TypeSlider id="onu-adapter" v-if="selectedOnuAdapter" :isInstallation="true" :type="onu_adapter" :defaultId="selectedOnuAdapter" @type-id="setAdapterId"></TypeSlider>
            <TypeSlider id="onu-adapter" v-else :type="onu_adapter" :isInstallation="true" :defaultId="selectedOnuAdapter" @type-id="setAdapterId"></TypeSlider>

            <div>
                <label class="activate-label" for="fb-cable">Fibre Cable Length:</label>
                <span v-if="this.errors.fiber_cable_length">*Requried</span>
                <input class="activate-input" v-model="fiber_cable_length" type="number" min="1" id="fb-cable" name="fb-cable">
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
            errors: {
                olt: false,
                fdt: false,
                fat: false,
                fat_port: false,
                onuId: false,
                fpcId: false,
                fiber_cable_length: false,
                onuAdapterId: false,

                olt_null_error_for_fdt_search: false,
            },
            showModal: false,
            showModal1: false,

            oltSearchIndex: null,
            oltSearchResult: [],
            oltPage: 1,
            oltTotalPage: 1,

            fdtSearchIndex: null,
            fdtSearchResult: [],
            fdtPage: 1,
            fdtTotalPage: null,

            oltResult: 'Search..',
            fdtResult: 'Search..',

            selectedOnuType: null,
            selectedFpc: null,
            selectedOnuAdapter: null,
            remarks: null,
            images: [],
            image: null,
            imageFile: null,

            ppoeUserName: null,
            ppoePassword: null,
            olts: null,
            olt: '',
            fdts: null,
            fdt: null,
            fats: null,
            fat: null,
            fat_ports: null,
            fat_port: null,
            fiber_cable_length: null,

            fiber_cable: null,
            fiber_patch_cord: null,
            fpcId: null,
            onu_adapter: null,
            onuAdapterId: null,
            onu_type: null,
            onuId: null,
            termination_box: null,
        }
    },
    methods: {
        modalClose() {
            this.showModal = false
            this.showModal1 = false
            this.oltPage = 1
            this.oltTotalPage = 1
            this.fdtPage = 1
            this.fdtTotalPage = 1
            this.oltSearchResult = []
            this.fdtSearchResult = []
            this.oltSearchIndex = null
            this.fdtSearchIndex = null
        },
        storeOnuStep() {
            if (!this.olt || !Number.isInteger(this.olt)) this.errors.olt = true
            if (!this.fdt || !Number.isInteger(this.fdt)) this.errors.fdt = true
            if (!this.fat || !Number.isInteger(this.fat)) this.errors.fat = true
            if (!this.fat_port || !Number.isInteger(this.fat_port)) this.errors.fat_port = true
            if (!this.onuId || !Number.isInteger(this.onuId)) this.errors.onuId = true
            if (!this.fpcId || !Number.isInteger(this.fpcId)) this.errors.fpcId = true
            if (!this.fiber_cable_length) this.errors.fiber_cable_length = true
            if (!this.onuAdapterId || !Number.isInteger(this.onuAdapterId)) this.errors.onuAdapterId = true

            if(!this.errors.olt && !this.errors.fdt && !this.errors.fat && !this.errors.fat_port && !this.errors.onuId && !this.errors.fpcId && !this.errors.fiber_cable_length && !this.errors.onuAdapterId) {
                axios.post(`${this.base_url}lsp_team/activation_store`,
                    {
                        olt_id: this.olt,
                        fdt_id: this.fdt,
                        fat_id: this.fat,
                        fat_port_id: this.fat_port,
                        installation_request_id: this.$route.params.id,
                        onu_type_id: this.onuId,
                        onu_type_quantity: 1,
                        fiber_patch_cord_id: this.fpcId,
                        fiber_patch_cord_quantity: 1,
                        fiber_cable_id: this.fiber_cable[0].id,
                        fiber_cable_length: this.fiber_cable_length,
                        onu_adapter_id: this.onuAdapterId,
                        onu_adapter_quantity: 1,
                        type: 'installation'
                    }).then( res => { console.log(res) } ).catch( console.log('Sry Pl!') )
                }
        },
        onFileSelected(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            this.createImage(files[0]);
        },
        createImage(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            let vm = this
            reader.addEventListener('load', ()=>{
                vm.image = reader.result
                vm.imageFile = file
            })
        },
        uploadImage() {
            const config = {
                    headers: { 'content-type': 'multipart/form-data' }
                }
            let formData = new FormData();
            formData.append('image', this.imageFile);
            formData.append('installation_request_id', this.$route.params.id);
            axios.post(this.base_url + 'lsp_team/image_store',
            formData, config
            ).then( res => { 
                this.appendImage(res.data.data) 
            } ).catch(console.log('Cant Image'));
        },
        appendImage(img) {
            this.images.push(img);
            this.image = null;
        },
        deleteImage(img) {
            axios.post(`${this.base_url}lsp_team/image_delete/${img.id}`)
            .then( res => {
                if(res.data.code == 200) {
                    this.images = this.images.filter( function(image) {
                        return image.id != img.id; 
                    });
                }
            }).catch(console.log('Error'));
        },
        loadPreImages(images) {
            this.images = images;
        },
        preconfig(data) {
            this.onu_type = data.onu_type;
            this.fiber_patch_cord = data.fiber_patch_cord;
            this.onu_adapter = data.onu_adapter;
            this.fiber_cable = data.fiber_cable;
        },
        setOnuId(id) {
            this.onuId = id;
        },  
        setFpcId(id) {
            this.fpcId = id;
        },
        setAdapterId(id) {
            this.onuAdapterId = id;
        },
        loadPreRemarks(remarks) {
            this.remarks = remarks;
        },
        getActivate() {
            axios.get(this.base_url + 'lsp_team/onu_step?installation_id=' + this.$route.params.id)
                .then( res => { 
                    this.loadPreImages(res.data.data.images);
                    this.loadPreRemarks(res.data.data.remarks);
                    this.ppoeUserName = res.data.data.ppoe_username;
                    this.ppoePassword = res.data.data.ppoe_password;
                    if (res.data.data.olt) {
                        this.olt = res.data.data.olt.id;
                        this.oltResult = res.data.data.olt.name;
                    }
                    if (res.data.data.fdt) {
                        this.fdt = res.data.data.fdt.id;
                        this.fdtResult = res.data.data.fdt.name;
                    }
                    if (res.data.data.fat) {
                        this.fat = res.data.data.fat.id;
                    }
                    if (res.data.data.fat_port) {
                        this.fat_port = res.data.data.fat_port.id;
                    }
                    
                    this.onu_sn = res.data.data.onu_sn;
                    if (res.data.data.product_usage.onu_type != null) {
                        this.selectedOnuType = res.data.data.product_usage.onu_type.id;
                        this.onuId = res.data.data.product_usage.onu_type.id;
                    }
                    if (res.data.data.product_usage.fiber_patch_cord != null) {
                        this.selectedFpc = res.data.data.product_usage.fiber_patch_cord.id;
                        this.fpcId = res.data.data.product_usage.fiber_patch_cord.id;
                    }
                    if (res.data.data.product_usage.onu_adapter != null) {
                        this.selectedOnuAdapter = res.data.data.product_usage.onu_adapter.id;
                        this.onuAdapterId = res.data.data.product_usage.onu_adapter.id;
                    }
                    if (res.data.data.product_usage.fiber_cable != null) {
                        this.fiber_cable_length = res.data.data.product_usage.fiber_cable.quantity;
                    }
                    // if(res.data.data.product_usage != null) {
                    //     this.selectedOnuType = res.data.data.product_usage.onu_type.id;
                    //     this.selectedFpc = res.data.data.product_usage.fiber_patch_cord.id;
                    //     this.selectedOnuAdapter = res.data.data.product_usage.onu_adapter.id;
                    //     this.fiber_cable_length = res.data.data.product_usage.fiber_cable.quantity;
                    // }
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
        },
        getOlt() {
            axios.get(`${this.base_url}get_olt_lists`)
            .then( res => {
                this.olts = res.data.data
            }).catch(console.log('Error'));
        },
        setOltSearchResult(val) {
            this.oltResult = val.name
            this.olt = val.id
            this.oltPage = 1
            this.fdtResult = 'Search..'
            this.fat = ''
            this.fats = []
            this.fat_port = ''
            this.fat_ports = []
            this.modalClose()
        },
        moreOlt() {
            this.oltPage = this.oltPage+1;
            axios.get(`${this.base_url}get_olt_lists?q=${this.oltSearchIndex}&page=${this.oltPage}`)
            .then( res => {
                res.data.data.forEach(element => {
                    this.oltSearchResult.push(element)
                });
            }).catch(console.log('Error'));
        },
        setFdtSearchResult(val) {
            this.fdtResult = val.name
            this.fdt = val.id
            this.showModal1 = false
            this.fdtPage = 1
            this.fat_port = ''
            this.fat_ports = []
            this.modalClose()
        },
        moreFdt() {
            this.fdtPage = this.fdtPage+1;
            axios.get(`${this.base_url}get_fdt_lists/${this.olt}?q=${this.oltSearchIndex}&page=${this.fdtPage}`)
            .then( res => {
                res.data.data.forEach(element => {
                    this.oltSearchResult.push(element)
                });
            }).catch(console.log('Error'));
        },
        getFdt() {
            axios.get(`${this.base_url}get_fdt_lists/${this.olt}`)
            .then( res => {
                this.fdts = res.data.data
                this.fdt = ''
            }).catch(console.log('Error'));
        },
        getFat() {
            axios.get(`${this.base_url}get_fat_lists/${this.fdt}`)
            .then( res => {
                this.fats = res.data.data
                if (!this.fat) {
                    this.fat = ''
                }
            }).catch(console.log('Error'));
        },
        getFatPort() {
            axios.get(`${this.base_url}get_fat_port_lists/${this.fat}`)
            .then( res => {
                this.fat_ports = res.data.data
                if (!this.fat_port) {
                    this.fat_port = ''
                }
            }).catch(console.log('Error'));
        }
    },
    watch: {
        fdt: function(val) {
            this.getFat();
        },
        fat: function(val) {
            this.getFatPort();
        },
        oltSearchIndex: function(val) {
            if (val.length >= 2) {
                this.oltPage = 1
                setTimeout(() => {
                    axios.get(`${this.base_url}get_olt_lists?q=${val}&page=${this.oltPage}`)
                    .then( res => {
                        this.oltSearchResult = res.data.data
                        this.oltTotalPage = res.data.meta.total_pages
                    }).catch(console.log('Error'));
                }, 1000)
            }
        },
        fdtSearchIndex: function(val) {
            if (!this.olt) {
                this.errors.olt_null_error_for_fdt_search = true;
            }
            this.fdtPage = 1
            if (val.length >= 2 && this.olt) {
                setTimeout(() => {
                    axios.get(`${this.base_url}get_fdt_lists/${this.olt}?q=${val}&page=${this.fdtPage}`)
                    .then( res => {
                        this.fdtSearchResult = res.data.data
                        this.fdtTotalPage = res.data.meta.total_pages
                    }).catch(console.log('Error'));
                }, 1000)
            }
        },
        imageFile(val){
            if(val){
                this.uploadImage()
            }
        }
    },
    created() {
        this.getActivate();
        this.getInventory();
    }
}
</script>