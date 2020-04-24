<template>
  <div class="create-team-container">
    <div class="create-team-header">
      <router-link :to="{name: 'team'}">
        <i class="fas fa-chevron-left chevron-icon"></i>
      </router-link>
      <h5>Create New Team</h5>
    </div>
    <SquareImage></SquareImage>
    <div class="create-value-name">
      <div class="input-group">
        <label>Team Name</label>
        <br>
        <input v-model="teamName" type="text"/>
      </div>
    </div>
    <div class="create-value-name">
      <div class="input-group">
        <label>Leader Name</label>
        <br>
        <input v-model="leaderName" type="text"/>
      </div>
    </div>
    <div class="create-value-name">
      <div class="input-group">
        <label>Phone Number</label>
        <br>
        <input v-model="phone" type="text"/>
      </div>
    </div>
    <div class="create-value-name">
      <div class="input-group">
        <label>First Time Password</label>
        <br>
        <input v-model="ftPassword" type="password"/>
      </div>
    </div>
    <div class="create-value-name">
      <div class="input-group">
        <label>Man Power</label>
        <br>
        <input v-model="manPower" type="text"/>
      </div>
    </div>
    <div class="create-button">
      <a @click="storeTeam" class="waves-effect waves-light btn orange">Create</a>
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
    }
  },
  methods: {
    storeTeam() {
      axios.post(this.base_url + 'teams', 
        {
          team_name: this.teamName,
          leader_name: this.leaderName,
          phone: this.phone,
          first_time_password: this.ftPassword,
          man_power: this.manPower
        }
      ).then( res => { 
        this.redirect(res); 
      } ).catch( console.log('Error') );
    },
    redirect(res) {
      if(res.status == 201) {
        this.$router.push({ name: 'team' });
      }
    }
  }
};
</script>