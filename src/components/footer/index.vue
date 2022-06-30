<template>
  <a-layout-footer class="footer">
    <b> 智慧隆回 </b>
    &nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;
    <p
      >人才信息管理
    </p>
  </a-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  color: var(--color-text-2);
  text-align: center;

  p {
    font-size: 12px;
  }
}
</style>
