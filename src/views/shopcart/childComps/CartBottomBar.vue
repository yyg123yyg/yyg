<template>
  <div class="bottom-bar">
    <div class="check-button">
      <CheckBotton class="CheckBotton"/>
      <div class="text">全选</div>
    </div>
    <div class="totalPrice">
      合计:{{totalPrice}}
    </div>
    <div class="calculate">
      去结算：{{checkLength}}
    </div>
  </div>
</template>

<script>
    import CheckBotton from "components/contens/checkBotton/CheckBotton";

    export default {
        name: "CartBottomBar",
        components: {
            CheckBotton
        },
        data() {
            return {}
        },
        computed: {
            totalPrice() {
                return '￥' + this.$store.state.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue, item) => {
                    return preValue += item.price * item.count
                }, 0).toFixed(2)
            },
            checkLength() {
                return this.$store.state.cartList.filter(item => item.checked).length
            }
        }
    }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #ccc;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 49px;
    padding-left: 10px;
    display: flex;
  }

  .check-button {
    /*background-color: red;*/
    width: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 40px;
  }

  .CheckBotton {
    width: 22px;
    height: 22px;
  }

  .text {
    margin-left: 5px;

  }

  .totalPrice {
    line-height: 40px;
    margin-left: 10px;
  }
  .calculate{
    line-height: 40px;


    margin-left: 62px;

    /*background-color: indianred;*/
  }

</style>
