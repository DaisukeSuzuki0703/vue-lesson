<template>
  <div>
    <h2>{{ title }}</h2>
    <slot name="head"></slot>
    <slot>default slot</slot>
    <slot name="foot"></slot>
  </div>
</template>
<script>
  export default {
    beforeDestroy() {
      console.log('beforedestroy');
    },
    destroyed() {
      console.log('destroyed');
    },
    props: {
      title: {
        type: String,
      }
    }
  }
</script>