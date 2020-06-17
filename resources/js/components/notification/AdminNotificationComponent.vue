<template>
    <div>
        <div class="notification-container">
            <router-link to="/home/new" tag="div" class="order-header-row">
                <i class="fas fa-chevron-left"></i>
                <h2>Notifications</h2>
            </router-link>
        </div>
        <div class="notification-box-container">
            <NotiList v-for="(value, key) in notifications" :key="key" :data="value" :type="'Admin'"></NotiList>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import NotiList from "./../reuseable-component/NotiListComponent";

export default {
    components: {
        SquareImage,
        NotiList
    },
    data() {
        return {
            notifications: null,
        }
    },
    methods: {
        bindData(res) {
            this.notifications = res.data.data;
        },
        get() {
            axios.get(`${this.base_url}admin_notification_lists`)
            .then( res => {
                this.bindData(res)
            }).catch(console.log('Error'));
        }
    },
    mounted() {
        this.get();
    }
}
</script>