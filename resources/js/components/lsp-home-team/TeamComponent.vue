<template>
  <div class="team-container">
    <div class="team-body-row">
      <h5>
        <slot name="team-name"></slot>
      </h5>
      <span class="name">
        <slot name="customer-name"></slot>
      </span>
      <br />
      <div class="remaing-row">
        <span>Remaining Jobs:</span>
        <span>
          <slot name="total-remaining"></slot>
        </span>
      </div>
    </div>
    <div class="team-complete-row">
      <div class="team-user-row">
        <i class="fas fa-users"></i>
        <span>
          <slot name="total-man-power"></slot>
        </span>
      </div>
      <br />
      <div class="complete-row">
        <span>Complete:</span>
        <span>
          <slot name="total-complete"></slot>
        </span>
      </div>
    </div>
  </div>
</template>