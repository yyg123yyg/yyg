<template>
    <div id="app">
      <keep-alive exclude="Detail">
        <router-view></router-view>
      </keep-alive>
        <main-tab-bar v-show="$route.meta.show"/>
    </div>
</template>
<script>
    import MainTabBar from "components/contens/maintabbar/MainTabBar";
    export default {
        name: "App",
        components: {
            MainTabBar
        }
    }


</script>

<style>
    @import "assets/css/base.css";
</style>
