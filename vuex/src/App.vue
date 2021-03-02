<template>
  <div id="app">
    {{$store.state.age}}
    <br>
    {{$store.getters.addAge}}
    <br>
    <button @click="syncClick">同步点击</button>
    <br>
    <button @click="asyncClick">异步点击</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    syncClick () {
      this.$store.commit('syncChange', 10)
    },
    asyncClick () {
      this.$store.dispatch('asyncChange', 5)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
