<template>
  <div class="customer-date">
    <span>
      <slot></slot>
    </span>
    <span class="priority">
      <slot name="priority-date"></slot>
    </span>
    <br />
    <span class="issue">
      <slot name="issue"></slot>
    </span>
  </div>
</template>