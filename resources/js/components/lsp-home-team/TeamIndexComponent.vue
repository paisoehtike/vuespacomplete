<template>
  <div class="team-index-container">
    <div class="team-index-container-row">
      <div class="team-index-header-row">
        <Header :type="'admin'"></Header>
      </div>
      <Teams v-for="(team, index) in teams" :key="index" @click.native="toDetail(team.id)">
        <template v-slot:team-name>{{team.name}}</template>

        <template v-slot:customer-name>{{team.leader_name}}</template>

        <template v-slot:total-remaining>{{team.remaining_jobs }}</template>

        <template v-slot:total-man-power>{{team.man_power }}</template>

        <template v-slot:total-complete>{{team.completed_jobs }}</template>
      </Teams>
    </div>

    <div class="create-new-team-button">
      <router-link :to="{name: 'team-create'}">
        <span class="add-button-style">
          <i class="fas fa-plus"></i>
          <span>Create New Team</span>
        </span>
      </router-link>
    </div>
    <HomeFooterButton></HomeFooterButton>
  </div>
</template>
<script>
const axios = require('axios');

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
      teams: null,
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: 'team-detail', params: { id: id } });
    },
    bindTeams(response) {
      this.teams = response.data.data
    },
    getTeams() {
      axios.get(this.base_url + 'teams')
        .then( response => { this.bindTeams(response) } )
        .catch( console.log('Error') );
    }
  },
  created() {
    this.getTeams();
  }
}
</script>