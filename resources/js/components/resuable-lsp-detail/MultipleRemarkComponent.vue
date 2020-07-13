<template>
    <div class="multi-remark">
        <div class="valign-wrapper multi-issue-remark">
            <div>
                <p class="multi-remark-header">Remark</p>
            </div>
            <div class="right">
                <RemarkModal @review-remark="storeRemark" :isComplete="isComplete"></RemarkModal>
            </div>
        </div>
        <div v-for="(multipleRemark, index) in multipleRemarks" :key="index" class="valign-wrapper multi-remark-body">
            <div class="mrb-1">
                <p>
                    {{ multipleRemark.name }}
                </p>
            </div>
            <div class="mrb-2">
                <p>{{ multipleRemark.updated_at | format-date-with-time}}</p>
            </div>
            <div class="mrb-3 master-right">
                <RemarkModal @review-remark="remarkUpdate(multipleRemark.id, ...arguments)" :isComplete="isComplete" :type="'update'" :preRemark="multipleRemark.name"></RemarkModal>
                <ConfirmModal @delete-confirm="deleteRemark(multipleRemark.id)" :isComplete="isComplete"></ConfirmModal>
            </div>
        </div>
        <!-- <div class="valign-wrapper multi-remark-body">
            <div class="mrb-1">
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est pariatur atque asperiores.
                </p>
            </div>
            <div class="mrb-2">
                <p>2020/3/22 | 14:92</p>
            </div>
            <div class="mrb-3 right">
                <i class="far fa-edit remark-setting"></i>
                <i class="far fa-trash-alt remark-setting"></i>
            </div>
        </div> -->
    </div>
</template>

<script>
const axios = require('axios');

import RemarkModal from "./../reuseable-component/RemarkModalComponent";
import ConfirmModal from './../reuseable-component/ConfirmModalComponent';

export default {
    components: {
        RemarkModal,
        ConfirmModal
    },
    props: [
        'type', 'id', 'multipleRemarks', 'isComplete'
    ],
    methods: {
        deleteRemark(id) {
            if(this.type == 'splicing') {
                axios.post(this.base_url + 'lsp_team/delete_splicing/' + id)
                .then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else if(this.type == 'activation') {
                axios.post(this.base_url + 'lsp_team/activation_remark_delete/' + id)
                .then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else if(this.type == 'repair') {
                axios.post(this.base_url + 'lsp_team/repair_remark_delete/' + id)
                .then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else {
                axios.post(this.base_url + 'lsp_team/delete_cabling/' + id)
                .then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            }
        },
        remarkUpdate(id, remark) {
            if(this.type == 'splicing') {
                axios.post(this.base_url + 'lsp_team/update_splicing/' + id,
                {
                    remark: remark.remark
                }
                ).then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else if(this.type == 'activation') {
                axios.post(this.base_url + 'lsp_team/activation_remark_update/' + id,
                {
                    remark: remark.remark
                }
                ).then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else if(this.type == 'repair') {
                axios.post(this.base_url + 'lsp_team/repair_remark_update/' + id,
                {
                    remark: remark.remark
                }
                ).then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else {
                axios.post(this.base_url + 'lsp_team/update_cabling/' + id,
                {
                    remark: remark.remark
                }
                ).then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            }
        },
        storeRemark(remark) {
            if(this.type == 'splicing') {
                axios.post(this.base_url + 'lsp_team/store_splicing',
                {
                    installation_request_id: this.id,
                    remark: remark.remark
                }
                ).then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else if(this.type == 'activation') {
                axios.post(this.base_url + 'lsp_team/activation_remark_store',
                {
                    installation_request_id: this.id,
                    remark: remark.remark
                }
                ).then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else if(this.type == 'repair') {
                axios.post(this.base_url + 'lsp_team/repair_remark_store',
                {
                    on_call_request_id: this.id,
                    remark: remark.remark
                }
                ).then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            } else {
                axios.post(this.base_url + 'lsp_team/store_cabling',
                {
                    installation_request_id: this.id,
                    remark: remark.remark
                }
                ).then( response => { 
                    this.$emit('reload');
                })
                .catch(console.log('Error'));
            }
        }
    }
}
</script>