<template>
  <el-card style="height:500px;text-aligin:center;padding:20px;">
    <h4>用户： {{username}}</h4>
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
