<template>
  <div class="customer-home-footer-row">
    <div class="customer-home-footer-detail-row">
      <div class="customer-home-assigned-team">
        <label for="assigned-header">Assigned Team</label>
        <br />
        <span><slot name="assign"></slot></span>
      </div>
      <div class="customer-home-assigned-button">
        <AssignOrSwitchTeamComponent :customer="customer" :type="type"></AssignOrSwitchTeamComponent>
      </div>
    </div>
  </div>
</template>

<script>
import AssignOrSwitchTeamComponent from "./../lsp-home/AssignOrSwitchTeamComponent";

export default {
  props: [
    'customer', 'type',
  ],
  components: {
    AssignOrSwitchTeamComponent,
  }
}
</script>