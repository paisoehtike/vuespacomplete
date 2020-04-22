<template>
  <div class="inventory-container">
    <Header :type="'admin'"></Header>

    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th class="qty">Qty</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>Alvin</td>
          <td class="qty">10</td>
        </tr>
        <tr>
          <td>Alan</td>
          <td class="qty">20</td>
        </tr>
        <tr>
          <td>Jonathan</td>
          <td class="qty">30</td>
        </tr>
      </tbody>
    </table>
    <HomeFooterButton></HomeFooterButton>
  </div>
</template>

<script>
import Header from "./../reuseable-home/HeaderComponent";
import HomeFooterButton from "./../reuseable-component/HomeFooterButtonComponent";
export default {
  components: {
    Header,
    HomeFooterButton
  }
};
</script>