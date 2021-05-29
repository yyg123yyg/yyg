<template>
  <div class="profile">
    <van-nav-bar class="pro-bar"
                 title="商城"
                 left-text="返回首页"
                 right-text="按钮"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight"
    />
    <login/>
    <money/>
    <profile-list/>
  </div>
</template>

<script>
  import Login from "./childCmops/Login";
  import Money from "./childCmops/Money";
  import profileList from "./childCmops/profileList";

    export default {
        name: "Profile",
        components:{
            Login,Money,profileList
        },
        methods: {
            onClickLeft() {
                this.$router.push('/home')

            },
            onClickRight() {

            },
        },
    }
</script>

<style scoped>
  .pro-bar {
    background-color: rgb(255, 129, 152);
  }
</style>
