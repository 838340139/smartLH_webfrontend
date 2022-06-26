<template>
  <a-col :span="24" class="panel">
    <a-row style="margin-bottom: 2em">
      <a-col class="panel-col" :span="8">
        <a-space>
          <a-avatar
            :size="54"
            class="col-avatar"
            :style="{
              verticalAlign: 'middle',
              backgroundColor: '#14a9f8',
            }"
          >
            <perVisitSvg style="width: 30px; height: 30px"></perVisitSvg>
          </a-avatar>
          <a-statistic
            :title="$t('workplace.personnel.visitCount')"
            :value="
              Number.isInteger(summaryData.perVisitCount)
                ? summaryData.perVisitCount
                : undefined
            "
            :value-from="0"
            placeholder="-"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs.second') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="8">
        <a-space>
          <a-avatar
            :size="54"
            class="col-avatar"
            :style="{
              verticalAlign: 'middle',
              backgroundColor: '#FF9800',
            }"
          >
            <org-visit-svg style="width: 30px; height: 30px"></org-visit-svg>
          </a-avatar>
          <a-statistic
            :title="$t('workplace.org.visitCount')"
            :value="
              Number.isInteger(summaryData.orgVisitCount)
                ? summaryData.orgVisitCount
                : undefined
            "
            :value-from="0"
            placeholder="-"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs.second') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="8">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <history-visit-svg
              style="width: 30px; height: 30px"
            ></history-visit-svg>
          </a-avatar>
          <a-statistic
            :title="$t('workplace.history.visitCount')"
            :value="
              Number.isInteger(summaryData.historyTotal) ? summaryData.historyTotal : undefined
            "
            :value-from="0"
            placeholder="-"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs.second') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
    </a-row>
    <a-row>
      <a-col class="panel-col" :span="8">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/288b89194e657603ff40db39e8072640.svg~tplv-49unhts6dw-image.image"
            />
          </a-avatar>
          <a-statistic
            :title="$t('workplace.personnel.dataCount')"
            :value="
              Number.isInteger(summaryData.perCount)
                ? summaryData.perCount
                : undefined
            "
            :value-from="0"
            placeholder="-"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs.strip') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="8">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/fdc66b07224cdf18843c6076c2587eb5.svg~tplv-49unhts6dw-image.image"
            />
          </a-avatar>
          <a-statistic
            :title="$t('workplace.orgInfoCount')"
            :value="
              Number.isInteger(summaryData.orgCount)
                ? summaryData.orgCount
                : undefined
            "
            :value-from="0"
            placeholder="-"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs.strip') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
      <a-col class="panel-col" :span="8">
        <a-space>
          <a-avatar :size="54" class="col-avatar">
            <img
              alt="avatar"
              src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77d74c9a245adeae1ec7fb5d4539738d.svg~tplv-49unhts6dw-image.image"
            />
          </a-avatar>
          <a-statistic
            :title="$t('workplace.recruitInfoCount')"
            :value="
              Number.isInteger(summaryData.recruitCount) ? summaryData.recruitCount : undefined
            "
            :value-from="0"
            placeholder="-"
            animation
            show-group-separator
          >
            <template #suffix>
              <span class="unit">{{ $t('workplace.pecs.strip') }}</span>
            </template>
          </a-statistic>
        </a-space>
      </a-col>
    </a-row>
    <a-divider class="panel-border" />
  </a-col>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import perVisitSvg from '@/assets/images/perVisit.svg';
import orgVisitSvg from '@/assets/images/orgVisit.svg';
import historyVisitSvg from '@/assets/images/historyVisit.svg';
import { getDataSummary, DataSummary } from '@/api/dashboard';

export default defineComponent({
  components: {
    // @ts-ignore
    perVisitSvg,
    // @ts-ignore
    orgVisitSvg,
    // @ts-ignore
    historyVisitSvg,
  },
  setup() {
    const summaryData = ref<DataSummary>({});
    const fetchData = async () => {
      const { data } = await getDataSummary();
      summaryData.value = data;
    };
    fetchData();
    return {
      summaryData,
    };
  },
});
</script>

<style lang="less" scoped>
.arco-col.panel {
  margin-bottom: 0;
  padding: 16px 20px 0 20px;
}
.panel-col {
  padding-left: 43px;
  border-right: 1px solid rgb(var(--gray-2));
  &:first-child {
    padding-left: 0;
  }
  &:last-child {
    border-right: none;
  }
}
.col-avatar {
  margin-right: 12px;
  background-color: var(--color-fill-2);
}
.up-icon {
  color: rgb(var(--red-6));
}
.unit {
  margin-left: 8px;
  color: rgb(var(--gray-8));
  font-size: 12px;
}
</style>
