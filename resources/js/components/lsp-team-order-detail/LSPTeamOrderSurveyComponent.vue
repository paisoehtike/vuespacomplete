<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link :to="{ path: '/lsp-order/' + this.$route.params.id + '/installation' }" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Survey</h2>
        </router-link>
        <ProgressBar :stepNo="'1'" :type="'team'" :id="this.$route.params.id"></ProgressBar>
        <SurveyIssue  
            :data="surveyIssues.pole_issue" 
            v-slot:issue-name>

            {{ surveyIssues.pole_issue.name }}
        </SurveyIssue>
        <SurveyIssue  
            :data="surveyIssues.authority" 
            v-slot:issue-name>

            {{ surveyIssues.authority.name }}
        </SurveyIssue>
        <SurveyIssue  
            :data="surveyIssues.fat" 
            v-slot:issue-name>

            {{ surveyIssues.fat.name }}
        </SurveyIssue>
        <SurveyIssue  
            :data="surveyIssues.odn_issue" 
            v-slot:issue-name>

            {{ surveyIssues.odn_issue.name }}
        </SurveyIssue>
        <SurveyIssue  
            :data="surveyIssues.customer_issue" 
            v-slot:issue-name>

            {{ surveyIssues.customer_issue.name }}
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
        <FinishButton @click.native="storeStep" :type="'Finish'"></FinishButton>
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
        }
    },
    methods: {
        addSurvey(response) {
            this.surveyIssues = response.data.data
        },
        getSurvey() {
            axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/lsp_team/survey?installation_id=' + this.$route.params.id)
                .then( response => { this.addSurvey(response) } )
                .catch( console.log('Error') );
        },
        storeStep() {
            axios.post(this.base_url + 'lsp_team/installation_step', 
                {
                    installation_request_id: this.$route.params.id,
                    step: 'survey'
                }
            ).then( res => { 
                if(res.status == 200) {
                    this.$router.push('/lsp-team-order/' + this.$route.params.id + '/cabling');
                }
            } ).catch( console.log('Error') );
        }
    },
    created() {
        this.getSurvey();
    }
}
</script>