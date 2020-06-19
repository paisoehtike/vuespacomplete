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
               
                <RemarkModal v-show="isMark" 
                    @review-remark="updateRemark" 
                    :type="'update'" 
                    :preRemark="data.remark != null ? data.remark.name : remark">
                </RemarkModal>

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
        'data'
    ],
    data() {
        return {
            isSelect: false,
            isFail: false,
            isPass: false,
            isMark: false,
            remark: null,
            remarkId: null,
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
        },
        apiCall(status) {
            axios.post(this.base_url + 'lsp_team/store_survey_issue_status',
                        {
                            status: status,
                            survey_step_id: this.data.id
                        }    
                ).then( response => { 
                    if(response.data.code == 200) alert('Success!')
                 } ).catch(console.log('Something Went Wrong'));
        },
        storeRemarkApiCall(remark) {
            axios.post(this.base_url + 'lsp_team/store_survey',
                {
                    remark: remark.remark,
                    survey_step_id: this.data.id
                }
            ).then( response => { 
                this.remarkId = response.data.data.remark.id
                this.remark = response.data.data.remark.name
             } ).catch(console.log('Something Went Wrong'));
        },
        storeRemark(remark) {
            this.remark = remark.remark;
            this.isMark = true;
            this.storeRemarkApiCall(remark);
        },
        updateRemark(remark) {
            axios.post(this.base_url + 'lsp_team/update_survey/' + this.remarkId,
                {
                    remark: remark.remark
                }
            ).then( response => { 
                this.remark = remark.remark;
                this.isMark = true;
             } ).catch(console.log('Something Went Wrong'));
        },
        deleteRemark() {
            axios.post(this.base_url + 'lsp_team/delete_survey/' + this.remarkId)
                .then( response => { 
                    if(response.data.code == 200) alert('Successfully Deleted!')
                    this.isMark = false; 
                }).catch(console.log('Something Went Wrong'));
        },
    },
    created() {
        if( this.data.status !== null ) {
            this.preConfig()
        }

        if(this.data.remark !== null) {
            this.remark = this.data.remark.name
            this.remarkId = this.data.remark.id
            this.isMark = true
        }
    }
}
</script>