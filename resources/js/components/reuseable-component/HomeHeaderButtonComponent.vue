<template>
  <div class="home-customer-header-button-container">
    <router-link :to="{name: 'home-new'}">
      <a class="waves-effect btn new">
        <slot name="new"></slot>
      </a>
    </router-link>
    <a class="waves-effect btn accept">
      <slot name="accept"></slot>
    </a>
    <a class="waves-effect btn history">
      <slot name="history"></slot>
    </a>
  </div>
</template>
<script>
export default {
  props: ["new"],
  created() {
    console.log(this.new, "new");
  }
};
</script>