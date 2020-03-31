<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <div class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Survey</h2>
        </div>
        <ProgressBar :stepNo="'1'" :type="'team'"></ProgressBar>
        <SurveyIssue v-slot:issue-name>
            Pole Issue
        </SurveyIssue>
        <SurveyIssue v-slot:issue-name>
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
        </SurveyIssue>
        <FinishButton :type="'Finish'"></FinishButton>
    </div>
</template>

<script>
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
    }
}
</script>