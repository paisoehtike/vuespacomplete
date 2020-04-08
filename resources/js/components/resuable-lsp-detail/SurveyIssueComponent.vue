<template>
    <div class="survey-issue ">
        <div class="valign-wrapper issue-header">
            <div>
                <p class="issue-name">
                    <slot name="issue-name"></slot>
                    <i v-show="isPass" class="fas fa-check-circle green-text"></i>
                    <i v-show="isFail" class="fas fa-times-circle red-text"></i>
                </p>
            </div>
            <div class="right">
                <a v-show="!isSelect" class="button-fail" @click="fail()">Fail</a>
                <a v-show="!isSelect" class="button-pass" @click="pass()">Pass</a>
                <a v-show="isSelect" class="button-undo" @click="undo()">Undo</a>
            </div>
        </div>
        <div class="divider"></div>
        <div class="valign-wrapper issue-remark">
            <div class="ir-1">
                <p class="remark-header">Remark</p>
            </div>
            <div class="master-right ir-2">
                <RemarkModal v-show="!isMark" @review-remark="storeRemark"></RemarkModal>
               
                <RemarkModal v-show="isMark" @review-remark="updateRemark" :type="'update'" :preRemark="data.remark.name"></RemarkModal>

                <ConfirmModal v-show="isMark" @delete-confirm="deleteRemark"></ConfirmModal>
            </div>
            <div v-show="isMark" class="remark-body ir-3">
                <p>
                    {{ remark }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import RemarkModal from './../reuseable-component/RemarkModalComponent';
import ConfirmModal from './../reuseable-component/ConfirmModalComponent';

export default {
    components: {
        RemarkModal,
        ConfirmModal
    },
    props: [
        'id', 'name', 'data'
    ],
    data() {
        return {
            isSelect: false,
            isFail: false,
            isPass: false,
            isMark: false,
            remark: this.data.remark.name,
        }
    },
    methods: {
        preConfig() {
            if( this.data.status == 'false' ) {
                this.isFail = true;
                this.isPass = false;
                this.isSelect = true;
            } else if( this.data.status == 'true' ) {
                this.isPass = true;
                this.isFail = false;
                this.isSelect = true;
            } else {
                this.isFail = false;
                this.isPass = false;
                this.isSelect = false;
            }
        },
        apiCall(status) {
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/store_survey_issue_status',
                        {
                            survey_step_id: this.id,
                            status: status
                        }    
                ).then( response => { console.log(response) } ).catch(console.log('Something Went Wrong'));
        },
        storeRemark(remark) {
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/store_survey',
                {
                    remark: remark.remark,
                    name: this.name,
                    installation_request_id: this.id
                }
            ).then( response => { console.log(response, 'Response of Remark') } ).catch(console.log('Something Went Wrong'));
            this.remark = remark.remark;
            this.isMark = true;
        },
        updateRemark(remark) {
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/update_survey/' + this.data.id,
                {
                    remark_list_id: this.data.remark.remark_list_id,
                    remark: remark.remark
                }
            ).then( response => { 
                this.remark = remark.remark;
                this.isMark = true;
             } ).catch(console.log('Something Went Wrong'));
        },
        deleteRemark() {
            axios.post('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/delete_survey/' + this.data.id)
                .then( response => { 
                    console.log(response)
                    this.isMark = false; 
                }).catch(console.log('Something Went Wrong'));
        },
        fail() {
            this.apiCall('false');
            this.isFail = true;
            this.isPass = false;
            this.isSelect = true;
        },
        pass() {
            this.apiCall('true');
            this.isPass = true;
            this.isFail = false;
            this.isSelect = true;
        },
        undo() {
            this.apiCall('pending');
            this.isFail = false;
            this.isPass = false;
            this.isSelect = false;
        }
    },
    created() {
        if( this.data.status !== null ) {
            this.preConfig()
        }

        if(this.data.remark !== null) {
            this.isMark = true
        }
    }
}
</script>