<template>
  <div class="home-header-container">
    <div class="header-row">
      <h4>LSP</h4>

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