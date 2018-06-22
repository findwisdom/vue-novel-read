<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#reader .cube-drawer .cube-drawer-main>div.cube-drawer-title{
   line-height: 2.75rem;
   border-bottom: 1px solid #ed424b;
 }
#reader .cube-drawer .cube-drawer-panels .cube-drawer-list .cube-drawer-item_active{
  color: #ed424b;
}
/*#reader .cube-drawer .cube-drawer-panels .cube-drawer-list .cube-drawer-item{*/
   /*padding: 12px 1rem;*/
 /*}*/
</style>
