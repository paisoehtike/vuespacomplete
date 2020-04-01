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
      <InputGroup name="team_name" :label="'Team Name :'" :typeName="'text'"/>
    </div>
    <div class="create-value-name">
      <InputGroup name="leader_name" :label="'Leader Name :'" :typeName="'text'"/>
    </div>
    <div class="create-value-name">
      <InputGroup name="phone_number" :label="'Phone Number :'" :typeName="'text'"/>
    </div>
    <div class="create-value-name">
      <InputGroup name="first_password" :label="'First Time Password :'" :typeName="'password'"/>
    </div>
    <div class="create-value-name">
      <InputGroup name="man_power" :label="'Man Power :'" :typeName="'text'" :className="'create-man-power'"/>
    </div>
    <div class="create-button">
      <a class="waves-effect waves-light btn orange">Create</a>
    </div>
  </div>
</template>
<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
import InputGroup from './../reuseable-component/InputGroupComponent';
export default {
  components: {
    SquareImage,
    InputGroup
  }
};
</script>