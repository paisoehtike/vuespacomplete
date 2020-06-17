<template>
  <div class="customer-home-header">
    <h4>{{ id }}</h4>
    <span v-if="step">{{ step | capitalize }}</span>
    <span v-else>On Call</span>
  </div>
</template>
<script>
export default {
    props: ['id', 'step']
}
</script>