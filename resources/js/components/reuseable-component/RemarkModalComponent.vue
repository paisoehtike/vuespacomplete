<template>
    <div class="">
        <i v-if="type == 'update'" @click="showModal = true" class="far fa-edit remark-setting"></i>
        <i v-else @click="showModal = true" class="fas fa-plus add-remark"></i>

        <transition name="fade" appear>
            <div class="modal-box1" v-if="showModal" @click="showModal = false">
            </div>
        </transition>

        <transition name="slide" appear>
            <div class="modal-box" v-if="showModal">
                <h3 class="text-center">Remark</h3>
                <!-- <p>Please Add Latitude and Longitude</p> -->
                <textarea v-model="remark" rows="9" name="remark" form="usrform">Write Remark</textarea>
                <button @click="showModal = false" class="remark-cancel-btn">Cancel</button>
                <button @click="submitRemark" class="remark-save-btn">Save</button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    props: [
        'type', 'preRemark'
    ],
    data() {
        return {
            showModal: false,
            remark: null,
        }
    },
    methods: {
        submitRemark() {
            let remark = {
                'remark': this.remark,
            }
            this.$emit('review-remark', remark);
            this.showModal = false;
            this.remark = null;
        }
    },
    watch: {
        preRemark: function(val) {
            this.remark = val;
        }
    },
    created() {
        this.remark = this.preRemark;
    }
}
</script>