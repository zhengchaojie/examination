<template>
  <div class="content">
    <div class="switchBox">
      <span>
        <img
          src="https://tse1-mm.cn.bing.net/th/id/OIP-C.nPo1Lo0vUGy992iXrdMgLQAAAA?w=175&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
          alt=""
          style="width: 50px; border-radius: 50%; margin-right: 10px"
        />
        Admin
      </span>
      <div class="switch">创建者</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped>
.switchBox {
  position: relative;
  margin: 24px 10px;
  font-size: 15px;
  line-height: 44px;
}
.switch {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 15px;
}
.switch > span {
  font-size: 15px;
}
.content {
  padding: 0 14px;
}
</style>