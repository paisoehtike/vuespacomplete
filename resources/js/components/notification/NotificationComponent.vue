<template>
    <div>
        <div class="notification-container">
            <router-link to="/lsp-home/remaining" tag="div" class="order-header-row">
                <i class="fas fa-chevron-left noti-left"></i>
                <h2>Notifications</h2>
            </router-link>
        </div>
        <div class="notification-box-container">
            <NotiList v-for="(value, key) in notifications" :key="key" :data="value"></NotiList>
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
            notifications: [],
            page: 1,
            total_page: null,
        }
    },
    beforeMount() {
        window.addEventListener("scroll", this.infiniteHandler)
    },
    methods: {
        infiniteHandler() {
            if (document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight) {
                if (this.page <= this.total_page) {
                    this.get();
                }
            }
        },
        bindData(res) {
            res.data.data.forEach(result => {
                this.notifications.push(result);
            });
            this.page = res.data.meta.current_page +1; //to get next page
            this.total_page = res.data.meta.total_pages;
        },
        get() {
            axios.get(`${this.base_url}lsp_team/team_notification_lists?page=${this.page}`)
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