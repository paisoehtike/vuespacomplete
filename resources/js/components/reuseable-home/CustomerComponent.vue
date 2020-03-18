<template>
  <div class="customer-home-container">
    <div class="home-customer-container">
      <div class="customer-header-row">
        <slot name="customer-header"></slot>
        <div class="customer-type-container">
          <slot name="customer-type-row"></slot>
          <div class="customer-date">
            <slot name="customer-date"></slot>
          </div>
        </div>
      </div>
      <div class="customer-home-body-row">
        <slot name="customer-detail-chip"></slot>
      </div>
    </div>
    <slot name="customer-home-footer"></slot>
  </div>
</template>