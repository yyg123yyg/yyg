<template>
  <div class="cart-list-main">
    <div class="cart-list-left flex">
      <check-botton :isChecked="product.checked" @click.native="checkClick"/>
<!--            <input type="checkbox" class="check" v-model="product.checked">-->
      <img :src="product.image" alt="" class="goods-img">
    </div>
    <div class="cart-list-right">
      <div class="goods-name ">{{product.title}}</div>
      <div class="goods-name one-txt-cut">{{product.desc}}</div>
      <div class="goods-info flex">
        <span class="price">￥{{product.price}}</span><span>x{{product.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    import CheckBotton from "components/contens/checkBotton/CheckBotton";

    export default {
        name: "CartListItem",
        props: {
            product: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        components: {
            CheckBotton
        },
        methods:{
            checkClick(){
                this.product.checked=!this.product.checked
            }
        }
    }
</script>
<style scoped>
  .cart-list-main {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #ececec;
  }

  .cart-list-left {
    display: flex;
    width: 30%;
    align-items: center;
  }

  .goods-img {
    width: 52px;
    height: 66px;
    overflow: hidden;
    border: 1px solid #ececec;
    margin: 0 10px;
    border-radius: 6px;
    vertical-align: middle;
  }

  .cart-list-right {
    position: relative;
    width: 70%;
  }

  .one-txt-cut {
    color: #ccc;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 30px;
  }

  .goods-name {
    width: 100%;
    font-size: 13px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .goods-info {
    display: flex;
    justify-content: space-between;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;

  }

  .price {
    color: #f94611;
  }
</style>
