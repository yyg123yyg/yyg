<template>
  <div class="category-detail">
    <div v-for="(item, index) in CategoryList"
         :key="index" class="category-detail-item">
      <a :href="item.link">
        <img v-lazy="item.image" alt="" @load="imgLoad">
      </a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Subcategory",
        props: {
            CategoryList: {
                type: Array,
                default() {
                    return [];
                }

            }
        },
        methods:{
            imgLoad(){
                this.$emit('imgLoad')
            }
        }
    }
</script>

<style scoped>
  .category-detail {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 0 0 15px;
  }

  .category-detail-item {
    flex: 1;
    margin-bottom: 5px;
    text-align: center;
  }

  .category-detail-item img {
    width: 65px;
    margin-right: 7px;

  }
</style>
