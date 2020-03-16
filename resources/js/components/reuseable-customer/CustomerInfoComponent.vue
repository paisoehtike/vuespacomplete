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
          <tr>
            <td class="table-color">Customer Name</td>
            <td>{{name}}</td>
          </tr>
          <tr>
            <td class="table-color">Customer Account No</td>
            <td>{{account_number}}</td>
          </tr>
          <tr>
            <td class="table-color">Customer RMN</td>
            <td>{{customer_rmn}}</td>
          </tr>
          <tr>
            <td class="table-color">PPOE Username</td>
            <td>{{p_username}}</td>
          </tr>
          <tr>
            <td class="table-color">PPOE Password</td>
            <td>{{p_password}}</td>
          </tr>
          <tr>
            <td class="table-color">Phone</td>
            <td>{{phone}}</td>
          </tr>
          <tr>
            <td class="table-color">Address</td>
            <td>{{address}}</td>
          </tr>
          <tr>
            <td class="table-color">Township</td>
            <td>{{township}}</td>
          </tr>
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