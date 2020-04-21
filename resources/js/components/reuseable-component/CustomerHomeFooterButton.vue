<template>
  <div class="customer-home-footer-row">
    <div class="customer-home-footer-detail-row">
      <div class="customer-home-assigned-team">
        <label for="assigned-header">Assigned Team</label>
        <br />
        <span><slot name="assign"></slot></span>
      </div>
      <div class="customer-home-assigned-button">
        <a class="btn" id="accept">Accept</a>
      </div>
    </div>
  </div>
</template>