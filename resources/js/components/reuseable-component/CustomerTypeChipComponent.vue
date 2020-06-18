<template>
  <div v-if="value != 'Default'" class="order-customer-type">
    <span>{{value}}</span>
  </div>
</template>
<script>
export default {
    props: ['value'],
}
</script>