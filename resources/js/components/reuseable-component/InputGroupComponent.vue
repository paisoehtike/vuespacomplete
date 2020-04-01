<template>
  <div class="input-group">
    <label for>{{label}}</label>
    <br>
    <input :type="typeName" :class="className"/>
  </div>
</template>
<script>
export default {
    props: [
        'label', 'typeName', 'className'
    ]
}
</script>