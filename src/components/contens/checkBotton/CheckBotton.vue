<template>
  <div class="check-button" :class="{check:isChecked }">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
    export default {
        name: "CheckBotton",
        props: {
            isChecked: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
  .check-button {
    width: 22px;
    height: 22px;
    text-align: center;
    border-radius: 50%;
    border: 1px solid #aaa;
  }
  .check{
    background-color: red;
    border-color: red;
  }
</style>
