<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         :class="{active:index===currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
    export default {
        name: "TabControl",
        data() {
            return {
                currentIndex: 0
            }
        },
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index;
                this.$emit('tabClick', index);
            }
        }
    }
</script>

<style scoped>
  .tab-control {
    display: flex;
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 16px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
  }

  .tab-control-item span {
    padding: 10px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }

</style>
