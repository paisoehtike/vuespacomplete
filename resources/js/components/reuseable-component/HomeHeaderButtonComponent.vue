<template>
  <div class="home-customer-header-button-container">
    <a class="waves-effect btn new">
      <slot name="new"></slot>
    </a>
    <a class="waves-effect btn accept">
      <slot name="accept"></slot>
    </a>
    <a class="waves-effect btn history">
      <slot name="history"></slot>
    </a>
  </div>
</template>