<template>
  <div class="customer-home-container">
    <div class="home-customer-container">
      <div class="customer-header-row">
        <slot></slot>
        <div class="customer-type-container">
          <div class="customer-type-row" slot="customer-type-row">
            <slot name="customer-chip"></slot>
            <slot name="order-chip"></slot>
          </div>
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