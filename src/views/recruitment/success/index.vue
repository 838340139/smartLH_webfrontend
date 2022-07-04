<template>
  <div class="container">
    <Breadcrumb :items="['menu.recruitment', 'menu.recruitment.success']" />
    <div class="wrapper">
      <a-result
        class="result"
        status="success"
        title="发布成功"
        subtitle="招聘信息已发布"
      >
        <template #extra>
          <a-space class="operation-wrap" :size="16">
            <a-button key="again" type="secondary" @click="handleClickSendMore">
              返回
            </a-button>
            <a-button key="back" type="primary"  @click="handleClickToList">
              招聘信息列表
            </a-button>
          </a-space>
        </template>
      </a-result>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const handleClickSendMore = () => {
      router.push({
        name: 'publish-recruitment',
      });
    };
    const handleClickToList = () => {
      router.push({
        name: 'search-recruitment',
      });
    };
    return {
      handleClickSendMore,
      handleClickToList,
    };
  },
});
</script>

<style scoped lang="less">
.wrapper {
  padding: 24px 150px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

.result {
  margin: 150px 0 0 0;
}

.operation-wrap {
  margin-bottom: 40px;
  text-align: center;
}

.steps-wrapper {
  width: 100%;
  min-width: fit-content;
  margin-bottom: 150px;
  padding: 20px;
  background-color: rgb(var(--gray-1));
}
</style>
