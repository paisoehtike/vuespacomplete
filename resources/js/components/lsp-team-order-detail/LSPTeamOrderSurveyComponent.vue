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
            @status="changeStatus('pole_issue', ...arguments)"
            v-slot:issue-name>

            {{ surveyIssues.pole_issue.name }}
        </SurveyIssue>
        <SurveyIssue  
            :data="surveyIssues.authority"
            @status="changeStatus('authority', ...arguments)"
            v-slot:issue-name>

            {{ surveyIssues.authority.name }}
        </SurveyIssue>
        <SurveyIssue  
            :data="surveyIssues.fat"
            @status="changeStatus('fat', ...arguments)"
            v-slot:issue-name>

            {{ surveyIssues.fat.name }}
        </SurveyIssue>
        <SurveyIssue  
            :data="surveyIssues.odn_issue"
            @status="changeStatus('odn_issue', ...arguments)"
            v-slot:issue-name>

            {{ surveyIssues.odn_issue.name }}
        </SurveyIssue>
        <SurveyIssue  
            :data="surveyIssues.customer_issue"
            @status="changeStatus('customer_issue', ...arguments)"
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
            errors: {
                poleIssueStatus: null,
                authorityStatus: null,
                fatStatus: null,
                odnIssueStatus: null,
                customerIssueStatus: null,
            },
            blockApiCall: null,
        }
    },
    methods: {
        changeStatus(type, status) {
            switch(type) {
                case 'pole_issue':
                    this.errors.poleIssueStatus = status
                    break;
                case 'authority':
                    this.errors.authorityStatus = status
                    break;
                case 'fat':
                    this.errors.fatStatus = status
                    break;
                case 'odn_issue':
                    this.errors.odnIssueStatus = status
                    break;
                case 'customer_issue':
                    this.errors.customerIssueStatus = status
                    break;
            }
        },
        addSurvey(response) {
            this.errors.poleIssueStatus = response.data.data.pole_issue.status
            this.errors.authorityStatus = response.data.data.authority.status
            this.errors.fatStatus = response.data.data.fat.status
            this.errors.odnIssueStatus = response.data.data.odn_issue.status
            this.errors.customerIssueStatus = response.data.data.customer_issue.status
            this.surveyIssues = response.data.data
        },
        getSurvey() {
            axios.get(this.base_url + 'lsp_team/survey?installation_id=' + this.$route.params.id)
                .then( response => { this.addSurvey(response) } )
                .catch( console.log('Error') );
        },
        storeStep() {
            Object.keys(this.errors).forEach(key => {
                if(this.errors[key] == 'pending' || this.errors[key] == null) {
                    alert('Please take all survey!')
                    this.blockApiCall = true
                    return
                } else {
                    this.blockApiCall = false
                }
            })

            if(!this.blockApiCall) {
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
        }
    },
    mounted() {
        this.getSurvey();
    }
}
</script>