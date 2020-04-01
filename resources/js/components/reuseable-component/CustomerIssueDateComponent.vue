<template>
  <div class="customer-date">
    <span>
      <slot></slot>
    </span>
    <span> | </span>
    <span class="issue">
      <slot name="issue"></slot>
    </span>
  </div>
</template>