<template>
    <div class="order-detail-container">
        <div class="order-detail-header">
            <div class="order-customer-type">
                <span>{{customerType}}</span>
            </div>
            <div class="order-step">
                <span>{{orderStep}}</span>
            </div>
        </div>
        <div class="order-detail-id">
            <h4>{{orderDetailID}}</h4>
        </div>
        <div class="order-type">
            <p>{{orderType}}</p>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            customerType: 'VVIP',
            orderStep: 'Splicing',
            orderDetailID: '5531',
            orderType: 'On Call',
        }
    }
}
</script>