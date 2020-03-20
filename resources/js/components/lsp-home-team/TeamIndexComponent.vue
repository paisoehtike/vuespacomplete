<template>
  <div class="team-index-container">
    <div class="team-index-container-row">
      <div class="team-index-header-row">
        <Header></Header>
      </div>
      <Teams v-for="(team, index) in teams" :key="index">
        <template v-slot:team-name>{{team.teamName}}</template>

        <template v-slot:customer-name>{{team.customerName}}</template>

        <template v-slot:total-remaining>{{team.remaining}}</template>

        <template v-slot:total-man-power>{{team.manPower}}</template>

        <template v-slot:total-complete>{{team.complete}}</template>
      </Teams>
    </div>

    <div class="create-new-team-button">
      <router-link :to="{name: 'team-create'}">
        <span class="waves-effect waves-light btn orange">
          <i class="fas fa-plus"></i>
          <span>Create New Team</span>
        </span>
      </router-link>
    </div>
    <HomeFooterButton></HomeFooterButton>
  </div>
</template>
<script>
import Header from "./../reuseable-home/HeaderComponent";
import HomeFooterButton from "./../reuseable-component/HomeFooterButtonComponent";
import Teams from "./TeamComponent";

export default {
  components: {
    Header,
    HomeFooterButton,
    Teams
  },
  data() {
    return {
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
          customerName: "Mg Mg",
          remaining: "5",
          manPower: "6",
          complete: "3"
        },
        {
          teamName: "Team C",
          customerName: "Mg Mg",
          remaining: "5",
          manPower: "6",
          complete: "3"
        },
        {
          teamName: "Team C",
          customerName: "Mg Mg",
          remaining: "5",
          manPower: "6",
          complete: "3"
        },
        {
          teamName: "Team C",
          customerName: "Mg Mg",
          remaining: "5",
          manPower: "6",
          complete: "3"
        },
        {
          teamName: "Team C",
          customerName: "Mg Mg",
          remaining: "5",
          manPower: "6",
          complete: "3"
        },
        {
          teamName: "Team C",
          customerName: "Mg Mg",
          remaining: "5",
          manPower: "6",
          complete: "3"
        }
      ]
    };
  }
};
</script>