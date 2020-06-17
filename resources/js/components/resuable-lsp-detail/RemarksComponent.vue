<template>
    <div class="remark">
        <p>
            {{ value.name }}
        </p>
        <p>{{ value.created_at | format-date-with-time}}</p>
    </div>
</template>

<script>
export default {
    props: [
        'value', 'created_at',
    ]
}
</script>