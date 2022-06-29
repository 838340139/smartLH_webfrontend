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
              v-model="searchForm.orgName"
              :placeholder="$t('orgAudit.searchInput.placeholder')"
              style="width: 240px; position: absolute; top: 60px; right: 20px"
              @press-enter="handleClickSearch"
            />
          </a-row>
          <a-card
            :loading="loading"
            :bordered="false"
            style="min-height: 500px"
          >
            <a-empty v-if="!orgList.length" />
            <a-space v-else wrap>
              <template v-for="item in orgList" :key="item.id">
                <CardWrap
                  style="width: 280px"
                  :loading="loading"
                  :name="item.name"
                  :address="item.address"
                  :type="item.type"
                  :phone="item.phone"
                  :audit-time="item.auditTime"
                  :is-audited="item.audit !== AuditEnum.toAudit"
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
              </template>
            </a-space>
          </a-card>
          <a-pagination
            v-model:current="pagination.current"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            show-total
            show-jumper
            @change="handlePageChange"
          />
        </a-card>
        <a-modal
          v-model:visible="orgDetailModalVisible"
          width="1000px"
          top="100px"
          :hide-cancel="true"
          :mask-closable="false"
          @ok="handleDetailModalOk"
          @cancel="handleDetailModalCancel"
        >
          <template #title> 详情 </template>
          <div>
            <a-row style="height: 450px" :gutter="20">
              <a-col :span="12">
                <a-carousel
                  v-if="orgDetail.material && orgDetail.material.length > 0"
                  :style="{
                    width: '480px',
                    height: '400px',
                  }"
                >
                  <a-carousel-item
                    v-for="(image, index) in orgDetail.material"
                    :key="index"
                  >
                    <a-image width="480px" height="400px" :src="image" />
                  </a-carousel-item>
                </a-carousel>
                <div
                  v-else
                  style="
                    width: 480px;
                    height: 400px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  "
                >
                  <a-empty />
                </div>

                <div style="text-align: center; padding-top: 10px"
                  >审核材料</div
                >
              </a-col>
              <a-col :span="12">
                <a-descriptions
                  style="margin-top: 20px; height: 17em"
                  :data="[
                    {
                      label: '单位名称',
                      value: orgDetail.name,
                    },
                    {
                      label: '单位性质',
                      value: orgDetail.type,
                    },
                    {
                      label: '单位地址',
                      value: orgDetail.address,
                    },
                    {
                      label: '联系电话',
                      value: orgDetail.phone,
                    },
                    {
                      label:
                        orgDetail.audit !== AuditEnum.toAudit
                          ? '审核时间'
                          : '申请时间',
                      value: orgDetail.auditTime,
                    },
                    {
                      label: '简介',
                      value: orgDetail.introduction,
                    },
                  ]"
                  size="large"
                  title=""
                  :column="1"
                />
              </a-col>
            </a-row>
          </div>
        </a-modal>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { getAuditOrgs, auditOrg, QueryAuditParams } from '@/api/organization';
import { AuditEnum, Organization, Pagination } from '@/types/global';
import useLoading from '@/hooks/loading';
import { Modal, Message } from '@arco-design/web-vue';
import noImgSvg from '@/assets/images/no-img.svg';
import CardWrap from './components/card-wrap.vue';

const generateSearchForm = () => {
  return {
    auditState: 0,
    orgName: undefined,
  };
};
const generateEmptyOrg = () => {
  return {
    id: undefined,
    type: '',
    name: '',
    address: '',
    phone: '',
    material: '',
    serialNumber: '',
    introduction: '',
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
    const orgDetailModalVisible = ref<boolean>(false);
    const orgDetail = ref<Organization>(generateEmptyOrg());
    const basePagination: Pagination = {
      current: 1,
      pageSize: 5,
      total: 0,
    };
    const pagination = reactive({
      ...basePagination,
    });

    let fetchIndex = 0;
    const fetchData = async () => {
      setLoading(true);
      fetchIndex += 1;
      const currentFetchIndex = fetchIndex;
      const { data } = await getAuditOrgs({
        ...searchForm.value,
        pageNum: pagination.current,
        size: pagination.pageSize,
      });
      if (fetchIndex !== currentFetchIndex) return;
      orgList.value = data.list;
      orgList.value.forEach((item) => {
        if (typeof item.material === 'string') {
          item.material = item.material
            .trim()
            .split(';')
            .filter((s) => {
              return s !== '';
            });
        }
      });
      pagination.total = data.total;
      setLoading(false);
    };

    const handleClickSearch = () => {
      fetchData();
    };

    const handleTabChange = (key: number) => {
      searchForm.value.auditState = key;
      pagination.current = 1;
      fetchData();
    };

    const handleClickPass = async (item: { id: any; name: string }) => {
      Modal.info({
        title: '审核提醒',
        content: `请确认是否通过${item.name}的申请，提交后不可修改？`,
        hideCancel: false,
        onOk: async () => {
          setLoading(true);
          const data = await auditOrg({
            orgId: item.id,
            audit: AuditEnum.passAudit,
          });
          Message.success('操作成功');
          await fetchData();
          setLoading(false);
        },
      });
    };

    const handleClickDetail = (item: Organization) => {
      orgDetail.value = item;
      console.log(orgDetail.value);
      orgDetailModalVisible.value = true;
    };

    const handleDetailModalOk = () => {
      orgDetailModalVisible.value = false;
    };

    const handleDetailModalCancel = () => {
      orgDetailModalVisible.value = false;
    };

    const handleClickReject = async (item: { id: any; name: string }) => {
      Modal.info({
        title: '审核提醒',
        content: `请确认是否不通过${item.name}的申请，提交后不可修改？`,
        hideCancel: false,
        onOk: async () => {
          setLoading(true);
          const data = await auditOrg({
            orgId: item.id,
            audit: AuditEnum.notPassAudit,
          });
          Message.success('操作成功');
          await fetchData();
          setLoading(false);
        },
      });
    };

    const handlePageChange = () => {
      fetchData();
    };

    fetchData();
    return {
      loading,
      orgList,
      AuditEnum,
      noImgSvg,
      searchForm,
      pagination,
      orgDetail,
      orgDetailModalVisible,
      handleDetailModalOk,
      handleDetailModalCancel,
      handleClickSearch,
      handleTabChange,
      handleClickPass,
      handleClickReject,
      handleClickDetail,
      handlePageChange,
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
