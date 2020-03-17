<template>
    <div class="home-container">
        <div class="home-header-row">
            <Header></Header>
        </div>
        <div>

        </div>
        <div class="home-customer-row">
            <Customer></Customer>
        </div>
    </div>
</template>
<script>
import Header from './../reuseable-home/HeaderComponent'
import Customer from './../reuseable-home/CustomerComponent'
export default {
    components: {
        Header,
        Customer
    }
}
</script>