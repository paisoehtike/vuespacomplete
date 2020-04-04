<template>
    <div class="dummy">
        <a @click="showModal = true" class="waves-effect btn">{{ assignOrSwitch }}</a>

        <transition name="fade" appear>
            <div class="modal-box1" v-if="showModal" @click="showModal = false">
            </div>
        </transition>

        <transition name="slide" appear>
            <div class="modal-box" v-if="showModal">
                <div class="assign-team-modal-header">
                    <CustomerTypeChip :value="customer.customerType" slot="customer-chip"></CustomerTypeChip>
                    <OrderStepChip :value="customer.orderStep" slot="order-chip"></OrderStepChip>
                </div>
                <div class="customer-request-detail">
                    <div>
                        <CustomerHeader :id="customer.name" :step="customer.orderStep"></CustomerHeader>
                    </div>
                    <div class="customer-request-date">
                        <CustomerIssueDate slot="customer-date">
                            {{customer.date}}
                            <template
                                v-slot:priority-date
                                v-if="customer.priority"
                                >| {{customer.priority}} Hrs</template>
                            <template
                                v-slot:issue
                                v-if="customer.issue"
                                >| {{ customer.issue }}</template>
                        </CustomerIssueDate>
                    </div>
                </div>
                <CustomerDetailChip
                    slot="customer-detail-chip"
                    :value="customer.customerName"
                    :address="customer.address"
                ></CustomerDetailChip>
                <h2 v-if="type == 'Accept'">Assigned Team :</h2>
                <Teams v-if="type == 'Accept'">
                    <template v-slot:team-name>{{assignedTeam.teamName}}</template>

                    <template v-slot:customer-name>{{assignedTeam.customerName}}</template>

                    <template v-slot:total-remaining>{{assignedTeam.remaining}}</template>

                    <template v-slot:total-man-power>{{assignedTeam.manPower}}</template>

                    <template v-slot:total-complete>{{assignedTeam.complete}}</template>
                </Teams>
                <h2>Select Team to Assign :</h2>
                <div class="assign-team-wrapper">
                    <Teams v-for="(team, index) in teams" :key="index">
                        <template v-slot:team-name>{{team.teamName}}</template>

                        <template v-slot:customer-name>{{team.customerName}}</template>

                        <template v-slot:total-remaining>{{team.remaining}}</template>

                        <template v-slot:total-man-power>{{team.manPower}}</template>

                        <template v-slot:total-complete>{{team.complete}}</template>
                    </Teams>
                </div>
                <div class="modal-button-box">
                    <button @click="showModal = false" class="cancel-button">Cancel</button>
                    <button @click="showModal = false" class="remark-save-btn">Save</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import CustomerTypeChip from "./../reuseable-component/CustomerTypeChipComponent";
import OrderStepChip from "./../reuseable-component/OrderStepChipComponent";
import CustomerHeader from "./../reuseable-home/CustomerHeaderComponent";
import CustomerIssueDate from "./../reuseable-component/CustomerIssueDateComponent";
import CustomerDetailChip from "./../reuseable-component/CustomerDetailChipComponent";
import Teams from "./../lsp-home-team/TeamComponent";

export default {
    props: [
        'customer', 'type',
    ],
    components: {
        CustomerTypeChip,
        OrderStepChip,
        CustomerHeader,
        CustomerIssueDate,
        CustomerDetailChip,
        Teams,
    },
    data() {
        return {
            showModal: false,
            assignOrSwitch: null,
            assignedTeam: {
                teamName: "Team A",
                customerName: "Min Min",
                remaining: "5",
                manPower: "6",
                complete: "3"
            },
            teams: [
                {
                    teamName: "Team A",
                    customerName: "Min Min",
                    remaining: "5",
                    manPower: "6",
                    complete: "3"
                },
                {
                    teamName: "Team B",
                    customerName: "Aung Aung",
                    remaining: "5",
                    manPower: "6",
                    complete: "3"
                },
                {
                    teamName: "Team C",
                    customerName: "Kyaw Aung",
                    remaining: "5",
                    manPower: "6",
                    complete: "3"
                },
            ]
        }
    },
    methods: {
        isAssigned() {
            if(this.type == 'New') {
                this.assignOrSwitch = 'Assign';
            } else {
                this.assignOrSwitch = 'Switch';
            }
        }
    },
    mounted() {
        this.isAssigned();
    }
}
</script>