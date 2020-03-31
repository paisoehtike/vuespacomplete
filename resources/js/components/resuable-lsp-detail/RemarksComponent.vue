<template>
    <div class="remark">
        <p>
            {{ value }}
        </p>
        <p>{{ created_at }}</p>
    </div>
</template>

<script>
export default {
    props: [
        'value', 'created_at',
    ]
}
</script>