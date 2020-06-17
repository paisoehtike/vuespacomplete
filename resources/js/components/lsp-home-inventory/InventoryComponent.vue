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
        <tr v-for="(value, index) in response" :key="index">
          <td>{{ value.name }}</td>
          <td class="qty">{{ value.quantity }}</td>
        </tr>
      </tbody>
    </table>
    <HomeFooterButton></HomeFooterButton>
  </div>
</template>

<script>
const axios = require('axios');

import Header from "./../reuseable-home/HeaderComponent";
import HomeFooterButton from "./../reuseable-component/HomeFooterButtonComponent";
export default {
  components: {
    Header,
    HomeFooterButton
  },
  data() {
    return {
      response: null,
    }
  },
  methods: {
    bindData(res) {
      this.response = res.data.data;
    },
    get() {
      axios.get(`${this.base_url}get_all_lsp_inventory`)
      .then( res => {
        this.bindData(res);
      }).catch(console.log('Error'));
    }
  },
  mounted() {
    this.get();
  }
};
</script>