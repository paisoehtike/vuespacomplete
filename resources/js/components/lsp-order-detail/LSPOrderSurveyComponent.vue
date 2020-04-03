<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link tag="div" to="/order" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Survey</h2>
        </router-link>
        <ProgressBar :stepNo="'1'" :type="'admin'"></ProgressBar>
        <TeamInfo>
            <TableRow v-for="(value,label) in issueLists" :key="label" :label="label" :value="value"></TableRow>
        </TeamInfo>
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import TeamInfo from "./../lsp-home-team/TeamInfoComponent";
import TableRow from "./../reuseable-component/TableRowComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        TeamInfo,
        TableRow,
    },
    data() {
        return {
            issueLists: {
                poleIssue: "Pass",
                fat: "Fail",
                authority: "Pass",
                odnIssue: "No Issue",
                customerIssue: "Issue 1",
            }
        }
    }
}
</script>