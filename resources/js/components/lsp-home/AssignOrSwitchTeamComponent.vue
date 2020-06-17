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
                    <CustomerTypeChip v-if="customer.customer_type != null" :value="customer.customer_type.name" slot="customer-chip"></CustomerTypeChip>
                    <OrderStepChip v-if="customer.installation_step != null" :value="customer.installation_step.name" slot="order-chip"></OrderStepChip>
                </div>
                <div class="customer-request-detail">
                    <div>
                        <CustomerHeader :id="customer.customer" :step="customer.type"></CustomerHeader>
                    </div>
                    <div class="customer-request-date">
                        <CustomerIssueDate slot="customer-date">
                            <template 
                                v-slot:lsp-accept-date
                                v-if="customer.due_date != null"
                                >{{customer.due_date | format-date}}</template>
                            <template
                                v-slot:priority-date
                                v-if="customer.priority_level != null"
                                > {{customer.priority_level.name}} </template>
                            <template
                                v-slot:issue
                                v-if="customer.issue != null"
                                > {{ customer.issue.name }}</template>
                        </CustomerIssueDate>
                    </div>
                </div>
                <CustomerDetailChip
                    slot="customer-detail-chip"
                    :value="customer.name"
                    :address="customer.customer_detail.township.name"
                ></CustomerDetailChip>
                <h2 v-if="type == 'Accept'">Assigned Team :</h2>
                <Teams v-if="type == 'Accept'">
                    <template v-slot:team-name>{{assignedTeam.name}}</template>

                    <template v-slot:customer-name>{{assignedTeam.leader_name}}</template>

                    <template v-slot:total-remaining>{{assignedTeam.remaining_jobs}}</template>

                    <template v-slot:total-man-power>{{assignedTeam.man_power}}</template>

                    <template v-slot:total-complete>{{assignedTeam.completed_jobs}}</template>
                </Teams>
                <h2>Select Team to Assign :</h2>
                <div class="assign-team-wrapper">
                    <Teams
                    @click.native="teamSelect(team, index)"
                    :class="{teamClick:selected == index}" 
                    v-for="(team, index) in teams" 
                    :key="index">
                        <template v-slot:team-name>{{team.name}}</template>

                        <template v-slot:customer-name>{{team.leader_name}}</template>

                        <template v-slot:total-remaining>{{team.remaining_jobs}}</template>

                        <template v-slot:total-man-power>{{team.man_power}}</template>

                        <template v-slot:total-complete>{{team.completed_jobs}}</template>
                    </Teams>
                </div>
                <div class="modal-button-box">
                    <button @click="showModal = false" class="cancel-button">Cancel</button>
                    <button @click="assignTeam" class="remark-save-btn">Save</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
const axios = require('axios');

import CustomerTypeChip from "./../reuseable-component/CustomerTypeChipComponent";
import OrderStepChip from "./../reuseable-component/OrderStepChipComponent";
import CustomerHeader from "./../reuseable-home/CustomerHeaderComponent";
import CustomerIssueDate from "./../reuseable-component/CustomerIssueDateComponent";
import CustomerDetailChip from "./../reuseable-component/CustomerDetailChipComponent";
import Teams from "./../lsp-home-team/TeamComponent";

export default {
    props: [
        'customer', 'type', 'teams', 'assignedTeam', 'requestType'
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
            selected: null,
            teamId: null,
        }
    },
    methods: {
        isAssigned() {
            if(this.type == 'New') {
                this.assignOrSwitch = 'Assign';
            } else {
                this.assignOrSwitch = 'Switch';
            }
        },
        teamSelect(team, index) {
            this.selected = index;
            this.teamId = team.id;
        },
        assignTeam() {
            axios.post(this.base_url + 'assigned_team',
                {
                    requested_id: this.$route.params.id,
                    requested_type: this.requestType,
                    lsp_team_id: this.teamId
                }
            ).then( res => { 
                if(res.status == 201) {
                    this.showModal = false;
                    this.$emit('reload');
                    this.assignOrSwitch = 'Switch';
                    this.type = 'Accept';
                }
            }).catch( console.log('Error') );
        }
    },
    mounted() {
        this.isAssigned();
    }
}
</script>