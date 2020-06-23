<template>
    <div class="finish-section">
        <p class="buttonFinish" :class="{buttonSave : isSave}">
            {{ type }}
        </p>
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