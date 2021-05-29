<template>
  <div class="slide-bar">
    <scroll ref="scroll" class="slide-bar-height" @click.native="a">
      <ul class="slide-ul">
        <li class="slide-li" v-for="(item,index) in slideBarList" :key="index"
            @click="slideBarItemClick(item,index)"
            :class="{active:index===currentIndex}"
        >{{item.title}}
        </li>
      </ul>
    </scroll>

  </div>
</template>

<script>
    //导入滚动模块
    import Scroll from "components/common/scroll/Scroll";

    export default {
        name: "SlideBar",
        data() {
            return {
                currentIndex: 0
            }
        },
        props: {
            slideBarList: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        components: {
            Scroll
        },
        activated() {
            this.$refs.scroll.refresh()
        },
        methods: {
            slideBarItemClick(item,index) {
                const obj = {
                    maitKey: item.maitKey,
                    index
                };
                this.currentIndex = index;
                this.$emit("slideBarItemClick", obj);
            },
            a() {
                this.$refs.scroll.refresh()
                console.log("d")
            }
        }
    }
</script>

<style scoped>
  .slide-bar {
  }
  .active {
    color: #ff5777;
    font-weight: 700;
    border-left: 2px solid #ff5777;
    background-color: #eee;

  }
  .slide-bar-height {
    width: 100px;
    background-color: rgb(246, 246, 246);
    overflow: hidden;
    position: fixed;
    top: 44px;
    bottom: 49px;

  }

  .slide-ul {

  }

  .slide-li {
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
  }
</style>
