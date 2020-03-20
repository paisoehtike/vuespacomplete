<template>
  <div class="home-customer-header-button-container">
    <router-link :to="firstUrl">
      <span class="waves-effect btn new">
        <slot name="new"></slot>
      </span>
    </router-link>
    <router-link :to="secondUrl">
      <span class="waves-effect btn accept">
        <slot name="accept"></slot>
      </span>
    </router-link>
    <router-link :to="thirdUrl">
      <span class="waves-effect btn history">
        <slot name="history"></slot>
      </span>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["firstUrl", "secondUrl", "thirdUrl"],
};
</script>