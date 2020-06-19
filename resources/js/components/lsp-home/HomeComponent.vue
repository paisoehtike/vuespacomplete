<template>
  <div class="home-container">
    <div class="home-container-row">
      <div class="home-header-row">
        <Header :type="'admin'"></Header>
      </div>
      <div class="home-customer-header-button">
        <HomeHeaderButton :firstUrl="url.new" :secondUrl="url.accept" :thirdUrl="url.history">
          <template v-slot:new>{{label.new}}</template>
          <template v-slot:accept>{{label.accept}}</template>
          <template v-slot:history>{{label.history}}</template>
        </HomeHeaderButton>
      </div>
      <RequestList :request_type="'installation'" :type="'admin'" :status="'new'" :isHistory="false"></RequestList>
    </div>

    <HomeFooterButton></HomeFooterButton>
  </div>
</template>
<script>

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
        new: "/home/new",
        accept: "/home/accept",
        history: "/home/history"
      },
      requests: null
    };
  },
  methods: {
    toOrder(request) {
      this.$router.push({ name: 'order', params: { id: request.id, order_type: 'Installation' }});
    },
    bindResponseData(response) {
      this.requests = response.data.data;
    },
    getNew() {
      axios.get('https://5bb-lsp-dev.mm-digital-solutions.com/api/installation_requests?type=new')
      .then( response => { this.bindResponseData(response) })
      .catch(console.log('Something Went Wrong!'));
    }
  }
}
</script>