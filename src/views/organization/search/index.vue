<template>
  <div class="container">
    <Breadcrumb :items="['menu.organization', 'menu.organization.search']" />
    <a-card class="general-card" :title="$t('menu.organization.search')">
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
            <a-button @click="handleClickImport"> 批量导入 </a-button>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-tooltip content="数据量大时导出需要较长时间">
            <a-button :loading="downloadLoading" @click="handleClickDownload">
              <template #icon>
                <icon-download />
              </template>
              {{ $t('searchOrg.operation.download') }}
            </a-button>
          </a-tooltip>
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
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                  expandable: false,
                  showTooltip: {
                    type: 'tooltip',
                    props: {
                      'mouse-enter-delay': 800,
                      'style': { maxWidth: `500px` },
                    },
                  },
                }"
              >
                {{ record.introduction }}
              </a-typography-paragraph>
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('searchOrg.columns.operations')"
            data-index="operations"
          >
            <template #cell="{ record }">
              <a-button
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
      v-model:visible="importModalVisible"
      :width="500"
      :mask-closable="false"
      unmount-on-close
      hide-cancel
      @ok="importModalVisible = false"
    >
      <template #title> 批量导入 </template>
      <import-excel url="/Organization/importExcel"> </import-excel>
    </a-modal>
    <a-modal
      v-model:visible="orgModalVisible"
      :width="1000"
      :mask-closable="false"
      :on-before-ok="handleBeforeOk"
      @ok="handleCreateOrgOk"
      @cancel="handleCreateCancel"
    >
      <template #title> {{ viewOrCreate ? '详情' : '添加' }} </template>
      <a-row style="height: 450px" :gutter="20">
        <a-col v-if="viewOrCreate" :span="12">
          <a-carousel
            v-if="orgForm.material && orgForm.material.length > 0"
            :style="{
              width: '480px',
              height: '400px',
            }"
          >
            <a-carousel-item
              v-for="(image, index) in orgForm.material"
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
          <div style="text-align: center; padding-top: 10px">审核材料</div>
        </a-col>
        <a-col :span="viewOrCreate ? 12 : 24">
          <div>
            <a-form
              :model="orgForm"
              auto-label-width
              @submit="handleCreateOrgOk"
            >
              <a-form-item
                field="name"
                label="单位名称"
                required
                :rules="[{ required: true, message: '单位名称必填' }]"
              >
                <a-input v-model="orgForm.name" placeholder="请输入" />
              </a-form-item>
              <a-form-item
                field="type"
                label="单位性质"
                required
                :rules="[{ required: true, message: '单位性质必填' }]"
              >
                <a-select
                  v-model="orgForm.type"
                  :options="typeOptions"
                  :placeholder="$t('searchOrg.form.selectDefault')"
                />
              </a-form-item>
              <a-form-item
                field="address"
                label="单位地址"
                required
                :rules="[{ required: true, message: '单位地址必填' }]"
              >
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
              <a-form-item
                field="detail"
                label="人才类别"
                required
                :rules="[{ required: true, message: '人才类别必填' }]"
              >
                <a-input v-model="orgForm.detail" placeholder="请输入" />
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
                  style="height: 200px"
                  show-word-limit
                />
              </a-form-item>
            </a-form>
          </div>
        </a-col>
      </a-row>
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
  exportExcel,
} from '@/api/organization';
import { regionData } from 'element-china-area-data';
import { Modal, Message } from '@arco-design/web-vue';
import { codeToText, textToCode } from '@/utils/region';
import { cutString } from '@/utils/stringUtils';
import { getToken } from '@/utils/auth';
import config from '@/config/settings.json';
import importExcel from '@/components/importExcel/index.vue';

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
    detail: '',
  };
};
export default defineComponent({
  components: { importExcel },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const { loading: downloadLoading, setLoading: setDownloadLoading } =
      useLoading(false);
    const orgModalVisible = ref<boolean>(false);
    const importModalVisible = ref<boolean>(false);
    const viewOrCreate = ref<boolean>(false);
    const orgForm = ref<Organization>(generateCreateOrgFormModel());
    const { t } = useI18n();
    const renderData = ref<Organization[]>([]);
    const typeOptions = ref<{ label: string; value: string }[]>([]);
    const formModel = ref(generateFormModel());
    const basePagination: Pagination = {
      'current': 1,
      'pageSize': 10,
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
    const fetchData = async (
      params: OrgListParams = {
        pageNum: pagination.current,
        size: pagination.pageSize,
      }
    ) => {
      setLoading(true);
      if (!params.pageNum || params.pageNum < 1) return;
      // 地址编码转为文字
      params.orgAddress = codeToText(params.orgAddress).join('/');
      try {
        const { data } = await queryOrgList(params);
        renderData.value = data.list;
        // console.log(data.list);
        // console.log(renderData.value);
        if (data.list.length === 0 && data.total > 0) {
          params.pageNum = data.pages;
          fetchData(params);
        }
        if (renderData.value.length > 0) {
          renderData.value.forEach((item) => {
            if (typeof item.material === 'string') {
              item.material = item.material
                .trim()
                .split(';')
                .filter((s) => {
                  return s !== '';
                });
            }
          });
        }
        // console.log(renderData.value);
        pagination.current = data.pageNum;
        pagination.total = data.total;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };

    const search = () => {
      fetchData({
        size: pagination.pageSize,
        pageNum: basePagination.current,
        ...formModel.value,
      } as unknown as OrgListParams);
    };
    const onPageChange = (pageNum: number) => {
      fetchData({ ...formModel.value, size: pagination.pageSize, pageNum });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
      search();
    };

    const handleClickView = (record: Organization) => {
      orgModalVisible.value = true;
      viewOrCreate.value = true;
      orgForm.value = JSON.parse(JSON.stringify(record));
      orgForm.value.address = textToCode(orgForm.value.address);
    };

    const handleDeleteOk = async (item: { id: number }) => {
      setLoading(true);
      deleteOrg({
        orgId: item.id,
      })
        .then(async () => {
          fetchData({
            size: pagination.pageSize,
            pageNum: pagination.current,
            ...formModel.value,
          });
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
    const isBlank = (s?: string) => {
      return !s || s.trim() === '';
    };
    const handleBeforeOk = (done: any): boolean => {
      if (isBlank(orgForm.value.name)) {
        Message.info('单位名称必填');
        done(false);
        return false;
      }
      if (isBlank(orgForm.value.type)) {
        Message.info('单位性质必填');
        done(false);
        return false;
      }
      if (isBlank(orgForm.value.address)) {
        Message.info('单位地址必填');
        done(false);
        return false;
      }
      if (isBlank(orgForm.value.detail)) {
        Message.info('人才类别必填');
        done(false);
        return false;
      }
      return true;
    };
    const handleCreateOrgOk = async () => {
      setLoading(true);
      if (Array.isArray(orgForm.value.material)) {
        orgForm.value.material = orgForm.value.material.join('');
      }
      orgForm.value.address = codeToText(orgForm.value.address).join('/');
      try {
        let data;
        if (viewOrCreate.value) {
          data = await setOrgInfo(orgForm.value);
          Message.success('修改成功');
        } else {
          data = await addOrg(orgForm.value);
          Message.success('添加成功');
        }
        // fetchData({
        //   size: pagination.pageSize,
        //   pageNum: pagination.current,
        //   ...formModel.value,
        // });
      } finally {
        setLoading(false);
      }
    };
    const handleCreateCancel = () => {
      console.log(orgModalVisible.value);
      orgModalVisible.value = false;
    };
    const handleClickImport = () => {
      importModalVisible.value = true;
    };
    const handleClickDownload = async () => {
      setDownloadLoading(true);
      const res = await exportExcel({
        size: basePagination.pageSize,
        pageNum: basePagination.current,
        ...formModel.value,
      });
      // @ts-ignore
      const blob = new Blob([res], { type: 'application/x-xls' });
      const a = document.createElement('a');
      // 创建URL
      const blobUrl = window.URL.createObjectURL(blob);
      a.download = '单位信息表.xlsx';
      a.href = blobUrl;
      document.body.appendChild(a);
      // 下载文件
      a.click();
      // 释放内存
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
      setDownloadLoading(false);
    };
    return {
      loading,
      downloadLoading,
      search,
      onPageChange,
      renderData,
      pagination,
      formModel,
      regionOptions,
      reset,
      cutString,
      typeOptions,
      handleClickDelete,
      handleDeleteOk,
      viewOrCreate,
      orgModalVisible,
      importModalVisible,
      orgForm,
      handleClickView,
      handleCreateOrg,
      handleBeforeOk,
      handleCreateOrgOk,
      handleCreateCancel,
      handleClickImport,
      handleClickDownload,
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
