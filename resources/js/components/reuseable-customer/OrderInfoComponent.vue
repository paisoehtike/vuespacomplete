<template>
  <div class="order-info-container">
    <div class="order-info-row">
      <header>
        <h5>order Info</h5>
      </header>
    </div>
    <div class="order-info-detail-row">
      <table>
        <tbody>
          <tr>
            <td class="table-color">Order ID</td>
            <td>{{order_id}}</td>
          </tr>
          <tr>
            <td class="table-color">Order Type</td>
            <td>{{order_type}}</td>
          </tr>
          <tr>
            <td class="table-color">Due</td>
            <td>{{due}}</td>
          </tr>
          <tr>
            <td class="table-color">Status</td>
            <td>{{status}}</td>
          </tr>
          <tr>
            <td class="table-color">Plan Name</td>
            <td>{{plan_name}}</td>
          </tr>
          <tr>
            <td class="table-color">Promo Name</td>
            <td>{{promo_name}}</td>
          </tr>
          <tr>
            <td class="table-color">Created Date</td>
            <td>{{created_date}}</td>
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
            order_id: '5531',
            order_type: 'Relocation',
            due: '22-02-2020',
            status: 'Splicing',
            plan_name: 'Premium',
            promo_name: '-',
            created_date: '17-02-2020'
        }
    }
}
</script>