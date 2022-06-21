<template>
  <div class="container">
    <Breadcrumb
      :items="['menu.visualization', 'menu.visualization.userInfoAnalysis']"
    />
    <a-space direction="vertical" :size="12" fill>
      <a-space direction="vertical" :size="16" fill>
        <div>
          <a-row :gutter="20">
            <a-col :span="12">
              <div class="space-unit" style="margin-bottom: 1em">
                <TotalData />
              </div>
              <AgeDistribution />
            </a-col>
            <a-col :span="12">
              <educationDistribute style="margin-bottom: 1em"/>
              <subjectDistribute/>
            </a-col>
          </a-row>
        </div>
        <div>
          <RegionAnalysis style="margin-bottom: 1em"/>
          <ContentPeriodAnalysis />
        </div>
      </a-space>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TotalData from './components/total-data.vue';
import ContentPeriodAnalysis from './components/content-period-analysis.vue';
import AgeDistribution from './components/age-distribution.vue';
import PopularAuthor from './components/popular-author.vue';
import RegionAnalysis from './components/region-analysis.vue';
import educationDistribute from './components/educationDistribute.vue';
import subjectDistribute from "./components/subject-distribute.vue";

export default defineComponent({
  components: {
    TotalData,
    ContentPeriodAnalysis,
    AgeDistribution,
    RegionAnalysis,
    educationDistribute,
    subjectDistribute
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
  margin-bottom: 20px;
}

.space-unit {
  background-color: var(--color-bg-2);
  border-radius: 4px;
}

.title-fix {
  margin: 0 0 12px 0;
  font-size: 14;
}
:deep(.section-titile) {
  margin: 0 0 12px 0;
  font-size: 14px;
}
</style>
