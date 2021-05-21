<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
    import BScroll from '@better-scroll/core'
    import Pullup from '@better-scroll/pull-up'

    BScroll.use(Pullup);

    export default {
        name: "Scroll",
        props: {
            probeType: {
                type: Number,
                default: 0
            },
            pullUpLoad: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                scroll: null
            }

        },
        // components: {
        //     BScroll
        // },
        mounted() {
            //创建betterscroll对象
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                //设置位置属性
                probeType: this.probeType,
                //设置底部属性,类型为布尔类型，上拉加载
                pullUpLoad: this.pullUpLoad

            })
            //监听滚动位置
            this.scroll.on('scroll', (position) => {
                // console.log(position)
                this.$emit('scroll', position)
            })
            //监听上拉加载，滚动底部,默认加载一次
            if (this.pullUpLoad) {
                this.scroll.on('pullingUp', () => {
                    this.$emit('pullingUp')
                    // console.log('bottom')
                })
            }


        },
        //滚动
        methods: {
            scrollTo(x = 0, y = 0, time = 1000) {
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            finishPullUp() {
                this.scroll && this.scroll.finishPullUp()
            },
            refresh() {
                // console.log('----')
                this.scroll && this.scroll.refresh()
            },
            getScrollY() {
                return this.scroll ? this.scroll.y : 0
            }
        }
    }
</script>

<style scoped>

</style>
