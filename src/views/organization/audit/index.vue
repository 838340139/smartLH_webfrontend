<template>
  <div class="container">
    <Breadcrumb :items="['menu.organization', 'menu.organization.audit']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" :title="$t('menu.organization.audit')">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="1" type="rounded">
                <a-tab-pane key="1">
                  <template #title>
                    <span style="color: #2196f3">{{
                      $t('orgAudit.tab.title.toAudit')
                    }}</span>
                  </template>
                </a-tab-pane>
                <a-tab-pane key="2">
                  <template #title>
                    <span style="color: #4caf50">{{
                      $t('orgAudit.tab.title.passAudit')
                    }}</span>
                  </template>
                </a-tab-pane>
                <a-tab-pane key="3">
                  <template #title>
                    <span style="color: #f53f3f">{{
                      $t('orgAudit.tab.title.notPassAudit')
                    }}</span>
                  </template>
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-input-search
              :placeholder="$t('orgAudit.searchInput.placeholder')"
              style="width: 240px; position: absolute; top: 60px; right: 20px"
            />
          </a-row>
          <a-empty v-if="!orgList.length" />
          <a-row v-else :gutter="24">
            <a-col
              v-for="item in orgList"
              :key="item.id"
              :span="6"
              class="list-col"
            >
              <CardWrap
                :loading="loading"
                :title="item.name"
                :description="item.introduction"
                :default-value="item.enable"
                :action-type="item.actionType"
                :icon="item.icon"
                :open-txt="$t('orgAudit.content.inspection')"
                :close-txt="$t('orgAudit.content.delete')"
                :show-tag="false"
              >
                <a-descriptions
                  style="margin-top: 16px"
                  :data="item.data"
                  layout="inline-horizontal"
                  :column="2"
                />
                <template #skeleton>
                  <a-skeleton :animation="true">
                    <a-skeleton-line
                      :widths="['50%', '50%', '100%', '40%']"
                      :rows="4"
                    />
                    <a-skeleton-line :widths="['40%']" :rows="1" />
                  </a-skeleton>
                </template>
              </CardWrap>
            </a-col>
<!--            <a-col :span="24">-->
<!--              <QualityInspection />-->
<!--              <TheService />-->
<!--              <RulesPreset />-->
<!--            </a-col>-->
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { getAuditOrgs } from "@/api/organization";
import {AuditEnum, Organization} from "@/types/global";
import useLoading from "@/hooks/loading";
import QualityInspection from './components/quality-inspection.vue';
import TheService from './components/the-service.vue';
import RulesPreset from './components/reules-preset.vue';
import CardWrap from './components/card-wrap.vue';

export default defineComponent({
  components: {
    // QualityInspection,
    // TheService,
    // RulesPreset,
    CardWrap,
  },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const orgList = ref<Organization[]>([]);

    const fetchData = async () => {
      setLoading(true);
      const data = await getAuditOrgs({ audit: AuditEnum.toAudit });
      orgList.value = data.data;
      setLoading(false);
    };

    fetchData();
    return {
      loading,
      orgList,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  :deep(.arco-list-content) {
    overflow-x: hidden;
  }

  :deep(.arco-card-meta-title) {
    font-size: 14px;
  }
}
:deep(.arco-list-col) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

:deep(.arco-list-item) {
  width: 33%;
}

:deep(.block-title) {
  margin: 0 0 12px 0;
  font-size: 14px;
}
:deep(.list-wrap) {
  // min-height: 140px;
  .list-row {
    align-items: stretch;
    .list-col {
      margin-bottom: 16px;
    }
  }
  :deep(.arco-space) {
    width: 100%;
    .arco-space-item {
      &:last-child {
        flex: 1;
      }
    }
  }
}
</style>
