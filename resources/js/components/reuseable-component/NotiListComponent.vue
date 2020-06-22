<template>
    <div>
        <div @click="type == 'Admin' ? toReview() : toDetail()" class="noti-list">
        <!-- <div @click="toReview" class="noti-list"> -->
            <div class="noti-bell">
                <i class="fas fa-bell"></i>
                <div v-if="data.is_read == 0" class="noti-red-dot"></div>
            </div>
            <div>
                <p>{{ data.noti_message }}</p>
                <span>{{ data.created_at | dateFormatAgo }}</span>
            </div>
            <i class="fas fa-angle-right"></i>
        </div>
        <hr>
    </div>

</template>

<script>
const axios = require('axios');

export default {
    props: [ 'data', 'type'],
    methods: {
        toDetail() {
            axios.post(`${this.base_url}lsp_team/notification_is_read`, {id: this.data.id})
            .then( res => {
                if (res.data.code == 200) {
                    this.$router.push({ name: 'lsp-order', params: { id: this.data.request_id, orderType: this.data.type }});
                }
            }).catch(console.log('Error'));
        },
        toReview() {
            axios.post(`${this.base_url}notification_is_read`, {id: this.data.id})
            .then( res => {
                if (res.data.code == 200) {
                    this.$router.push({ name: 'order', params: { id: this.data.request_id, orderType: this.data.type }});
                }
            }).catch(console.log('Error'));
        }
    }
}
</script>