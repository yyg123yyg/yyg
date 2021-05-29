<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item,index) in titles" :key="index"
           class="title-item"
           :class="{active:index===currentIndex}"
           @click="titleClick(index)">{{item}}
      </div>
    </div>
    <div slot="right" class="car" @click="toCar">
      <img src="~assets/img/common/shopcar.png" alt="">
    </div>
  </nav-bar>
</template>

<script>
    import NavBar from "components/common/navbar/NavBar";

    export default {
        name: "DtailNavBra",
        data() {
            return {
                titles: ['商品', '参数', '评论', '推荐',],
                currentIndex: 0
            }
        },
        components: {
            NavBar
        },
        methods: {
            backClick() {
                this.$router.back()
                // this.$router.go(-1)
            },
            titleClick(index) {
                this.currentIndex = index;
                this.$emit('titleClick', index)
            },
            toCar() {
                this.$router.push('/cart')
            }
        }
    }
</script>

<style scoped>
  .back img {
    margin-top: 12px;
    margin-left: 12px;
  }

  .title {
    display: flex;
    font-size: 13px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .car {
    text-align: center;
    padding-top: 5px;
  }

  .car img {
    width: 25px;
    height: 25px;
    line-height: 44px;
    display: inline-block;
  }
</style>
