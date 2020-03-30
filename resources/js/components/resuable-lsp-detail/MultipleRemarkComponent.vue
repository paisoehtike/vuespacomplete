<template>
    <div class="multi-remark">
        <div class="valign-wrapper multi-issue-remark">
            <div>
                <p class="multi-remark-header">Remark</p>
            </div>
            <div class="right">
                <RemarkModal @review-remark="storeRemark"></RemarkModal>
            </div>
        </div>
        <div v-for="(remark, index) in remarks" :key="index" class="valign-wrapper multi-remark-body">
            <div class="mrb-1">
                <p>
                    {{ remark.remark }}
                </p>
            </div>
            <div class="mrb-2">
                <p>2020/3/22 | 14:92</p>
            </div>
            <div class="mrb-3 right">
                <i class="far fa-edit remark-setting"></i>
                <i class="far fa-trash-alt remark-setting"></i>
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
import RemarkModal from "./../reuseable-component/RemarkModalComponent";

export default {
    components: {
        RemarkModal,
    },
    data() {
        return {
            remarks: [],
        }
    },
    methods: {
        storeRemark(remark) {
            this.remarks.push(remark);
        }
    }
}
</script>