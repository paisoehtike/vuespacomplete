<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <div class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h5>Survey</h5>
        </div>
        <ProgressBar>
            <li class="active">
                <p>Survey</p>
            </li>
            <li class="">
                <p>Cabling</p>
            </li>
            <li class="">
                <p>Splicing</p>
            </li>
            <li class="">
                <p>Activate</p>
            </li>
        </ProgressBar>
        <SurveyIssue v-slot:issue-name>
            ODN Issue
        </SurveyIssue>
        <SurveyIssue v-slot:issue-name>
            Customer Issue
        </SurveyIssue>
        <FinishButton></FinishButton>
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