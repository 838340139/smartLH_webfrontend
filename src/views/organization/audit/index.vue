<template>
  <div class="container">
    <Breadcrumb :items="['menu.organization', 'menu.organization.audit']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" :title="$t('menu.organization.audit')">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs
                :default-active-tab="1"
                type="rounded"
                @tab-click="handleTabChange"
              >
                <a-tab-pane :key="AuditEnum.toAudit">
                  <template #title>
                    <span style="color: #2196f3">{{
                      $t('orgAudit.tab.title.toAudit')
                    }}</span>
                  </template>
                </a-tab-pane>
                <a-tab-pane :key="AuditEnum.passAudit">
                  <template #title>
                    <span style="color: #4caf50">{{
                      $t('orgAudit.tab.title.passAudit')
                    }}</span>
                  </template>
                </a-tab-pane>
                <a-tab-pane :key="AuditEnum.notPassAudit">
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
              v-model="searchForm.orgName"
              @press-enter="handleClickSearch"
              style="width: 240px; position: absolute; top: 60px; right: 20px"
            />
          </a-row>
          <a-card
            :loading="loading"
            :bordered="false"
            style="min-height: 500px"
          >
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
                  :name="item.name"
                  :address="item.address"
                  :type="item.type"
                  :phone="item.phone"
                  :show-tag="item.audit !== AuditEnum.toAudit"
                  :tag-type="
                    item.audit === AuditEnum.passAudit ? 'success' : 'danger'
                  "
                  :tag-text="
                    item.audit === AuditEnum.passAudit ? '已通过' : '未通过'
                  "
                  :introduction="item.introduction"
                  :on-pass="
                    item.audit === AuditEnum.toAudit
                      ? () => {
                          handleClickPass(item);
                        }
                      : null
                  "
                  :on-detail="
                    () => {
                      handleClickDetail(item);
                    }
                  "
                  :on-reject="
                    item.audit === AuditEnum.toAudit
                      ? () => {
                          handleClickReject(item);
                        }
                      : null
                  "
                >
                </CardWrap>
              </a-col>
            </a-row>
          </a-card>
          <a-pagination :total="pagination.total" :size="pagination.size" show-total show-jumper/>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, } from 'vue';
import { getAuditOrgs, auditOrg, QueryAuditParams } from '@/api/organization';
import {AuditEnum, Organization, Pagination} from '@/types/global';
import useLoading from '@/hooks/loading';
import { Modal, Message } from '@arco-design/web-vue';
import CardWrap from './components/card-wrap.vue';

const generateSearchForm = () => {
  return {
    auditState: 0,
    orgName: undefined,
  };
};

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
    const searchForm = ref<QueryAuditParams>(generateSearchForm());
    const basePagination: Pagination = {
      current: 1,
      pageSize: 1,
      total: 0,
    };
    const pagination = reactive({
      ...basePagination,
    });

    const fetchData = async () => {
      setLoading(true);
      const { data } = await getAuditOrgs({
        ...searchForm.value,
        pageNum: pagination.current,
        size: pagination.pageSize
      });
      orgList.value = data.list;
      pagination.total = data.total;
      setLoading(false);
    };

    const handleClickSearch = () => {
      fetchData();
    }

    const handleTabChange = (key: number) => {
      searchForm.value.auditState = key;
      fetchData();
    };

    const handleClickPass = async (item: { id: any; name: string }) => {
      Modal.info({
        title: '审核提醒',
        content: `请确认是否通过${item.name}的申请，提交后不可修改？`,
        hideCancel: false,
        onOk: async ()=>{
          setLoading(true);
          const data = await auditOrg({
            orgId: item.id,
            audit: AuditEnum.passAudit,
          });
          Message.success('操作成功');
          await fetchData();
          setLoading(false);
        }
      });
    };

    const handleClickDetail = (item) => {};

    const handleClickReject = async (item: { id: any; name: string  }) => {
      Modal.info({
        title: '审核提醒',
        content: `请确认是否不通过${item.name}的申请，提交后不可修改？`,
        hideCancel: false,
        onOk: async ()=>{
          setLoading(true);
          const data = await auditOrg({
            orgId: item.id,
            audit: AuditEnum.notPassAudit,
          });
          Message.success('操作成功');
          await fetchData();
          setLoading(false);
        }
      });
    };

    fetchData();
    return {
      loading,
      orgList,
      AuditEnum,
      searchForm,
      pagination,
      handleClickSearch,
      handleTabChange,
      handleClickPass,
      handleClickReject,
      handleClickDetail,
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
