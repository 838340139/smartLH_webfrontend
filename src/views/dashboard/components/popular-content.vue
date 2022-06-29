<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px' }"
    >
      <template #title>
        {{ $t('workplace.popularContent') }}
      </template>
      <template #extra>
<!--        <a-link>{{ $t('workplace.viewMore') }}</a-link>-->
      </template>
      <a-space direction="vertical" :size="10" fill>
        <a-radio-group
          v-model:model-value="type"
          type="button"
          @change="typeChange"
        >
          <a-radio :value="PopularTypeEnum.total">
            {{ $t('workplace.popularContent.totalHistory') }}
          </a-radio>
          <a-radio :value="PopularTypeEnum.lastWeek">
            {{ $t('workplace.popularContent.week') }}
          </a-radio>
          <a-radio :value="PopularTypeEnum.lastMonth">
            {{ $t('workplace.popularContent.month') }}
          </a-radio>
        </a-radio-group>
        <a-table :data="renderList" :pagination="false" :bordered="false">
          <template #columns>
            <a-table-column title="排名" data-index="rankIndex"></a-table-column>
            <a-table-column title="招聘标题" data-index="title">
              <template #cell="{ record }">
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 1,
                  }"
                >
                  {{ record.title }}
                </a-typography-paragraph>
              </template>
            </a-table-column>
            <a-table-column title="发布时间" data-index="publishTime">
              <template #cell="{ record }">
                <a-typography-paragraph
                    :ellipsis="{
                    rows: 1,
                  }">
                  {{ record.publishTime }}
                </a-typography-paragraph>
              </template>
            </a-table-column>
            <a-table-column title="点击量" data-index="view">
            </a-table-column>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { queryPopularList, PopularRecord, getPopularRecruitment } from '@/api/dashboard';
import { PopularTypeEnum, Recruitment } from "@/types/global";

export default defineComponent({
  setup() {
    const type = ref(PopularTypeEnum.total);
    const { loading, setLoading } = useLoading();
    const renderList = ref<Recruitment[]>();
    const fetchData = async (contentType: number) => {
      try {
        setLoading(true);
        const { data } = await getPopularRecruitment({ type: contentType });
        renderList.value = data.map((item, index) => {
          return {
            ...item,
            rankIndex: index + 1,
          };
        });
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    const typeChange = (contentType: number) => {
      fetchData(contentType);
    };
    fetchData(PopularTypeEnum.total);
    return {
      type,
      typeChange,
      loading,
      renderList,
      PopularTypeEnum
    };
  },
});
</script>

<style scoped lang="less">
.general-card {
  min-height: 388px;
}
:deep(.arco-table-tr) {
  height: 44px;
  .arco-typography {
    margin-bottom: 0;
  }
}
.increases-cell {
  display: flex;
  align-items: center;
  span {
    margin-right: 4px;
  }
}
</style>
