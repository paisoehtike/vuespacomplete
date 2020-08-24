<template>
  <div class="home-customer-footer-row">
    <router-link :to="{ name: 'home-new' }">
      <span class="installation" :class="isInstallation">
        <i class="fas fa-cogs"></i>
        <br />
        <span>Installation</span>
      </span>
    </router-link>
    <router-link :to="{name: 'on-call-new'}">
      <span class="on-call" :class="isOnCall">
        <i class="fas fa-tools"></i>
        <br />
        <span>On Call</span>
      </span>
    </router-link>
    <router-link :to="{name: 'team'}">
      <span class="team">
        <i class="fas fa-users"></i>
        <br />
        <span>Team</span>
      </span>
    </router-link>
    <router-link :to="{name: 'inventory'}">
      <span class="inventory">
        <img src="/images/icons/shelf-1.png" alt v-if="splittedUrl[1] == 'inventory'" />
        <img src="/images/icons/shelf.png" alt v-else />
        <br />
        <span>Inventory</span>
      </span>
    </router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isInstallation: "",
      isOnCall: "",
      splittedUrl: ""
    }
  },
  created() {
    this.splittedUrl = window.location.pathname.split("/")
    if(this.splittedUrl[1] == 'home') {
      this.isInstallation = 'isInstallation'
    } else if (this.splittedUrl[1] == 'on-call') {
      this.isOnCall = 'isOnCall'
    }
  }
}
</script>