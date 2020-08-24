<template>
  <div class="customer-date">
    <span>
      <slot name="lsp-accept-date"></slot>
    </span>
    <span class="divided">|</span>
    <span class="priority">
      <slot name="priority-date"></slot>
    </span>
    <br />
    <span class="issue">
      <slot name="issue"></slot>
    </span>
  </div>
</template>