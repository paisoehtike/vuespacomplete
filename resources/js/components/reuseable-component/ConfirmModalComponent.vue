<template>
    <div class="">
        <i @click="showModal = true" class="far fa-trash-alt remark-setting"></i>

        <transition name="fade" appear>
            <div class="modal-box1" v-if="showModal" @click="showModal = false">
            </div>
        </transition>

        <transition name="slide" appear>
            <div class="modal-box" v-if="showModal">
                <h3 class="text-center">You Cannot Undo This!</h3>
                <button @click="showModal = false" class="remark-cancel-btn">Cancel</button>
                <button @click="submitRemark" class="remark-save-btn">Confirm</button>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showModal: false,
        }
    },
    methods: {
        submitRemark() {
            this.$emit('delete-confirm');
            this.showModal = false;
        }
    }
}
</script>