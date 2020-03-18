<template>
  <div class="customer-home-footer-row">
    <div class="customer-home-footer-detail-row">
      <div class="customer-home-assigned-team">
        <label for="assigned-header">Assigned Team</label>
        <br />
        <slot></slot>
      </div>
      <div class="customer-home-assigned-button">
        <slot name="button"></slot>
      </div>
    </div>
  </div>
</template>