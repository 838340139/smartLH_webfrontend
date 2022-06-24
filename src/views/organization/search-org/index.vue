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
                  field="orgName"
                  :label="$t('searchOrg.form.orgName')"
                >
                  <a-input
                    v-model="formModel.orgName"
                    :placeholder="$t('searchOrg.form.orgName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="orgAddress"
                  :label="$t('searchOrg.form.orgAddress')"
                >
                  <a-cascader
                    v-model="formModel.orgAddress"
                    size="large"
                    check-strictly
                    class="large-cascader"
                    :options="regionOptions"
                    :placeholder="$t('searchOrg.form.orgAddress.placeholder')"
                    allow-search
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="orgType"
                  :label="$t('searchOrg.form.orgType')"
                >
                  <a-select
                    v-model="formModel.orgType"
                    :options="typeOptions"
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
        <a-col :flex="'86px'" style="text-align: right; padding-bottom: 10px">
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
            <a-button type="primary" @click="handleCreateOrg">
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
            :title="$t('searchOrg.columns.name')"
            data-index="name"
          />
          <a-table-column
            :title="$t('searchOrg.columns.address')"
            data-index="address"
          >
          </a-table-column>
          <a-table-column
            :title="$t('searchOrg.columns.phone')"
            data-index="phone"
          >
          </a-table-column>
          <a-table-column
            :title="$t('searchOrg.columns.introduction')"
            data-index="introduction"
          >
            <template #cell="{ record }">
              <p style="text-overflow: ellipsis; white-space: nowrap">
                {{ cutString(record.introduction, 25) }}
              </p>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('searchOrg.columns.operations')"
            data-index="operations"
          >
            <template #cell="{ record }">
              <a-button
                v-permission="['admin']"
                type="text"
                size="small"
                @click="
                  () => {
                    handleClickView(record);
                  }
                "
              >
                {{ $t('searchOrg.columns.operations.view') }}
              </a-button>
              <a-button
                v-permission="['admin']"
                type="text"
                status="danger"
                size="small"
                @click="
                  () => {
                    handleClickDelete(record);
                  }
                "
              >
                {{ $t('searchOrg.columns.operations.delete') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <a-modal
      v-model:visible="orgModalVisible"
      width="40%"
      :mask-closable="false"
      @ok="handleCreateOrgOk"
      @cancel="handleCreateCancel"
    >
      <template #title> {{ viewOrCreate ? '详情' : '添加' }} </template>
      <div>
        <a-form :model="orgForm" auto-label-width>
          <a-form-item field="name" label="单位名称">
            <a-input v-model="orgForm.name" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="type" label="单位性质">
            <a-select
              v-model="orgForm.type"
              :options="typeOptions"
              :placeholder="$t('searchOrg.form.selectDefault')"
            />
          </a-form-item>
          <a-form-item field="address" label="单位地址">
            <a-cascader
              v-model="orgForm.address"
              size="large"
              class="large-cascader"
              check-strictly
              :options="regionOptions"
              placeholder="请选择"
              allow-search
            />
          </a-form-item>
          <a-form-item field="phone" label="联系电话">
            <a-input v-model="orgForm.phone" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="type" label="介绍">
            <a-textarea
              v-model="orgForm.introduction"
              placeholder="请输入"
              :max-length="255"
              allow-clear
              style="height: 100px"
              show-word-limit
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, h } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { Pagination, Organization } from '@/types/global';
import {
  OrgListParams,
  queryOrgList,
  addOrg,
  setOrgInfo,
  getTypes,
  deleteOrg,
} from '@/api/organization';
import { regionData } from 'element-china-area-data';
import { Modal, Message } from '@arco-design/web-vue';
import { codeToText, textToCode } from '@/utils/region';
import { cutString } from '@/utils/stringUtils';

const generateFormModel = () => {
  return {
    orgName: '',
    orgAddress: '',
    orgType: '',
  };
};

const generateCreateOrgFormModel = () => {
  return {
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
  components: {},
  setup() {
    const { loading, setLoading } = useLoading(true);
    const orgModalVisible = ref<boolean>(false);
    const viewOrCreate = ref<boolean>(false);
    const orgForm = ref<Organization>(generateCreateOrgFormModel());
    const { t } = useI18n();
    const renderData = ref<Organization[]>([]);
    const typeOptions = ref<{ label: string; value: string }[]>([]);
    const formModel = ref(generateFormModel());
    const basePagination: Pagination = {
      'current': 1,
      'pageSize': 20,
      'show-total': true,
      'show-jumper': true,
    };
    const pagination = reactive({
      ...basePagination,
    });
    const regionOptions = ref(regionData);
    const fetchTypeData = async () => {
      const data = await getTypes();
      if (data.data) {
        typeOptions.value = data.data.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
      }
    };
    fetchTypeData();
    // const typeOptions = computed<Options[]>(() => [
    //   {
    //     label: t('organization.orgType.state-enterprise'),
    //     value: t('organization.orgType.state-enterprise'),
    //   },
    //   {
    //     label: t('organization.orgType.foreign-enterprise'),
    //     value: t('organization.orgType.foreign-enterprise'),
    //   },
    //   {
    //     label: t('organization.orgType.joint-venture'),
    //     value: t('organization.orgType.joint-venture'),
    //   },
    //   {
    //     label: t('organization.orgType.private-enterprise'),
    //     value: t('organization.orgType.private-enterprise'),
    //   },
    //   {
    //     label: t('organization.orgType.government-affiliated-institution'),
    //     value: t('organization.orgType.government-affiliated-institution'),
    //   },
    //   {
    //     label: t('organization.orgType.state-administrative-organs'),
    //     value: t('organization.orgType.state-administrative-organs'),
    //   },
    //   {
    //     label: t('organization.orgType.government'),
    //     value: t('organization.orgType.government'),
    //   },
    //   {
    //     label: t('organization.orgType.others'),
    //     value: t('organization.orgType.others'),
    //   },
    // ]);
    const fetchData = async (
      params: OrgListParams = { pageNum: 1, size: 20 }
    ) => {
      setLoading(true);
      // 地址编码转为文字
      params.orgAddress = codeToText(params.orgAddress).join('/');
      try {
        const { data } = await queryOrgList(params);
        renderData.value = data.list;
        pagination.current = params.pageNum;
        pagination.total = data.total;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };

    const search = () => {
      fetchData({
        size: basePagination.pageSize,
        pageNum: basePagination.current,
        ...formModel.value,
      } as unknown as OrgListParams);
    };
    const onPageChange = (pageNum: number) => {
      fetchData({ ...basePagination, size: basePagination.pageSize, pageNum });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
    };

    const handleClickView = (record: Organization) => {
      orgModalVisible.value = true;
      viewOrCreate.value = true;
      orgForm.value = record;
      orgForm.value.address = textToCode(orgForm.value.address);
    };

    const handleDeleteOk = async (item: { id: number }) => {
      setLoading(true);
      deleteOrg({
        orgId: item.id,
      })
        .then(async () => {
          await fetchData();
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const handleClickDelete = (item: { id: number }) => {
      Modal.warning({
        title: '提醒',
        content: () =>
          h('div', { style: 'text-align: center;' }, '是否确认删除？'),
        width: '20em',
        onOk: () => {
          handleDeleteOk(item);
        },
      });
    };

    const handleCreateOrg = () => {
      orgModalVisible.value = true;
      viewOrCreate.value = false;
      orgForm.value = generateCreateOrgFormModel();
    };
    const handleCreateOrgOk = async () => {
      setLoading(true);
      if (viewOrCreate.value) {
        orgForm.value.address = codeToText(orgForm.value.address).join('/');
        await setOrgInfo(orgForm.value);
        Message.success('修改成功');
      } else {
        orgForm.value.address = codeToText(orgForm.value.address).join('/');
        await addOrg(orgForm.value);
        Message.success('添加成功');
      }
      orgModalVisible.value = false;
      setLoading(false);
      search();
    };
    const handleCreateCancel = () => {
      orgModalVisible.value = false;
    };
    return {
      loading,
      search,
      onPageChange,
      renderData,
      pagination,
      formModel,
      reset,
      cutString,
      typeOptions,
      handleClickDelete,
      handleDeleteOk,
      viewOrCreate,
      orgModalVisible,
      orgForm,
      handleClickView,
      handleCreateOrg,
      handleCreateOrgOk,
      handleCreateCancel,
      regionOptions,
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
