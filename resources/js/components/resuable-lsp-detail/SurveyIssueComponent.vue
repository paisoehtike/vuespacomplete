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
            <div class="right ir-2">
                <RemarkModal v-show="!isMark" @review-remark="storeRemark"></RemarkModal>
                <!-- <i v-show="!isMark" @click="remark()" class="fas fa-plus add-remark"></i> -->
                <i v-show="isMark" class="far fa-edit remark-setting"></i>
                <i v-show="isMark" class="far fa-trash-alt remark-setting"></i>
            </div>
            <div v-show="isMark" class="remark-body ir-3">
                <p>Lat - 23.222211</p>
                <p>Lng - 21.221122</p>
                <p>
                    {{ remark }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import RemarkModal from './../reuseable-component/RemarkModalComponent';

export default {
    components: {
        RemarkModal,
    },
    data() {
        return {
            isSelect: false,
            isFail: false,
            isPass: false,
            isMark: false,
            remark: null,
        }
    },
    methods: {
        storeRemark(remark) {
            this.remark = remark.remark;
            this.isMark = true;
        },
        fail() {
            this.isFail = true;
            this.isPass = false;
            this.isSelect = true;
        },
        pass() {
            this.isPass = true;
            this.isFail = false;
            this.isSelect = true;
        },
        undo() {
            this.isFail = false;
            this.isPass = false;
            this.isSelect = false;
        }
    }
}
</script>