<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/lsp-order/' + this.$route.params.id + '/on_call' }" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Repair</h2>
        </router-link>
        <form action="" class="activate-form">
            <h6>Replace Items</h6>

            <label class="activate-label">ONU S/N :</label>
            <TypeSlider v-if="selectedOnuType" :type="onu_type" :defaultId="selectedOnuType" @type-id="setOnuId"></TypeSlider>
            <TypeSlider v-else :type="onu_type" :defaultId="selectedOnuType" @type-id="setOnuId"></TypeSlider>

            <label class="activate-label">Fibre Patch Cord :</label>
            <TypeSlider v-if="selectedFpc" :type="fiber_patch_cord" :defaultId="selectedFpc" @type-id="setFpcId"></TypeSlider>
            <TypeSlider v-else :type="fiber_patch_cord" :defaultId="selectedFpc" @type-id="setFpcId"></TypeSlider>

            <label class="activate-label">Termination Box :</label>
            <TypeSlider v-if="selectedTb" :type="termination_box" :defaultId="selectedTb" @type-id="setTbId"></TypeSlider>
            <TypeSlider v-else :type="termination_box" :defaultId="selectedTb" @type-id="setTbId"></TypeSlider>

            <label class="activate-label">ONU Adapter :</label>
            <TypeSlider v-if="selectedOnuAdapter" :type="onu_adapter" :defaultId="selectedOnuAdapter" @type-id="setOnuAdapterId"></TypeSlider>
            <TypeSlider v-else :type="onu_adapter" :defaultId="selectedOnuAdapter" @type-id="setOnuAdapterId"></TypeSlider>
            
            <div>
                <label class="activate-label" for="fb-cable">Fibre Cable Length :</label>
                <input class="activate-input" v-model="fiber_cable_length" type="text" name="fb-cable">
            </div>
        </form>
        <MultipleRemark :type="'repair'" :id="this.$route.params.id" :multipleRemarks="remarks" @reload="refresh"></MultipleRemark>
        <FinishButton @click.native="storeRepair" :type="'Save'"></FinishButton>
        <FinishButton :type="'Finish'"></FinishButton>
    </div>
</template>

<script>
const axios = require('axios');

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
    data() {
        return {
            remarks: null,

            fiber_cable_length: null,

            selectedOnuType: null,
            selectedFpc: null,
            selectedTb: null,
            selectedOnuAdapter: null,

            fiber_cable: null,
            fiber_patch_cord: null,
            fpcId: null,
            onu_adapter: null,
            onuAdapterId: null,
            onu_type: null,
            onuId: null,
            termination_box: null,
            tbId: null,
        }
    },
    methods: {
        setOnuId(id) {
            this.onuId = id;
        },  
        setFpcId(id) {
            this.fpcId = id;
        },
        setTbId(id) {
            this.tbId = id;
        },
        setOnuAdapterId(id) {
            this.onuAdapterId = id;
        },
        loadPreRemarks(remarks) {
            this.remarks = remarks;
        },
        preconfigInventory(data) {
            this.onu_type = data.onu_type;
            this.termination_box = data.termination_box;
            this.onu_adapter = data.onu_adapter;
            this.fiber_patch_cord = data.fiber_patch_cord;
            this.fiber_cable = data.fiber_cable;
        },
        preconfigRepair(res) {
            if(res.data.data.remarks !== null) {
                this.remarks = res.data.data.remarks;
            }

            if(res.data.data.product_usage !== null) {
                this.selectedOnuType = res.data.data.product_usage.onu_type.id;
                this.selectedFpc = res.data.data.product_usage.fiber_patch_cord.id;
                this.selectedTb = res.data.data.product_usage.termination_box.id;
                this.selectedOnuAdapter = res.data.data.product_usage.onu_adapter.id;
            }
        },
        refresh() {
            this.getRepair();
        },
        getRepair() {
            axios.get(this.base_url + 'lsp_team/repair?on_call_request_id=' + this.$route.params.id)
            .then( res => { 
                this.preconfigRepair(res);
            } ).catch( console.log('Error') );
        },
        getInventory() {
            axios.get(this.base_url + 'lsp_team/activation_inventory')
            .then( res => {
                this.preconfigInventory(res.data.data);
            }).catch( console.log('Error') );
        },
        storeRepair() {
            axios.post(this.base_url + 'lsp_team/repair_store',
                {
                    on_call_request_id: this.$route.params.id,
                    onu_type_id: this.onuId,
                    onu_type_quantity: 1,
                    fiber_patch_cord_id: this.fpcId,
                    fiber_patch_cord_quantity: 1,
                    termination_box_id: this.tbId,
                    termination_box_quantity: 1,
                    onu_adapter_id: this.onuAdapterId,
                    onu_adapter_quantity: 1,
                    fiber_cable_id: this.fiber_cable[0].id,
                    fiber_cable_length: this.fiber_cable_length,
                    type: 'on_call'
                }
            ).then( res => { console.log(res) } ).catch( console.log('Sry Pl!') )
        },
    },
    created() {
        this.getRepair();
        this.getInventory();
    }
}
</script>