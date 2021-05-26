<template>
  <div class="bottom-bar">
    <div class="check-button">
      <CheckBotton @click.native="checkClick"
                   :isChecked="isSelcetAll" class="CheckBotton"/>
      <div class="text">全选</div>
    </div>
    <div class="totalPrice">
      合计:{{totalPrice}}
    </div>
    <div class="calculate" @click="clacClick">
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
        methods: {
            checkClick() {
                // 全部选中
                if (this.isSelcetAll) {
                    this.$store.state.cartList.forEach(item => {
                        return item.checked = false
                    })
                } else {//有部分或全部选中
                    this.$store.state.cartList.forEach(item => {
                        return item.checked = true
                    })
                }
            },
            clacClick(){
                if(!this.isSelcetAll){
                    this.$toast.show('请选择商品!',1000)
                }
            }

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
            },
            isSelcetAll() {
                // if (this.$store.state.cartList.length)
                return this.$store.state.cartList.length !== 0 && this.$store.state.cartList.every(item => item.checked)

            }
        }
    }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #ccc;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 49px;
    padding-left: 10px;
    display: flex;
  }

  .check-button {
    /*background-color: red;*/
    width: 74px;
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
    background-color: orange;
    width: 140px;
  }

  .calculate {
    flex: 1;
    line-height: 40px;
    background-color: red;
    padding: 0 5px;
    color: white;
    font-weight: 700;
  }

</style>
