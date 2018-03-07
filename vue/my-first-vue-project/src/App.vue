<template>
  <div id="app">
    <img src="./assets/logo.png" width="100" height="100">
    <div class="nav">
      <router-link to="/HelloWorld" class="a">HelloWorld</router-link>
      <router-link to="/todoList" class="a">to do list</router-link>
      <router-link to="/elementUi" class="a">elementUi</router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.nav{margin-bottom: 20px;}
.nav .a{margin-right: 20px;color: #42b983;text-decoration: none;}

.linkActiveClass{color:#ff9b26!important;border-bottom: 1px solid #ff9b26}
.linkExactActiveClass{color:#ff9b26!important;border-bottom: 1px solid #ff9b26}

</style>
