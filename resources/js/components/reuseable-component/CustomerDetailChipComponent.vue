<template>
  <div class="customer-detail-chip">
    <div class="customer-detail-name">
      <i class="fas fa-user-alt"></i>
      <span>{{value ? value:'-'}}</span>
    </div>
    <div class="customer-detail-address">
        <i class="fas fa-map-marker-alt"></i>
        <span>{{address ? address:'-'}}</span>
    </div>
    <div class="customer-detail-remark">
        <i class="far fa-clipboard"></i>
        <span>{{remark ? remark:'-'}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: ["value", "address", "remark"]
};
</script>