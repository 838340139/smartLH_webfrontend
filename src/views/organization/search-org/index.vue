<template>
  <div class="container">
    <Breadcrumb :items="['menu.organization', 'menu.organization.searchOrg']" />
    <a-card class="general-card" :title="$t('menu.organization.searchOrg')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="number"
                  :label="$t('searchOrg.form.orgName')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('searchOrg.form.orgName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('searchOrg.form.orgAddress')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('searchOrg.form.orgAddress.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="contentType"
                  :label="$t('searchOrg.form.orgType')"
                >
                  <a-select
                    v-model="formModel.contentType"
                    :options="contentTypeOptions"
                    :placeholder="$t('searchOrg.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
<!--              <a-col :span="8">-->
<!--                <a-form-item-->
<!--                  field="filterType"-->
<!--                  :label="$t('searchOrg.form.filterType')"-->
<!--                >-->
<!--                  <a-select-->
<!--                    v-model="formModel.filterType"-->
<!--                    :options="filterTypeOptions"-->
<!--                    :placeholder="$t('searchOrg.form.selectDefault')"-->
<!--                  />-->
<!--                </a-form-item>-->
<!--              </a-col>-->
<!--              <a-col :span="8">-->
<!--                <a-form-item-->
<!--                  field="createdTime"-->
<!--                  :label="$t('searchOrg.form.createdTime')"-->
<!--                >-->
<!--                  <a-range-picker-->
<!--                    v-model="formModel.createdTime"-->
<!--                    style="width: 100%"-->
<!--                  />-->
<!--                </a-form-item>-->
<!--              </a-col>-->
<!--              <a-col :span="8">-->
<!--                <a-form-item-->
<!--                  field="status"-->
<!--                  :label="$t('searchOrg.form.status')"-->
<!--                >-->
<!--                  <a-select-->
<!--                    v-model="formModel.status"-->
<!--                    :options="statusOptions"-->
<!--                    :placeholder="$t('searchOrg.form.selectDefault')"-->
<!--                  />-->
<!--                </a-form-item>-->
<!--              </a-col>-->
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right;padding-bottom: 10px">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchOrg.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchOrg.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchOrg.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchOrg.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchOrg.operation.download') }}
          </a-button>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="renderData"
        :bordered="false"
        @page-change="onPageChange"
      >
        <template #columns>
          <a-table-column
            :title="$t('searchOrg.columns.number')"
            data-index="number"
          />
          <a-table-column
            :title="$t('searchOrg.columns.name')"
            data-index="name"
          />
          <a-table-column
            :title="$t('searchOrg.columns.address')"
            data-index="contentType"
          >
            <template #cell="{ record }">
              <a-space>
                <a-avatar
                  v-if="record.contentType === 'img'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar
                  v-else-if="record.contentType === 'horizontalVideo'"
                  :size="16"
                  shape="square"
                >
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                <a-avatar v-else :size="16" shape="square">
                  <img
                    alt="avatar"
                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
                  />
                </a-avatar>
                {{ $t(`searchOrg.form.orgType.${record.contentType}`) }}
              </a-space>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('searchOrg.columns.phone')"
            data-index="filterType"
          >
            <template #cell="{ record }">
              {{ $t(`searchOrg.form.filterType.${record.filterType}`) }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('searchOrg.columns.introduction')"
            data-index="count"
          />
<!--          <a-table-column-->
<!--            :title="$t('searchOrg.columns.createdTime')"-->
<!--            data-index="createdTime"-->
<!--          />-->
<!--          <a-table-column-->
<!--            :title="$t('searchOrg.columns.status')"-->
<!--            data-index="status"-->
<!--          >-->
<!--            <template #cell="{ record }">-->
<!--              <span v-if="record.status === 'offline'" class="circle"></span>-->
<!--              <span v-else class="circle pass"></span>-->
<!--              {{ $t(`searchOrg.form.status.${record.status}`) }}-->
<!--            </template>-->
<!--          </a-table-column>-->
          <a-table-column
            :title="$t('searchOrg.columns.operations')"
            data-index="operations"
          >
            <template #cell>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('searchOrg.columns.operations.view') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
import { Pagination, Options } from '@/types/global';

const generateFormModel = () => {
  return {
    number: '',
    name: '',
    contentType: '',
    filterType: '',
    createdTime: [],
    status: '',
  };
};
export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true);
    const { t } = useI18n();
    const renderData = ref<PolicyRecord[]>([]);
    const formModel = ref(generateFormModel());
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });
    const contentTypeOptions = computed<Options[]>(() => [
      {
        label: t('searchOrg.form.orgType.government'),
        value: 'img',
      },
      {
        label: t('searchOrg.form.orgType.shiye'),
        value: 'horizontalVideo',
      },
      {
        label: t('searchOrg.form.orgType.stateEnterprise'),
        value: 'verticalVideo',
      },
    ]);
    const filterTypeOptions = computed<Options[]>(() => [
      {
        label: t('searchOrg.form.filterType.artificial'),
        value: 'artificial',
      },
      {
        label: t('searchOrg.form.filterType.rules'),
        value: 'rules',
      },
    ]);
    const statusOptions = computed<Options[]>(() => [
      {
        label: t('searchOrg.form.status.online'),
        value: 'online',
      },
      {
        label: t('searchOrg.form.status.offline'),
        value: 'offline',
      },
    ]);
    const fetchData = async (
      params: PolicyParams = { current: 1, pageSize: 20 }
    ) => {
      setLoading(true);
      try {
        const { data } = await queryPolicyList(params);
        renderData.value = data.list;
        pagination.current = params.current;
        pagination.total = data.total;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };

    const search = () => {
      fetchData({
        ...basePagination,
        ...formModel.value,
      } as unknown as PolicyParams);
    };
    const onPageChange = (current: number) => {
      fetchData({ ...basePagination, current });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
    };
    return {
      loading,
      search,
      onPageChange,
      renderData,
      pagination,
      formModel,
      reset,
      contentTypeOptions,
      filterTypeOptions,
      statusOptions,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
