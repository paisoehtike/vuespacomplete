<template>
  <div class="customer-detail-chip">
    <div class="customer-detail-name">
      <i class="fas fa-user-alt"></i>
      <span>{{value}}</span>
    </div>
    <div class="customer-detail-address">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{address}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value", "address"]
};
</script>