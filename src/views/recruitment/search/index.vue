<template>
  <div class="container">
    <Breadcrumb :items="['menu.recruitment', 'menu.recruitment.searchRec']" />
    <a-card class="general-card" :title="$t('menu.recruitment.searchRec')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 7 }"
            :wrapper-col-props="{ span: 17 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item field="orgName" label="招聘单位">
                  <a-input
                    v-model="formModel.orgName"
                    :placeholder="$t('searchRec.form.recName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  field="place"
                  label="工作地点"
                >
                  <a-cascader
                    v-model="formModel.place"
                    size="large"
                    class="large-cascader"
                    :options="regionOptions"
                    :placeholder="$t('searchRec.form.recAddress.placeholder')"
                    allow-search
                  />
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item field="place" label="工作地点">
                  <a-select
                    v-model="formModel.place"
                    :options="countryType"
                    :placeholder="$t('searchRec.form.recAddress.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="education"
                  :label="$t('searchRec.form.recType')"
                >
                  <a-select
                    v-model="formModel.education"
                    :options="educationType"
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
        <!-- <a-col :span="16">
          <a-space>
                       <a-button type="primary" @click="handleCreateRec">-->
        <!--              <template #icon>-->
        <!--                <icon-plus />-->
        <!--              </template>-->
        <!--              {{ $t('searchRec.operation.create') }}-->
        <!--            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchRec.operation.import') }}
                </a-button>
              </template>
            </a-upload>
          </a-space>
        </a-col> -->
        <a-col :span="16">
          <a-space>
            <!--            <a-button type="primary" @click="handleCreateRec">-->
            <!--              <template #icon>-->
            <!--                <icon-plus />-->
            <!--              </template>-->
            <!--              {{ $t('searchOrg.operation.create') }}-->
            <!--            </a-button>-->
            <a-button @click="handleClickImport"> 批量导入 </a-button>
          </a-space>
        </a-col>
        <a-col :span="8" style="text-align: right">
          <a-tooltip content="数据量大时导出需要较长时间">
            <a-button :loading="downloadLoading" @click="handleClickDownload">
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
            :width="70"
            data-index="rowNum"
          />
          <a-table-column title="标题" :width="130" data-index="title" />
          <a-table-column
            :title="$t('searchRec.columns.name')"
            :width="130"
            data-index="orgName"
          />
          <a-table-column
            :title="$t('searchRec.columns.num')"
            data-index="number"
          />

          <a-table-column
            :title="$t('searchRec.columns.address')"
            :width="130"
            data-index="place"
          >
          </a-table-column>
          <a-table-column
            :title="$t('searchRec.columns.education')"
            data-index="education"
          />
          <a-table-column title="点击量" data-index="view"> </a-table-column>
          <a-table-column title="发布时间" data-index="publishTime">
          </a-table-column>
          <a-table-column title="投递数" data-index="deliverNumber">
            <template #cell="{ record }">
              <a-button
                type="text"
                size="small"
                @click="
                  () => {
                    handleClickViewDeliver(record);
                  }
                "
              >
                {{ record.deliverNumber }}
              </a-button>
            </template>
          </a-table-column>
          <a-table-column title="下级单位名称" data-index="includeOrg">
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
      v-model:visible="deliverTableVisible"
      width="65%"
      :mask-closable="false"
      unmount-on-close
      hide-cancel
      @ok="deliverTableVisible = false"
    >
      <template #title> 投递详情 </template>

      <a-table
        row-key="id"
        :loading="loadingDeliver"
        :pagination="false"
        :data="deliverTable"
        :bordered="false"
        style="height: 62vh"
      >
        <template #columns>
          <a-table-column
              title="序号"
              :width="100"
              data-index="index"
          />
          <a-table-column
            title="姓名"
            :width="140"
            data-index="resumeInfo.name"
          />
          <a-table-column
            title="性别"
            :width="80"
            data-index="resumeInfo.sex"
          />
          <a-table-column
            title="电话"
            :width="150"
            data-index="resumeInfo.phone"
          />
          <a-table-column
            title="微信"
            :width="150"
            data-index="resumeInfo.wxAccount"
          />
          <a-table-column
            title="投递时间"
            :width="200"
            data-index="deliverInfo.deliverTime"
          />
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a
                target="_blank"
                :href="
                  './#/deliver?deliverId=' + record.deliverInfo.id
                "
                >查看简历</a
              >
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-modal>

    <a-modal
      v-model:visible="importModalVisible"
      :width="500"
      :mask-closable="false"
      unmount-on-close
      hide-cancel
      @ok="importModalVisible = false"
    >
      <template #title> 批量导入 </template>
      <import-excel url="/Recruitment/importExcel"> </import-excel>
    </a-modal>

    <a-modal
      v-model:visible="recModalVisible"
      width="80%"
      :mask-closable="false"
      :on-before-ok="handleBeforeOk"
      @ok="handleCreateRecOk"
      @cancel="handleCreateCancel"
    >
      <template #title>详情</template>
      <template #footer><span></span></template>
      <recruitment-form
        style="height: 70vh"
        :init-value="recForm"
        submit-text="保存"
        :on-submit="handleSetRecOk"
      >
      </recruitment-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, h } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import {
  Pagination,
  Options,
  Recruitment,
  educationType,
  countryType,
  freshType,
  sexType,
  politicsType,
  experienceType,
} from '@/types/global';
import { regionData, CodeToText } from 'element-china-area-data';
import { Modal, Message } from '@arco-design/web-vue';
import { codeToText, textToCode } from '@/utils/region';
import { cutString } from '@/utils/stringUtils';
import {
  RecListParams,
  queryRecList,
  addRecruitment,
  setRecruitInfo,
  deleteRecruit,
  exportExcel,
} from '@/api/recruitment';
import { getByRecruitmentId } from '@/api/deliver';
// import RecruitmentForm from '@/views/recruitment/components/recruitment-form.vue';
import importExcel from '@/components/importExcel/index.vue';
import RecruitmentForm from '../components/recruitment-form.vue';

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
    number: '',
    position: '',
    age: '',
    subject: '',
    fresh: '',
    education: '',
    place: '',
    politics: '',
    remark: '',
    title: '',
    content: '',
    salaryFloor: '',
    salaryCell: '',
    experience: '',
    detail: '',
    deliverNumber: '',
    includeOrg: '',
  };
};
export default defineComponent({
  // components: { RecruitmentForm },
  components: { importExcel, RecruitmentForm },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const {loading: loadingDeliver, setLoading: setLoadingDeliver } = useLoading(true);
    const { loading: downloadLoading, setLoading: setDownloadLoading } =
      useLoading(false);
    const recModalVisible = ref<boolean>(false);
    const importModalVisible = ref<boolean>(false);
    const deliverTableVisible = ref<boolean>(false);
    const viewRecCreate = ref<boolean>(false);
    const recForm = ref<Recruitment>(generateCreateRecFormModel());
    const { t } = useI18n();
    const deliverTable = ref<any>([]);
    const renderData = ref<Recruitment[]>([]);
    // const typeOptions = ref<{ label: string; value: string }[]>([]);
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
    const getEducation = () => {
      const educationElement = document.getElementById('education');
      if (educationElement) {
        const education = JSON.parse(educationElement.innerHTML);
        educationElement.innerHTML = education
          .map((item: any) => {
            const inDate = item.inDate ? item.inDate : '';
            const outDate = item.outDate ? item.outDate : '';
            const school = item.school ? item.school : '';
            return `${inDate}~${outDate}~${school}`;
          })
          .join('\n');
      }
    };
    const regionOptions = ref(regionData);
    const fetchData = async (
      params: RecListParams = {
        pageNum: pagination.current,
        size: pagination.pageSize,
      }
    ) => {
      setLoading(true);
      // 地址编码转为文字
      params.place = codeToText(params.place).join('/');
      try {
        const { data } = await queryRecList(params);
        renderData.value = data.list;
        if (data.list.length === 0 && data.total > 0) {
          params.pageNum = data.pages;
          fetchData(params);
        }
        renderData.value.forEach((item, index) => {
          item.rowNum = index + data.startRow;
        });
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
      } as unknown as RecListParams);
    };
    const onPageChange = (pageNum: number) => {
      fetchData({ ...formModel.value, size: pagination.pageSize, pageNum });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
      search();
    };

    const handleClickView = (record: Recruitment) => {
      recModalVisible.value = true;
      viewRecCreate.value = true;
      recForm.value = JSON.parse(JSON.stringify(record));
      // recForm.value = record;
      recForm.value.place = textToCode(recForm.value.place);
    };

    const handleDeleteOk = async (item: { id: number }) => {
      setLoading(true);
      deleteRecruit({
        recruitmentId: item.id,
      })
        // .then(async () => {
        //   await fetchData();
        // })
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
    const handleCreateRec = () => {
      recModalVisible.value = true;
      viewRecCreate.value = false;
      recForm.value = generateCreateRecFormModel();
    };
    const isBlank = (s?: string) => {
      return !s || s.trim() === '';
    };
    const handleBeforeOk = (done: any): boolean => {
      if (isBlank(recForm.value.orgName)) {
        Message.info('单位名称必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.number)) {
        Message.info('招聘人数必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.position)) {
        Message.info('招聘职位必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.age)) {
        Message.info('年龄必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.subject)) {
        Message.info('专业必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.fresh)) {
        Message.info('是否应届必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.education)) {
        Message.info('教育经历必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.place)) {
        Message.info('工作地点必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.detail)) {
        Message.info('人才类别必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.politics)) {
        Message.info('政治面貌必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.remark)) {
        Message.info('岗位要求必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.content)) {
        Message.info('岗位职责必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.title)) {
        Message.info('招聘标题必填');
        done(false);
        return false;
      }
      if (recForm.value.salaryFloor == null) {
        Message.info('薪资下限必填');
        done(false);
        return false;
      }
      if (recForm.value.salaryCell == null) {
        Message.info('薪资上限必填');
        done(false);
        return false;
      }
      if (isBlank(recForm.value.experience)) {
        Message.info('工作经验必填');
        done(false);
        return false;
      }
      return true;
    };
    const handleCreateRecOk = async () => {
      setLoading(true);
      recForm.value.place = codeToText(recForm.value.place).join('/');
      try {
        let data;
        if (viewRecCreate.value) {
          data = await setRecruitInfo(recForm.value);
          Message.success('修改成功');
        } else {
          data = await addRecruitment(recForm.value);
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
    const handleSetRecOk = async (item: Recruitment) => {
      setLoading(true);
      try {
        await setRecruitInfo(item);
        Message.success('修改成功');
        recModalVisible.value = false;
        search();
      } finally {
        setLoading(false);
      }
    };
    const handleCreateCancel = () => {
      recModalVisible.value = false;
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
    const handleClickViewDeliver = async (record: any) => {
      deliverTableVisible.value = true;
      deliverTable.value = [];
      setLoadingDeliver(true);
      try {
        const { data } = await getByRecruitmentId({ recruitmentId: record.id });
        const resumeMap: any = {};
        data.users.forEach((item: any) => {
          resumeMap[item.id] = item;
        });
        deliverTable.value = data.resumeDeliverList.map(
          (item: any, index: number) => {
            return {
              deliverInfo: item,
              resumeInfo: resumeMap[item.userId],
              index: index + 1,
            };
          }
        );
        // eslint-disable-next-line no-empty
      } catch (e) {}
      finally {
        setLoadingDeliver(false);
      }
    };
    return {
      loading,
      loadingDeliver,
      downloadLoading,
      search,
      onPageChange,
      renderData,
      pagination,
      regionOptions,
      deliverTable,
      countryType,
      formModel,
      reset,
      cutString,
      educationType,
      freshType,
      politicsType,
      handleClickDelete,
      handleDeleteOk,
      viewRecCreate,
      deliverTableVisible,
      recModalVisible,
      importModalVisible,
      recForm,
      handleClickView,
      handleCreateRec,
      handleCreateRecOk,
      handleSetRecOk,
      handleBeforeOk,
      handleCreateCancel,
      handleClickImport,
      handleClickDownload,
      handleClickViewDeliver,
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
