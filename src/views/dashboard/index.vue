<template>
  <div class="container">
    <div class="left-side">
      <div class="panel">
        <Banner />
        <DataPanel />
        <ContentChart />
      </div>
      <a-row style="margin-top: 16px">
         <a-col :flex="1" class="panel" style="margin-right: 16px">  
          <a-tabs>
           <a-tab-pane key="1">
      <template #title>
        <icon-calendar/> 单位分布
      </template>
      <CateforiesPercent />
    </a-tab-pane>
    </a-tabs>
         </a-col>
      <a-col :flex="1" class="panel" style="margin-right: 0px">  

  <a-tabs>
    <!-- <a-tab-pane key="1">
      <template #title>
        <icon-calendar/> 单位分布
      </template>
      <CateforiesPercent />
    </a-tab-pane> -->
    <a-tab-pane key="2">
      <template #title>
        <icon-clock-circle/> 学历分布
      </template>
      <Education />
    </a-tab-pane>
    <a-tab-pane key="3">
      <template #title>
        <icon-user/> 人才分布
      </template>
       <Detail />
    </a-tab-pane>
  </a-tabs>
</a-col>
        <!-- <a-col :flex="1" class="panel">
          <CateforiesPercent />
        </a-col>
           <a-col :flex="1" class="panel">
          <Education />
        </a-col>
        <a-col :flex="1" class="panel">
          <Detail />
        </a-col> -->
      </a-row>
    </div>
    <div class="right-side">
      <div class="panel moduler-wrap">
        <QuickOperation />
      </div>
      <div class="panel" style="margin-top: 16px">
        <Carousel />
      </div>
      <template v-if="false">
        <div class="panel" style="margin-top: 16px">
          <Docs />
        </div>
      </template>
      <div class="panel" style="margin-top: 16px">
        <SystemMessage />
      </div>
    <div>
<a-col :flex="1" class="panel" style="margin-top: 16px">
          <PopularContent />
        </a-col>
  </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Banner from './components/banner.vue';
import DataPanel from './components/data-panel.vue';
import ContentChart from './components/content-chart.vue';
import PopularContent from './components/popular-content.vue';
import CateforiesPercent from './components/categories-percent.vue';
import QuickOperation from './components/todowork.vue';
import SystemMessage from './components/system-message.vue';
import Carousel from './components/carousel.vue';
// import Education from './components/education.vue';
// import Detail from './components/detail.vue';

export default defineComponent({
  components: {
    Banner,
    DataPanel,
    ContentChart,
    PopularContent,
    CateforiesPercent,
    QuickOperation,
    SystemMessage,
    Carousel,
    // Education,
    // Detail,
  },
});
</script>

<style lang="less" scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  padding-bottom: 0;
  display: flex;
}

.left-side {
  flex: 1;
  overflow: auto;
}

.right-side {
  width: 350px;
  margin-left: 16px;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}
:deep(.panel-border) {
  margin-bottom: 0;
  border-bottom: 1px solid rgb(var(--gray-2));
}
.moduler-wrap {
  border-radius: 4px;
  background-color: var(--color-bg-2);
  :deep(.text) {
    font-size: 12px;
    text-align: center;
    color: rgb(var(--gray-8));
  }

  :deep(.wrapper) {
    margin-bottom: 8px;
    text-align: center;
    cursor: pointer;

    &:last-child {
      .text {
        margin-bottom: 0;
      }
    }
    &:hover {
      .icon {
        color: rgb(var(--arcoblue-6));
        background-color: #e8f3ff;
      }
      .text {
        color: rgb(var(--arcoblue-6));
      }
    }
  }

  :deep(.icon) {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin-bottom: 4px;
    color: rgb(var(--dark-gray-1));
    line-height: 32px;
    font-size: 16px;
    text-align: center;
    background-color: rgb(var(--gray-1));
    border-radius: 4px;
  }
}
</style>
