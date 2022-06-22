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
                <a-form-item field="name" :label="$t('searchRec.form.recName')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('searchRec.form.recName.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="address"
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
                  field="recType"
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
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('searchRec.operation.download') }}
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
            :title="$t('searchRec.columns.number')"
            data-index="id"
          />
          <a-table-column
            :title="$t('searchRec.columns.name')"
            data-index="name"
          />
         <a-table-column
            :title="$t('searchRec.columns.num')"
            data-index="num"
          /> 
          <a-table-column
            :title="$t('searchRec.columns.phone')"
            data-index="phone"
          />
          <a-table-column
            :title="$t('searchRec.columns.address')"
            data-index="address"
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
                {{ record.introduction }}
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
            <template #cell>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('searchRec.columns.operations.view') }}
              </a-button>
              <a-button v-permission="['admin']" type="text" size="small">
                {{ $t('searchRec.columns.operations.delete') }}
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <a-modal
      v-model:visible="createRecModalVisible"
      width="40%"
      @ok="handleCreateRecOk"
      @cancel="handleCreateCancel"
    >
      <template #title> 添加招聘信息 </template>
      <div>
        <a-form :model="createRecForm" auto-label-width>
          <a-form-item field="name" label="招聘单位名称">
            <a-input
              v-model="createRecForm.name"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item field="type" label="职位名称">
            <a-input
              v-model="createRecForm.type"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item field="num" label="招聘人数">
            <a-input
              v-model="createRecForm.num"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item field="education" label="最低学历要求">
            <a-input
              v-model="createRecForm.education"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item field="address" label="工作地点">
            <a-cascader
              size="large"
              :options="regionOptions"
              placeholder="请选择"
              allow-search
            />
          </a-form-item>
          <a-form-item field="phone" label="联系电话">
            <a-input
              v-model="createRecForm.phone"
              placeholder="请输入"
            />
          </a-form-item>
          <a-form-item field="type" label="职能介绍">
            <a-textarea
              v-model="createRecForm.introduction"
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
import { defineComponent, computed, ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import { Pagination, Options } from '@/types/global';
import { Recruitment, RecListParams, queryRecList } from '@/api/recruitment';
import { regionData } from 'element-china-area-data';

const generateFormModel = () => {
  return {
    name: '',
    address: '',
    type: '',
  };
};

const generateCreateRecFormModel = () => {
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
    const createRecModalVisible = ref<boolean>(false);
    const createRecForm = ref(generateCreateRecFormModel());
    const { t } = useI18n();
    const renderData = ref<Recruitment[]>([]);
    const formModel = ref(generateFormModel());
    const basePagination: Pagination = {
      current: 1,
      pageSize: 20,
    };
    const pagination = reactive({
      ...basePagination,
    });
    const regionOptions = ref(regionData);
     const typeOptions = computed<Options[]>(() => [
      {
        label: t('recruitment.recType.undergraduate'),
        value: t('recruitment.recType.undergraduate'),
      },
      {
        label: t('recruitment.recType.master'),
        value: t('recruitment.recType.master'),
      },
      {
        label: t('recruitment.recType.phd'),
        value: t('recruitment.recType.phd'),
      },
      {
        label: t('recruitment.recType.others'),
        value: t('recruitment.recType.others'),
      },
    ]);
    const fetchData = async (
      params: RecListParams = { pageNum: 1, size: 20 }
    ) => {
      setLoading(true);
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
        ...basePagination,
        size: basePagination.pageSize,
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

    const handleCreateRec = () => {
      createRecModalVisible.value = true;
    };
    const handleCreateRecOk = () => {
      createRecModalVisible.value = false;
    };
    const handleCreateCancel = () => {
      createRecModalVisible.value = false;
    };
    return {
      loading,
      search,
      onPageChange,
      renderData,
      pagination,
      formModel,
      reset,
      typeOptions,
      createRecModalVisible,
      createRecForm,
      handleCreateRec,
      handleCreateRecOk,
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
.container {
  padding: 0 20px 20px 20px;
}

.operations {
  display: flex;
}
</style>
