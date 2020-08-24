<template>
  <div class="home-container">
    <div class="home-container-row">
      <div class="home-header-row">
        <Header :type="'team'"></Header>
      </div>
      <div class="home-customer-header-button">
        <HomeHeaderButton :firstUrl="url.remain" :secondUrl="url.complete" :thirdUrl="url.history">
          <template v-slot:new>{{label.remain}}</template>
          <template v-slot:accept>{{label.complete}}</template>
          <template v-slot:history>{{label.history}}</template>
        </HomeHeaderButton>
      </div>
      <RequestList :type="'team'" :status="'lsp-team-history'"></RequestList>
    </div>

    <!-- <HomeFooterButton></HomeFooterButton> -->
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
      url: {
        remain: "/lsp-home/remaining",
        history: "/lsp-home/history",
        complete: "/lsp-home/complete"
      },
      label: {
        remain: "Remaining",
        history: "History",
        complete: "Complete"
      },
      customers: [
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          issue: "24 Hrs",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          issue: "24 Hrs",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          issue: "24 Hrs",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          issue: "24 Hrs",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        },
        {
          name: "5531",
          orderStep: "Installation",
          date: "2020/3/19",
          issue: "24 Hrs",
          customerType: "VIP",
          orderStep: "Installation",
          customerName: "U Min Thant",
          address: "Mingalar Taung Nyunt",
          assigned: "Not Assigned"
        }
      ]
    };
  }
};
</script>