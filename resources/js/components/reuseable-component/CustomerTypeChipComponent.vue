<template>
  <div class="order-customer-type">
    <span v-if="value">{{value}}</span>
  </div>
</template>
<script>
export default {
    props: ['value'],
}
</script>