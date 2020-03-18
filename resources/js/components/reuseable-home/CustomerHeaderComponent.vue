<template>
  <div class="customer-home-header">
    <h4>{{ id }}</h4>
    <span>{{ step }}</span>
  </div>
</template>
<script>
export default {
    props: ['id', 'step']
}
</script>