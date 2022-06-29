<template>
  <div class="container">
    <Breadcrumb :items="['menu.notice', 'menu.notice.success']" />
    <div class="wrapper">
      <a-result
        class="result"
        status="success"
        :title="$t('success.result.title')"
        :subtitle="$t('success.result.subTitle')"
      >
        <template #extra>
          <a-space class="operation-wrap" :size="16">
            <a-button key="again" type="secondary" @click="handleClickSendMore">
              {{ $t('success.result.sendMore') }}
            </a-button>
            <a-button key="back" type="primary"  @click="handleClickToList">
              {{ $t('success.result.toList') }}
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
        name: 'sendNotice',
      });
    };
    const handleClickToList = () => {
      router.push({
        name: 'noticeList',
      });
    };
    return {
      handleClickSendMore,
      handleClickToList
    }
  }
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
