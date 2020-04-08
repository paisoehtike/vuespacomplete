<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link to="/lsp-order" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Survey</h2>
        </router-link>
        <ProgressBar :stepNo="'1'" :type="'team'" :id="this.$route.params.id"></ProgressBar>
        <SurveyIssue v-for="(surveyIssue, index) in surveyIssues" 
            :key="index" 
            :id="masterId" 
            :name="surveyIssue.name"
            :data="surveyIssue" 
            v-slot:issue-name>

            {{ surveyIssue.name }}
        </SurveyIssue>
        <!-- <SurveyIssue v-slot:issue-name>
            FAT
        </SurveyIssue>
        <SurveyIssue v-slot:issue-name>
            Authority
        </SurveyIssue>
        <SurveyIssue v-slot:issue-name>
            ODN Issue
        </SurveyIssue>
        <SurveyIssue v-slot:issue-name>
            Customer Issue
        </SurveyIssue> -->
        <FinishButton :type="'Finish'"></FinishButton>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import SurveyIssue from "./../resuable-lsp-detail/SurveyIssueComponent";
import FinishButton from "./../resuable-lsp-detail/FinishButtonComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        SurveyIssue,
        FinishButton,
    },
    data() {
        return {
            surveyIssues: null,
            masterId: this.$route.params.id,
        }
    },
    methods: {
        addSurvey(response) {
            this.surveyIssues = response.data.data
            console.log(this.surveyIssues);
        },
        getSurvey() {
            axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/survey?installation_id=' + this.$route.params.id)
                .then( response => { this.addSurvey(response) } )
                .catch( console.log('Hint Hint') );
        }
    },
    created() {
        this.getSurvey();
    }
}
</script>