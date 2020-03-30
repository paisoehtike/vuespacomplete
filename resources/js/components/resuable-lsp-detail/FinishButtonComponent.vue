<template>
    <div class="finish-section">
        <button class="buttonFinish" :class="{buttonSave : isSave}">
            {{ type }}
        </button>
    </div>
</template>

<script>
export default {
    props: [
        'type'
    ],
    data() {
        return {
            isSave: false,
        }
    },
    methods: {
        saveOrFinish() {
            if( this.type == 'Save' ) {
                this.isSave = true;
            } else {
                this.isSave = false;
            }
        }
    },
    mounted() {
        this.saveOrFinish();
    }
}
</script>