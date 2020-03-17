<template>
  <div class="customer-container">
    <div class="customer-row">
      <header>
        <h5>Customer Info</h5>
      </header>
    </div>
    <div class="customer-detail-row">
      <table>
        <tbody>
          <slot></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "U Min Thant",
      account_number: "YGNFX008",
      customer_rmn: "931244244",
      p_username: "YGNFX008",
      p_password: "YGNFX008",
      phone: "09777888999",
      address: "No(20), 19th Street, Latha Township, Yangon.",
      township: "Latha"
    };
  }
};
</script>