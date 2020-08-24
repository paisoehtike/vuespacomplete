<template>
    <div class="lsp-name">
        <div class="profile-header">
            <h2>{{ response.data.name }}</h2>
            <p v-if="response.data.leader_name">{{ response.data.leader_name }}</p>
            <p>{{ response.data.phone }}</p>
        </div>
        <div class="profile-body pb-1" v-if="response.data.teams_count">
            <h5>{{ response.data.teams_count }}</h5>
            <p>Team</p>
        </div>
        <div class="profile-body pb-1" v-else>
            <h5>{{ response.data.man_power }}</h5>
            <p>Man Power</p>
        </div>
        <div class="profile-body pb-2" v-if="response.data.assigned_order != null">
            <h5>{{ response.data.assigned_order  }}</h5>
            <p>Assigned Order</p>
        </div>
        <div class="profile-body pb-2" v-else>
            <h5>{{ response.data.remaining_job }}</h5>
            <p>Remaining</p>
        </div>
        <div class="profile-body pb-3" v-show="response.data.complete_job != null">
            <h5>{{ response.data.complete_job }}</h5>
            <p>Complete</p>
        </div>
        <div class="profile-body pb-4" v-show="response.data.history_job != null">
            <h5>{{ response.data.history_job }}</h5>
            <p>History</p>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'response',
    ]
}
</script>