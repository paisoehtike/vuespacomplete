<template>
    <div class="order-container">
        <SquareImage></SquareImage>
        <router-link to="/lsp-order/splicing" tag="div" class="order-header-row">
            <i class="fas fa-chevron-left"></i>
            <h2>Activating For ONU</h2>
        </router-link>
        <ProgressBar :stepNo="'4'" :type="'admin'"></ProgressBar>
        <TeamInfo>
            <TableRow v-for="(value,label) in issueLists" :key="label" :label="label" :value="value"></TableRow>
        </TeamInfo>
        <div class="remarks">
            <h3>Remarks</h3>
            <Remarks v-for="(value, key) in remarks" :key="key" :value="value.remark" :created_at="value.created_at"></Remarks>
        </div>
    </div>
</template>

<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import ProgressBar from "./../resuable-lsp-detail/ProgressBarComponent";
import TeamInfo from "./../lsp-home-team/TeamInfoComponent";
import TableRow from "./../reuseable-component/TableRowComponent";
import Remarks from "./../resuable-lsp-detail/RemarksComponent";

export default {
    components: {
        SquareImage,
        ProgressBar,
        TeamInfo,
        TableRow,
        Remarks,
    },
    data() {
        return {
            remarks: [
                {
                    remark: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. In illo sapiente officiis. Officia inventore earum exercitationem sit reiciendis dicta iure!',
                    created_at: '2020/03/12 | 14:92'
                },
                {
                    remark: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. In illo sapiente officiis. Officia inventore earum exercitationem sit reiciendis dicta iure!',
                    created_at: '2020/03/12 | 14:92'
                }
            ],
            issueLists: {
                image: "-",
                ppoeUserName: "YGN233eZWe",
                ppoePassword: "YGN233eZWe",
                olt: "-",
                fdt: "-",
                fatPort: "-",
                onuSn: "-",
                onuType: "ZTE",
                fiberPatchCord: "-",
                fiberCable: "-",
            }
        }
    }
}
</script>