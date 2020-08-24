<template>
  <div class="home-header-container">
    <div class="header-row">
      <h4 v-if="type == 'admin'">LSP</h4>
      <h4 v-else>LSP Team</h4>

      <router-link :to="type == 'admin' ? '/home/notification': '/lsp-team/notification'" tag="i" class="fas fa-bell noti-bell"></router-link>
      <router-link :to="type == 'admin' ? '/home/profile': '/lsp-team/profile'" tag="i" class="fas fa-user-circle"></router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'type',
  ]
}
</script>