<template>
  <div class="create-team-container">
    <div class="create-team-header">
      <router-link :to="this.$route.params.id ? '/team/detail/' + this.$route.params.id : '/team'">
        <i class="fas fa-chevron-left chevron-icon"></i>
      </router-link>
      <h5 v-if="this.$route.params.id">Edit Team</h5>
      <h5 v-else>Create New Team</h5>
    </div>
    <SquareImage></SquareImage>
    <div class="create-value-name">
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    <div class="create-value-name">
      <div class="input-group">
        <label class="activate-label">Team Name</label>
        <span class="error-message" v-if="errors.teamName">*Require</span>
        <br>
        <input class="activate-input" v-model="teamName" type="text"/>
      </div>
    </div>
    <div class="create-value-name">
      <div class="input-group">
        <label class="activate-label">Leader Name</label>
        <span class="error-message" v-if="errors.leaderName">*Require</span>
        <br>
        <input class="activate-input" v-model="leaderName" type="text"/>
      </div>
    </div>
    <div class="create-value-name">
      <div class="input-group">
        <label class="activate-label">Phone Number</label>
        <span class="error-message" v-if="errors.phone">*Require</span>
        <br>
        <input class="activate-input" v-model="phone" type="number" min="1"/>
      </div>
    </div>
    <div v-if="!this.$route.params.id" class="create-value-name">
      <div class="input-group">
        <label class="activate-label">First Time Password</label>
        <span class="error-message" v-if="errors.ftPassword">*Require</span>
        <br>
        <input class="activate-input" v-model="ftPassword" type="password"/>
      </div>
    </div>
    <div class="create-value-name">
      <div class="input-group">
        <label class="activate-label">Man Power</label>
        <span class="error-message" v-if="errors.manPower">*Require</span>
        <br>
        <input class="activate-input" v-model="manPower" type="number" min="1"/>
      </div>
    </div>
    <div class="create-button">
      <a @click="updateTeam" v-if="this.$route.params.id" class="waves-effect waves-light btn orange">Update</a>
      <a @click="storeTeam" v-else class="waves-effect waves-light btn orange">Create</a>
    </div>
  </div>
</template>
<script>
const axios = require('axios');

import SquareImage from "./../reuseable-customer/SquareImageComponent";
import InputGroup from './../reuseable-component/InputGroupComponent';
export default {
  components: {
    SquareImage,
    InputGroup
  },
  data() {
    return {
      teamName: null,
      leaderName: null,
      phone: null,
      ftPassword: null,
      manPower: null,
      errorMessage: null,
      errors: {
        teamName: false,
        leaderName: false,
        phone: false,
        ftPassword: false,
        manPower: false,
      }
    }
  },
  methods: {
    updateTeam() {
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = false
      })
      if (!this.teamName) this.errors.teamName = true
      if (!this.leaderName) this.errors.leaderName = true
      if (!this.phone) this.errors.phone = true
      if (!this.manPower) this.errors.manPower = true

      if (!this.errors.teamName && !this.errors.leaderName && !this.errors.phone && !this.errors.manPower)
      axios.post(`${this.base_url}teams/${this.$route.params.id}`, {
        team_name: this.teamName,
        leader_name: this.leaderName,
        phone: this.phone,
        man_power: this.manPower
      }).then( res => { 
        this.redirect(res); 
      } ).catch( error => {
        this.showError(error);
      } );
    },
    storeTeam() {
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = false
      })
      if (!this.teamName) this.errors.teamName = true
      if (!this.leaderName) this.errors.leaderName = true
      if (!this.phone) this.errors.phone = true
      if (!this.ftPassword) this.errors.ftPassword = true
      if (!this.manPower) this.errors.manPower = true

      if (!this.errors.teamName && !this.errors.leaderName && !this.errors.phone && !this.errors.ftPassword && !this.errors.manPower)
      axios.post(this.base_url + 'teams', 
      {
        team_name: this.teamName,
        leader_name: this.leaderName,
        phone: this.phone,
        first_time_password: this.ftPassword,
        man_power: this.manPower
      }).then( res => { 
        this.redirect(res); 
      } ).catch( error => {
        this.showError(error);
      } );
    },
    showError(error) {
      this.errorMessage = error.response.data.message;
    },
    redirect(res) {
      if(res.status == 201 || res.status == 200) {
        this.$router.push({ name: 'team' });
      }
    },
    bindData(res) {
      this.teamName = res.data.data.name
      this.leaderName = res.data.data.leader_name
      this.phone = res.data.data.leader.phone
      this.manPower = res.data.data.man_power
    },
    get() {
      if (this.$route.params.id) {
        axios.get(`${this.base_url}teams/${this.$route.params.id}`)
        .then( res => {
          this.bindData(res)
        }).catch(console.log('Error'));
      }
    }
  },
  mounted() {
    this.get();
  }
};
</script>