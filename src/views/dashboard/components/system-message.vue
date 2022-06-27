<template>
  <a-card
    class="general-card"
    :loading="loading"
    :title="$t('workplace.system-message')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '15px 20px 13px 20px' }"
  >
<!--    <template #extra>-->
<!--      <a-link>{{ $t('workplace.viewMore') }}</a-link>-->
<!--    </template>-->
    <div style="min-height: 150px">
      <div v-for="(item, idx) in dataList" :key="idx" class="item">
        <a-tag color="blue" size="medium" style="margin-right: 10px">{{
          item.sendTime
        }}</a-tag>
        <span class="item-content">
          {{ cutString(item.title, 15) }}
        </span>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from "@/hooks/loading";
import {Notice, Recruitment} from "@/types/global";
import {getPopularRecruitment, getRecentNotices} from "@/api/dashboard";
import { cutString } from "@/utils/stringUtils";

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading();
    const dataList = ref<Notice[]>([])
    const fetchData = async (topN = 5) => {
      try {
        setLoading(true);
        const { data } = await getRecentNotices({ topN });
        dataList.value = data;
        dataList.value.forEach((item) => {
          if(item.sendTime!==undefined){
            // eslint-disable-next-line prefer-destructuring
            item.sendTime = item.sendTime.split(' ')[0]
          }
        })
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return {
      loading,
      dataList,
      cutString
    };
  },
});
</script>

<style scoped lang="less">
.item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  margin-bottom: 4px;
  .item-content {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 4px;
    color: var(--color-text-2);
    text-decoration: none;
    font-size: 13px;
    cursor: pointer;
  }
}
</style>
