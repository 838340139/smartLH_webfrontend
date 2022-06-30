<template>
  <div class="container">
    <Breadcrumb :items="['menu.personnel', 'menu.personnel.search']" />
    <a-card class="general-card" :title="$t('menu.personnel.search')">
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
                  field="userName"
                  :label="$t('searchTable.form.number')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('searchTable.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="subject"
                  :label="$t('searchTable.form.name')"
                >
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('searchTable.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="academic"
                  :label="$t('searchTable.form.contentType')"
                >
                  <a-select
                    v-model="formModel.contentType"
                    :options="contentTypeOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="sex"
                  :label="$t('searchTable.form.filterType')"
                >
                  <a-select
                    v-model="formModel.filterType"
                    :options="filterTypeOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="politics"
                  :label="$t('searchTable.form.politicsType')"
                >
                  <a-select
                    v-model="formModel.politicsType"
                    :options="contentTypeOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <!-- <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('searchTable.form.createdTime')"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item
                  field="fresh"
                  :label="$t('searchTable.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('searchTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('searchTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('searchTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleCreatePer">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('searchTable.operation.create') }}
            </a-button>
            <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('searchTable.operation.import') }}
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
            {{ $t('searchTable.operation.download') }}
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
            :title="$t('searchTable.columns.number')"
            data-index="wxAccount"
          />
          <a-table-column
            :title="$t('searchTable.columns.name')"
            data-index="name"
          />
          <a-table-column
            :title="$t('searchTable.columns.home')"
            data-index="home"
          />
          <a-table-column
            :title="$t('searchTable.columns.place')"
            data-index="place"
          />
          <a-table-column
            :title="$t('searchTable.columns.subject')"
            data-index="subject"
          />
          <!-- <a-table-column
            :title="$t('searchTable.columns.academic')"
            data-index="academic"
          /> -->
          <a-table-column
            :title="$t('searchTable.columns.education')"
            data-index="education"
          />
          <a-table-column
            :title="$t('searchTable.columns.marriage')"
            data-index="marriage"
          />
          <!--   <a-table-column
            :title="$t('searchTable.columns.phone')"
            data-index="phone"
          />
             <a-table-column
            :title="$t('searchTable.columns.politics')"
            data-index="politics"
          />
        <a-table-column
            :title="$t('searchTable.columns.photo')"
            data-index="photo"
          />
          <a-table-column
            :title="$t('searchTable.columns.post')"
            data-index="post"
          />
          <a-table-column
            :title="$t('searchTable.columns.graduation')"
            data-index="graduation"
          />
         <a-table-column
            :title="$t('searchTable.columns.birthday')"
            data-index="birthday"
          />
          <a-table-column
            :title="$t('searchTable.columns.fresh')"
            data-index="fresh"
          />
          <a-table-column
            :title="$t('searchTable.columns.mailbox')"
            data-index="mailbox"
          /> 
          <a-table-column
            :title="$t('searchTable.columns.work')"
            data-index="work"
          /> 
          <a-table-column
            :title="$t('searchTable.columns.prize')"
            data-index="prize"
          /> 
          <a-table-column
            :title="$t('searchTable.columns.introduction')"
            data-index="introduction"
          /> 
          <a-table-column
            :title="$t('searchTable.columns.undergo')"
            data-index="undergo"
          />  -->

          <a-table-column
            :title="$t('searchTable.columns.contentType')"
            data-index="academic"
          >
            <!-- <template #cell="{ record }">
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
                {{ $t(`searchTable.form.contentType.${record.contentType}`) }}
              </a-space>
            </template> -->
          </a-table-column>
          <a-table-column
            :title="$t('searchTable.columns.filterType')"
            data-index="sex"
          >
            <template #cell="{ record }">
              {{ record.sex }}
            </template>
          </a-table-column>
          <!-- <a-table-column
            :title="$t('searchTable.columns.count')"
            data-index="count"
          />
          <a-table-column
            :title="$t('searchTable.columns.createdTime')"
            data-index="createdTime"
          /> -->
          <a-table-column
            :title="$t('searchTable.columns.status')"
            data-index="status"
          >
            <template #cell="{ record }">
              <!-- <span v-if="record.status === 'offline'" class="circle"></span>
              <span v-else class="circle pass"></span> -->
              {{ record.status }}
            </template>
          </a-table-column>
          <a-table-column
            :title="$t('searchTable.columns.operations')"
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
      v-model:visible="perModalVisible"
      width="40%"
      :mask-closable="false"
      @ok="handleCreatePerOk"
      @cancel="handleCreateCancel"
    >
      <template #title> {{ viewOrCreate ? '详情' : '添加' }} </template>
      <div>
        <a-form :model="perForm" auto-label-width>
          <a-form-item field="wxAccount" label="用户账号">
            <a-input v-model="perForm.wxAccount" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="name" label="姓名">
            <a-input v-model="perForm.name" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="home" label="籍贯">
            <a-cascader
              v-model="perForm.home"
              size="large"
              class="large-cascader"
              check-strictly
              :options="regionOptions"
              placeholder="请选择"
              allow-search
            />
          </a-form-item>
          <a-form-item field="place" label="现居地">
            <a-cascader
              v-model="perForm.place"
              size="large"
              class="large-cascader"
              check-strictly
              :options="regionOptions"
              placeholder="请选择"
              allow-search
            />
          </a-form-item>
          <a-form-item field="subject" label="专业">
            <a-input v-model="perForm.subject" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="academic" label="教育经历">
            <a-input v-model="perForm.academic" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="marriage" label="婚姻状况">
            <a-input v-model="perForm.marriage" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="education" label="学历">
            <a-input v-model="perForm.education" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="sex" label="性别">
            <a-input v-model="perForm.sex" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="status" label="状态">
            <a-input v-model="perForm.status" placeholder="请输入" />
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
import { Pagination, Options, Personnel } from '@/types/global';
import {
  PerListParams,
  queryPerList,
  setUserInfo,
  deleteUser,
} from '@/api/personnel';
import { regionData, CodeToText } from 'element-china-area-data';
import { Modal, Message } from '@arco-design/web-vue';
import { codeToText, textToCode } from '@/utils/region';
import { cutString } from '@/utils/stringUtils';

const generateFormModel = () => {
  return {
    userName: '',
    subject: '',
    academic: '',
    sex: '',
    fresh: '',
    politics: '',
  };
};

const generateCreatePerFormModel = () => {
  return {
    wxAccount: '',
    name: '',
    home: '',
    place: '',
    subject: '',
    education: '',
    marriage: '',
    academic: '',
    sex: '',
  };
};
export default defineComponent({
  components: {},
  setup() {
    const { loading, setLoading } = useLoading(true);
    const perModalVisible = ref<boolean>(false);
    const viewPerCreate = ref<boolean>(false);
    const perForm = ref<Personnel>(generateCreatePerFormModel());
    const { t } = useI18n();
    const renderData = ref<Personnel[]>([]);
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
    //   if(data.data){
    //     typeOptions.value = data.data.map((item) => {
    //       return {
    //         label: item,
    //         value: item,
    //       };
    //     });
    //   }
    // };
    // fetchTypeData();
    //  const typeOptions = computed<Options[]>(() => [
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
    //  ]);
    const fetchData = async (
      params: PerListParams = { pageNum: 1, size: 20 }
    ) => {
      setLoading(true);
      // params.place = codeToText(params.place).join('/');
      try {
        const { data } = await queryPerList(params);
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
      } as unknown as PerListParams);
    };
    const onPageChange = (pageNum: number) => {
      fetchData({ ...basePagination, size: basePagination.pageSize, pageNum });
    };

    fetchData();
    const reset = () => {
      formModel.value = generateFormModel();
    };

    const handleClickView = (record: Personnel) => {
      perModalVisible.value = true;
      viewPerCreate.value = true;
      perForm.value = record;
      perForm.value.place = textToCode(perForm.value.place);
    };

    const handleDeleteOk = async (item: { id: number }) => {
      setLoading(true);
      deleteUser({
        userId: item.id,
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

    const handleCreatePer = () => {
      perModalVisible.value = true;
      viewPerCreate.value = false;
      perForm.value = generateCreatePerFormModel();
    };
    const handleCreatePerOk = async () => {
      setLoading(true);
      if (viewPerCreate.value) {
        perForm.value.place = codeToText(perForm.value.place).join('/');
        await setUserInfo(perForm.value);
        Message.success('修改成功');
      } else {
        perForm.value.place = codeToText(perForm.value.place).join('/');
        // await addRecruitment(perForm.value);
        Message.success('添加成功');
      }
      perModalVisible.value = false;
      setLoading(false);
      search();
    };
    const handleCreateCancel = () => {
      perModalVisible.value = false;
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
      viewPerCreate,
      perModalVisible,
      perForm,
      handleClickView,
      handleCreatePer,
      handleCreatePerOk,
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
