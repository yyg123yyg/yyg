<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "DetailBottomBar",
        methods: {
            //加入到购物车
            addToCart() {
                this.$emit('addCart')
            }
        }

    }
</script>

<style scoped>
  .bottom-bar {
    height: 52px;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
  }

  .bar-item {
    display: flex;
    justify-content: space-around;
  }

  .bar-left {
    width: 50%;
    background-color: white;
  }

  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 10px auto 0;
    background: url("~assets/img/detail/detail_bottom.png") no-repeat 0 0/100%;
  }

  .service {
    background-position: 0 -54px;
  }

  .shop {
    background-position: 0 -98px;

  }

  .bar-right {
    background-color: #777777;
    width: 50%;


  }

  .cart {
    text-align: center;
    flex: 1;
    line-height: 52px;
    background-color: #f9ff4c;

  }

  .buy {
    background-color: #ff5777;
    flex: 1;
    text-align: center;
    line-height: 52px;
    color: white;
  }
</style>
