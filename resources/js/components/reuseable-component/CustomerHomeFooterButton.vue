<template>
  <div class="customer-home-footer-row">
    <div class="customer-home-footer-detail-row">
      <div class="customer-home-assigned-team">
        <label for="assigned-header">Assigned Team</label>
        <br />
        <span><slot name="assign"></slot></span>
      </div>
      <div class="customer-home-assigned-button">
        <slot name="isAccept"></slot>
        <!-- <a class="btn" id="accept"><slot name="isAccept"></slot></a> -->
      </div>
    </div>
  </div>
</template>