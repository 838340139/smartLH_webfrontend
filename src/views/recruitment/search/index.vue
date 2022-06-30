<template>
  <div class="container">
    <Breadcrumb :items="['menu.recruitment', 'menu.recruitment.searchRec']" />
    <a-card class="general-card" :title="$t('menu.recruitment.searchRec')">
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
                <a-form-item field="orgName" :label="$t('searchRec.form.recName')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('searchRec.form.recName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="place"
                  :label="$t('searchRec.form.recAddress')"
                >
                  <a-cascader
                    v-model="formModel.address"
                    size="large"
                    class="large-cascader"
                    :options="regionOptions"
                    :placeholder="$t('searchRec.form.recAddress.placeholder')"
                    allow-search
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="education"
                  :label="$t('searchRec.form.recType')"
                >
                  <a-select
                    v-model="formModel.recType"
                    :options="typeOptions"
                    :placeholder="$t('searchRec.form.selectDefault')"
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
              {{ $t('searchRec.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchRec.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleCreateRec">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchRec.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchRec.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-tooltip content="数据量大时导出需要较长时间">
            <a-button @click="handleClickDownload">
              <template #icon>
                <icon-download />
              </template>
              {{ $t('searchRec.operation.download') }}
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
            :title="$t('searchRec.columns.number')"
            data-index="id"
          />
          <a-table-column
            :title="$t('searchRec.columns.name')"
            data-index="orgName"
          />
         <a-table-column
            :title="$t('searchRec.columns.num')"
            data-index="number"
          /> 
          <!-- <a-table-column
            :title="$t('searchRec.columns.phone')"
            data-index="phone"
          /> -->
          <a-table-column
            :title="$t('searchRec.columns.address')"
            data-index="place"
          >
            <!--            <template #cell="{ record }">-->
            <!--              <a-space>-->
            <!--                <a-avatar-->
            <!--                  v-if="record.contentType === 'img'"-->
            <!--                  :size="16"-->
            <!--                  shape="square"-->
            <!--                >-->
            <!--                  <img-->
            <!--                    alt="avatar"-->
            <!--                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"-->
            <!--                  />-->
            <!--                </a-avatar>-->
            <!--                <a-avatar-->
            <!--                  v-else-if="record.contentType === 'horizontalVideo'"-->
            <!--                  :size="16"-->
            <!--                  shape="square"-->
            <!--                >-->
            <!--                  <img-->
            <!--                    alt="avatar"-->
            <!--                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"-->
            <!--                  />-->
            <!--                </a-avatar>-->
            <!--                <a-avatar v-else :size="16" shape="square">-->
            <!--                  <img-->
            <!--                    alt="avatar"-->
            <!--                    src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"-->
            <!--                  />-->
            <!--                </a-avatar>-->
            <!--                {{ $t(`searchOrg.form.orgType.${record.contentType}`) }}-->
            <!--              </a-space>-->
            <!--            </template>-->
          </a-table-column>
         
          <a-table-column
            :title="$t('searchRec.columns.education')"
            data-index="education"
          >
            <template #cell="{ record }">
              <p style="text-overflow: ellipsis; white-space: nowrap">
                {{ record.education }}
              </p>
            </template>
          </a-table-column>
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
            :title="$t('searchRec.columns.operations')"
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
      v-model:visible="recModalVisible"
      width="40%"
      :mask-closable="false"
      @ok="handleCreateRecOk"
      @cancel="handleCreateCancel"
    >
      <template #title> {{ viewOrCreate ? '详情' : '添加' }} </template>
      <div>
        <a-form :model="recForm" auto-label-width>
          <a-form-item field="orgName" label="招聘单位名称">
            <a-input v-model="recForm.orgName" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="number" label="招聘人数">
           <a-input v-model="recForm.number" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="place" label="工作地点">
            <a-cascader
              v-model="recForm.place"
              size="large"
              class="large-cascader"
              check-strictly
              :options="regionOptions"
              placeholder="请选择"
              allow-search
            />
          </a-form-item>
          <a-form-item field="education" label="学历要求">
            <a-input v-model="recForm.education" placeholder="请输入" />
          </a-form-item>
          <!-- <a-form-item field="type" label="介绍">
            <a-textarea
              v-model="recForm.introduction"
              placeholder="请输入"
              :max-length="255"
              allow-clear
              style="height: 100px"
              show-word-limit
            />
          </a-form-item> -->
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, h } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { Pagination, Options } from '@/types/global';
import { regionData, CodeToText } from 'element-china-area-data';
import { Modal, Message  } from '@arco-design/web-vue';
import { codeToText, textToCode } from '@/utils/region';
import { Recruitment } from '@/types/global';
import {cutString} from "@/utils/stringUtils";
import {
  RecListParams,
  queryRecList,
  addRecruitment,
  setRecruitInfo,
  deleteRecruit,
  exportExcel,
} from '@/api/recruitment';

const generateFormModel = () => {
  return {
    orgName: '',
    place: '',
    education: '',
  };
};

const generateCreateRecFormModel = () => {
  return {
    orgName: '',
    num: '',
    place: '',
    education: '',
  };
};
export default defineComponent({
  components: {},
  setup() {
    const { loading, setLoading } = useLoading(true);
    const { loading: downloadLoading, setLoading: setDownloadLoading } =
        useLoading(false);
    const recModalVisible = ref<boolean>(false);
    const viewRecCreate = ref<boolean>(false);
    const recForm = ref<Recruitment>(generateCreateRecFormModel());
    const { t } = useI18n();
    const renderData = ref<Recruitment[]>([]);
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
    // const fetchTypeData = async () => {
    //   const data = await getTypes();
    //   if (data.data) {
    //     typeOptions.value = data.data.map((item) => {
    //       return {
    //         label: item,
    //         value: item,
    //       };
    //     });
    //   }
    // };
    // fetchTypeData();
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
    // ]);
    const fetchData = async (
      params: RecListParams = { pageNum: 1, size: 20 }
    ) => {
      setLoading(true);
      // 地址编码转为文字
      params.place = codeToText(params.place).join('/');
      try {
        const { data } = await queryRecList(params);
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
      } as unknown as RecListParams);
    };
    const onPageChange = (pageNum: number) => {
      fetchData({ ...basePagination, size: basePagination.pageSize, pageNum });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
    };

    const handleClickView = (record: Recruitment) => {
      recModalVisible.value = true;
      viewRecCreate.value = true;
      recForm.value = record;
      recForm.value.place = textToCode(recForm.value.place);
    };

    const handleDeleteOk = async (item: { id: number }) => {
      setLoading(true);
      deleteRecruit({
        recruitmentId: item.id,
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

    const handleCreateRec = () => {
      recModalVisible.value = true;
      viewRecCreate.value = false;
      recForm.value = generateCreateRecFormModel();
    };
    const handleCreateRecOk = async () => {
      setLoading(true);
      if (viewRecCreate.value) {
        recForm.value.place = codeToText(recForm.value.place).join('/');
        await setRecruitInfo(recForm.value);
        Message.success('修改成功');
      } else {
        recForm.value.place = codeToText(recForm.value.place).join('/');
        await addRecruitment(recForm.value);
        Message.success('添加成功');
      }
      recModalVisible.value = false;
      setLoading(false);
      search();
    };
    const handleCreateCancel = () => {
      recModalVisible.value = false;
    };
    const handleClickDownload = async () => {
      setDownloadLoading(true)
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
      a.download = '招聘信息表.xlsx';
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
      search,
      onPageChange,
      renderData,
      pagination,
      regionOptions,
      formModel,
      reset,
      cutString,
      typeOptions,
      handleClickDelete,
      handleDeleteOk,
      viewRecCreate,
      recModalVisible,
      recForm,
      handleClickView,
      handleCreateRec,
      handleCreateRecOk,
      handleCreateCancel,
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
.container {
  padding: 0 20px 20px 20px;
}

.operations {
  display: flex;
}
</style>
