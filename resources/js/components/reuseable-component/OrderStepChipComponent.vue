<template>
  <div v-if="status === 'Complete' || status === 'Finish'" class="order-step"
  v-bind:class="completeOrFinish">
    <span>{{status}}</span>
  </div>
  <div v-else class="order-step">
    <span>{{value}}</span>
  </div>
</template>
<script>
export default {
    props: ['value', 'status',],
    computed: {
      completeOrFinish: function () {
        return {
          completeStatus: this.status === 'Complete',
          finishStatus: this.value === 'Finish',
        }
      },
    },
}
</script>
