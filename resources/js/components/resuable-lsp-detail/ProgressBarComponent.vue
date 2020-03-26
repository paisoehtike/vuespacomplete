<template>
    <div class="progress-bar">
        <ul class="progressbar">
            <router-link to="/lsp-order/survey" tag="li" :class="{ selected: isSurvey }">
                <p>Survey</p>
            </router-link>
            <router-link to="/lsp-order/cabling" tag="li" :class="{ selected: isCabling }">
                <p>Cabling</p>
            </router-link>
            <router-link to="/lsp-order/splicing" tag="li" :class="{ selected: isSplicing }">
                <p>Splicing</p>
            </router-link>
            <router-link to="/lsp-order/activate" tag="li" :class="{ selected: isActivate }">
                <p>Activate</p>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    props: [
        'step',
    ],
    data() {
        return {
            isSurvey: false,
            isCabling: false,
            isSplicing: false,
            isActivate: false,
        }
    },
    methods: {
        whichStep() {
            if ( this.step == 'survey' ) {
                this.isSurvey = true;
                this.isCabling = false;
                this.isSplicing = false;
                this.isActivate = false;
            } else if ( this.step == 'cabling' ) {
                this.isSurvey = true;
                this.isCabling = true;
                this.isSplicing = false;
                this.isActivate = false;
            } else if ( this.step == 'splicing' ) {
                this.isSurvey = true;
                this.isCabling = true;
                this.isSplicing = true;
                this.isActivate = false;
            } else if ( this.step == 'activate' ) {
                this.isSurvey = true;
                this.isCabling = true;
                this.isSplicing = true;
                this.isActivate = true;
            }
        }
    },
    mounted() {
        this.whichStep();
    }
}
</script>