<template>
  <div class="create-team-container">
    <div class="create-team-header">
      <router-link :to="{name: 'team'}">
        <i class="fas fa-chevron-left chevron-icon"></i>
      </router-link>
      <h5>Create New Team</h5>
    </div>
    <SquareImage></SquareImage>
    <div class="create-team-name">
      <label for="Name">Team Name:</label>
      <input type="text" />
    </div>
    <div class="create-leader-name">
      <label for="Name">Leader Name:</label>
      <input type="text" />
    </div>
    <div class="create-man-power">
      <label for="Name">Man Power:</label>
      <input type="text" />
    </div>
    <div class="create-button">
      <a class="waves-effect waves-light btn orange">Create</a>
    </div>
  </div>
</template>
<script>
import SquareImage from "./../reuseable-customer/SquareImageComponent";
export default {
  components: {
    SquareImage
  }
};
</script>