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
      <RequestList :request_type="'installation'" :type="'admin'" :status="'accepted'" :isHistory="false"></RequestList>
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
    }
  }
}
</script>