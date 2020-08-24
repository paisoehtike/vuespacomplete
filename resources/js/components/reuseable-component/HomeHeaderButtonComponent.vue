<template>
  <div class="home-customer-header-button-container">
    <router-link :to="firstUrl">
      <span class="btn new">
        <slot name="new"></slot>
      </span>
    </router-link>
    <router-link :to="secondUrl">
      <span class="btn accept">
        <slot name="accept"></slot>
      </span>
    </router-link>
    <router-link :to="thirdUrl">
      <span class="btn history">
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