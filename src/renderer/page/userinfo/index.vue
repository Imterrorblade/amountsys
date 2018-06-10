<template>
  <el-card>
    <h4>用户名： {{username}}</h4>
  </el-card>
</template>
<script>
export default {
  data () {
    return {}
  },
  computed: {
    username () {
      return this.$store.getters.loginUser.username
    }
  }
}
</script>
<style>

</style>
