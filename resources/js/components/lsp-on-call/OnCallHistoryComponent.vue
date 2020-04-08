<template>
  <div class="home-container">
    <div class="home-container-row">
      <div class="home-header-row">
        <Header></Header>
      </div>
      <div class="home-customer-header-button">
        <HomeHeaderButton :firstUrl="url.new" :secondUrl="url.accept" :thirdUrl="url.history">
          <template v-slot:new>{{label.new}}</template>
          <template v-slot:accept>{{label.accept}}</template>
          <template v-slot:history>{{label.history}}</template>
        </HomeHeaderButton>
      </div>
      <RequestList :type="'On-call'" :requests="requests"></RequestList>
    </div>

    <HomeFooterButton></HomeFooterButton>
  </div>
</template>
<script>
const axios = require('axios');

import Header from "./../reuseable-home/HeaderComponent";
import HomeHeaderButton from "./../reuseable-component/HomeHeaderButtonComponent";
import HomeFooterButton from "./../reuseable-component/HomeFooterButtonComponent";
import RequestList from "./../reuseable-component/RequestListComponent";

export default {
  components: {
    Header,
    HomeHeaderButton,
    HomeFooterButton,
    RequestList
  },
  data() {
    return {
      label: {
        new: "New",
        accept: "Accepted",
        history: "History"
      },
      url: {
        new: "/on-call/new",
        accept: "/on-call/accept",
        history: "/on-call/history"
      },
      requests: null
    };
  },
  methods: {
    toRepair() {
      this.$router.push('/lsp-order/repair');
    },
    bindResponseData(response) {
      this.requests = response.data.data;
      console.log(this.requests);
    },
    getNew() {
      axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/on_call_requests?type=history')
      .then( response => { this.bindResponseData(response) })
      .catch(console.log('Something Went Wrong!'));
    }
  },
  created() {
    this.getNew();
  }
};
</script>