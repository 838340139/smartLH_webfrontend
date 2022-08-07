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
                    v-model="formModel.userName"
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
                    v-model="formModel.subject"
                    :placeholder="$t('searchTable.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="academic"
                  :label="$t('searchTable.form.academic')"
                >
                  <a-select
                    v-model="formModel.academic"
                    :options="educationType"
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
                    v-model="formModel.sex"
                    :options="sexType"
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
                    v-model="formModel.politics"
                    :options="politicsType"
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
              <!-- <a-col :span="8">
                <a-form-item
                  field="fresh"
                  :label="$t('searchTable.form.status')"
                >
                  <a-input
                    v-model="formModel.status"
                    :placeholder="$t('searchTable.form.status.placeholder')"
                  />
                </a-form-item>
              </a-col> -->
              <a-col :span="8">
                <a-form-item
                  field="fresh"
                  :label="$t('searchTable.form.fresh')"
                >
                  <a-select
                    v-model="formModel.fresh"
                    :options="freshType"
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
        <!-- <a-col :span="16">
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
        </a-col> -->
        <a-col :span="16">
          <a-space>
            <a-button type="primary" @click="handleCreatePer">
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
          <a-table-column
            :title="$t('searchTable.columns.academic')"
            data-index="academic"
          />
          <a-table-column
            :title="$t('searchTable.columns.education')"
            data-index="education"
            ellipsis
            width="320"
            :tooltip="{
              'mouse-enter-delay': 800,
            }"
          >
            <template #cell="{ record }">
              <a-space direction="vertical">
                <span v-if="isString(parseEducation(record.education))">
                  {{ record.education }}
                </span>
                <template v-else>
                  <span
                    v-for="(item, index) in parseEducation(record.education)"
                    :key="index"
                  >
                    {{
                      item.inDate + '~' + item.outDate + ':' + item.schoolName
                    }}
                  </span>
                </template>
              </a-space>
            </template>
          </a-table-column>
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

          <!-- <a-table-column
            :title="$t('searchTable.columns.contentType')"
            data-index="academic"
          > -->
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
          <!-- </a-table-column> -->
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
            :title="$t('searchTable.columns.operations')"
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
      <import-excel url="/User/importExcel"> </import-excel>
    </a-modal>
    <a-modal
      v-model:visible="perModalVisible"
      :width="1100"
      :mask-closable="false"
      :on-before-ok="handleBeforeOk"
      @ok="handleCreatePerOk"
      @cancel="handleCreateCancel"
    >
      <template #title> {{ viewOrCreate ? '详情' : '添加' }} </template>
      <!-- <a-row style="height: 450px" :gutter="20">
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
        </a-col> -->
      <a-col :span="viewOrCreate ? 20 : 24">
        <div style="height: 70vh">
          <a-form :model="perForm" auto-label-width @submit="handleCreatePerOk">
            <a-row :gutter="20">
              <a-col :span="12">
                <a-form-item
                  field="wxAccount"
                  label="微信号"
                  required
                  :rules="[{ required: true, message: '微信号必填' }]"
                >
                  <a-input v-model="perForm.wxAccount" placeholder="请输入" />
                </a-form-item>
                <a-form-item
                  field="name"
                  label="姓名"
                  required
                  :rules="[{ required: true, message: '姓名必填' }]"
                >
                  <a-input v-model="perForm.name" placeholder="请输入" />
                </a-form-item>
                <a-form-item
                  field="phone"
                  label="电话"
                  required
                  :rules="[{ required: true, message: '电话必填' }]"
                >
                  <a-input v-model="perForm.phone" placeholder="请输入" />
                </a-form-item>
                <a-form-item field="sex" label="性别">
                  <a-select
                    v-model="perForm.sex"
                    :options="sexType"
                    :placeholder="$t('searchOrg.form.selectDefault')"
                  />
                </a-form-item>
                <a-form-item field="home" label="籍贯">
                  <a-input v-model="perForm.home" placeholder="请输入" />
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

                <a-form-item field="detail" label="详细地址">
                  <a-input v-model="perForm.detail" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="subject" label="专业">
                  <a-input v-model="perForm.subject" placeholder="请输入" />
                </a-form-item>
                <a-form-item field="academic" label="学历">
                  <a-select
                    v-model="perForm.academic"
                    :options="educationType"
                    :placeholder="$t('searchOrg.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item field="marriage" label="婚姻状况">
                  <a-input v-model="perForm.marriage" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="nation" label="民族">
                  <a-input v-model="perForm.nation" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="politics" label="政治面貌">
                  <a-select
                    v-model="perForm.politics"
                    :options="politicsType"
                    :placeholder="$t('searchOrg.form.selectDefault')"
                  />
                </a-form-item>
                <a-form-item field="post" label="职称职务">
                  <a-input v-model="perForm.post" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="graduation" label="毕业时间">
                  <a-date-picker
                    v-model="perForm.graduation"
                    placeholder="毕业时间"
                    style="width: 90%"
                    size="medium"
                  />
                </a-form-item>

                <a-form-item field="birthday" label="出生日期">
                  <a-date-picker
                    v-model="perForm.birthday"
                    placeholder="出生日期"
                    style="width: 90%"
                    size="medium"
                  />
                </a-form-item>

                <!-- <a-form-item
                    field="fresh"
                    label="是否应届"
                    required
                    :rules="[{ required: true, message: '是否应届必填' }]"
                  >
                    <a-input v-model="perForm.fresh" placeholder="请输入" />
                  </a-form-item> -->

                <a-form-item field="mailbox" label="邮箱">
                  <a-input v-model="perForm.mailbox" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="work" label="现工作单位">
                  <a-input v-model="perForm.work" placeholder="请输入" />
                </a-form-item>

                <a-form-item field="prize" label="获奖情况">
                  <a-input v-model="perForm.prize" placeholder="请输入" />
                </a-form-item>
              </a-col>
              <a-form-item id="education" field="education" label="教育经历">
                <a-space direction="vertical">
                  <div v-for="(item, index) in educationForm" :key="index">
                    <a-date-picker
                      v-model="item.inDate"
                      placeholder="入学时间"
                      style="width: 200px; margin-right: 20px"
                      @change="forceSet"
                    />
                    <a-date-picker
                      v-model="item.outDate"
                      placeholder="毕业时间"
                      style="width: 200px; margin-right: 20px"
                      @change="forceSet"
                    />
                    <a-input
                      v-model="item.schoolName"
                      placeholder="学校名称"
                      style="width: 200px; display: inline-block"
                      @input="forceSet"
                    />
                  </div>
                  <a-button @click="handleClickAddEducation" type="primary" style="width: 10em">
                    <template #icon>
                      <icon-plus />
                    </template>
                  </a-button>
                </a-space>
              </a-form-item>
              <a-form-item field="introduction" label="自我简介">
                <a-textarea
                  v-model="perForm.introduction"
                  placeholder="毕业院校"
                  :max-length="255"
                  allow-clear
                  style="height: 200px"
                  show-word-limit
                />
              </a-form-item>
              <a-form-item field="undergo" label="个人经历">
                <a-input v-model="perForm.undergo" placeholder="请输入" />
              </a-form-item>
            </a-row>
          </a-form>
        </div>
      </a-col>
      <!-- </a-row> -->
    </a-modal>
    <!-- <a-modal
      v-model:visible="perModalVisible"
      width="40%"
      :mask-closable="false"
      @ok="handleCreatePerOk"
      @cancel="handleCreateCancel"
    >
      <template #title> {{ viewOrCreate ? '详情' : '编辑' }} </template>
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
          <a-form-item field="nation" label="民族">
            <a-input v-model="perForm.nation" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="politics" label="政治面貌">
            <a-input v-model="perForm.politics" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="photo" label="照片">
            <a-input v-model="perForm.photo" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="post" label="职称职务">
            <a-input v-model="perForm.post" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="graduation" label="状态">
            <a-input v-model="perForm.status" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="birthday" label="生日">
            <a-input v-model="perForm.status" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="fresh" label="是否应届">
            <a-input v-model="perForm.fresh" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="mailbox" label="邮箱">
            <a-input v-model="perForm.mailbox" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="work" label="现工作单位">
            <a-input v-model="perForm.status" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="prize" label="获奖情况">
            <a-input v-model="perForm.prize" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="introduction" label="简介">
            <a-input v-model="perForm.introduction" placeholder="请输入" />
          </a-form-item>
          <a-form-item field="undergo" label="个人经历">
            <a-input v-model="perForm.undergo" placeholder="请输入" />
          </a-form-item>
           <a-form-item field="type" label="介绍">
            <a-textarea
              v-model="recForm.introduction"
              placeholder="请输入"
              :max-length="255"
              allow-clear
              style="height: 100px"
              show-word-limit
            />
          </a-form-item>
        </a-form>
      </div>
    </a-modal> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, reactive, h } from 'vue';
import { useI18n } from 'vue-i18n';
import useLoading from '@/hooks/loading';
import {
  Pagination,
  Options,
  Personnel,
  educationType,
  politicsType,
  sexType,
  experienceType,
  freshType,
} from '@/types/global';
import {
  PerListParams,
  queryPerList,
  setUserInfo,
  addUser,
  deleteUser,
  exportExcel,
} from '@/api/personnel';
import { regionData, CodeToText } from 'element-china-area-data';
import { Modal, Message } from '@arco-design/web-vue';
import { codeToText, textToCode } from '@/utils/region';
import { cutString, isString } from '@/utils/stringUtils';
import importExcel from '@/components/importExcel/index.vue';

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
    detail: '',
    subject: '',
    education: '',
    marriage: '',
    academic: '',
    sex: '',
    nation: '',
    phone: '',
    politics: '',
    photo: '',
    post: '',
    graduation: '',
    birthday: '',
    fresh: '',
    mailbox: '',
    work: '',
    prize: '',
    introduction: '',
    undergo: '',
    status: '',
  };
};
export default defineComponent({
  components: { importExcel },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const { loading: downloadLoading, setLoading: setDownloadLoading } =
      useLoading(false);
    const perModalVisible = ref<boolean>(false);
    const importModalVisible = ref<boolean>(false);
    const viewOrCreate = ref<boolean>(false);
    const perForm = ref<Personnel>(generateCreatePerFormModel());
    const { t } = useI18n();
    const renderData = ref<Personnel[]>([]);
    // const typeOptions = ref<{ label: string; value: string }[]>([]);
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
    const educationForm = computed({
      get: () => {
        try {
          if (perForm.value && perForm.value.education) {
            return JSON.parse(perForm.value.education);
          }
          return [];
        } catch {
          return [];
        }
      },
      set: (val) => {
        perForm.value.education = JSON.stringify(val);
      },
    });
    const forceSet = () => {
      perForm.value.education = JSON.stringify(educationForm.value);
    };
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
    //  const academicOptions = computed<Options[]>(() => [
    //   {
    //     label: t('本科'),
    //     value: t('personnel.academic.undergraduate'),
    //   },
    //   {
    //     label: t('硕士研究生'),
    //     value: t('personnel.academic.master'),
    //   },
    //   {
    //     label: t('博士研究生'),
    //     value: t('personnel.academic.phd'),
    //   },
    //  ]);
    // const sexOptions = computed<Options[]>(() => [
    //   {
    //     label: t('男'),
    //     value: t('personnel.filterType.boy'),
    //   },
    //   {
    //     label: t('女'),
    //     value: t('personnel.filterType.girl'),
    //   },
    //  ]);
    //   const politicsTypeOptions = computed<Options[]>(() => [
    //   {
    //     label: t('共青团员'),
    //     value: t('personnel.politicsType.gqty'),
    //   },
    //   {
    //     label: t('群众'),
    //     value: t('personnel.politicsType.qz'),
    //   },
    //   {
    //     label: t('共产党员（含预备党员）'),
    //     value: t('personnel.politicsType.zgdy'),
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
        size: pagination.pageSize,
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
      search();
    };

    const handleClickView = (record: Personnel) => {
      perModalVisible.value = true;
      viewOrCreate.value = true;
      perForm.value = JSON.parse(JSON.stringify(record));
      perForm.value.place = textToCode(perForm.value.place);
    };

    const handleDeleteOk = async (item: { id: number }) => {
      setLoading(true);
      deleteUser({
        userId: item.id,
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

    const handleCreatePer = () => {
      perModalVisible.value = true;
      viewOrCreate.value = false;
      perForm.value = generateCreatePerFormModel();
    };
    const isBlank = (s?: string) => {
      return !s || s.trim() === '';
    };
    const handleBeforeOk = (done: any): boolean => {
      if (isBlank(perForm.value.wxAccount)) {
        Message.info('微信号必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.name)) {
        Message.info('姓名必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.home)) {
        Message.info('籍贯必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.place)) {
        Message.info('工作地点必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.detail)) {
        Message.info('详细地址必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.academic)) {
        Message.info('专业必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.education)) {
        Message.info('教育经历必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.marriage)) {
        Message.info('婚姻状况必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.sex)) {
        Message.info('性别必填');
        done(false);
        return false;
      }
      if (perForm.value.nation == null) {
        Message.info('民族必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.phone)) {
        Message.info('电话必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.politics)) {
        Message.info('政治面貌必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.photo)) {
        Message.info('照片必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.post)) {
        Message.info('职称职务必填');
        done(false);
        return false;
      }
      if (perForm.value.fresh == null) {
        Message.info('是否应届必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.mailbox)) {
        Message.info('邮箱必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.work)) {
        Message.info('现工作单位必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.prize)) {
        Message.info('获奖情况必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.introduction)) {
        Message.info('自我介绍必填');
        done(false);
        return false;
      }
      if (isBlank(perForm.value.undergo)) {
        Message.info('个人经历必填');
        done(false);
        return false;
      }
      return true;
    };
    const handleCreatePerOk = async () => {
      setLoading(true);
      // if (Array.isArray(perForm.value.material)) {
      //   perForm.value.material = perForm.value.material.join('');
      // }
      perForm.value.place = codeToText(perForm.value.place).join('/');
      try {
        let data;
        if (viewOrCreate.value) {
          data = await setUserInfo(perForm.value);
          Message.success('修改成功');
        } else {
          data = await addUser(perForm.value);
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
    // const handleCreatePerOk = async () => {
    //   setLoading(true);
    //   if (viewOrCreate.value) {
    //     perForm.value.place = codeToText(perForm.value.place).join('/');
    //     await setUserInfo(perForm.value);
    //     Message.success('修改成功');
    //   } else {
    //     perForm.value.place = codeToText(perForm.value.place).join('/');
    //    await addUser(perForm.value);
    //     Message.success('添加成功');
    //   }
    //   perModalVisible.value = false;
    //   setLoading(false);
    //   search();
    // };
    const parseEducation = (education: string) => {
      try {
        return JSON.parse(education);
      } catch {
        return education;
      }
    };

    const handleClickAddEducation = () => {
      educationForm.value.push({
        inDate: undefined,
        outDate: undefined,
        schoolName: undefined,
      });
      forceSet();
    };
    const handleCreateCancel = () => {
      perModalVisible.value = false;
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
      a.download = '人才信息表.xlsx';
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
      reset,
      cutString,
      isString,
      educationType,
      sexType,
      experienceType,
      politicsType,
      freshType,
      handleClickDelete,
      handleDeleteOk,
      viewOrCreate,
      perModalVisible,
      importModalVisible,
      perForm,
      educationForm,
      forceSet,
      parseEducation,
      handleClickAddEducation,
      handleClickView,
      handleCreatePer,
      handleBeforeOk,
      handleCreatePerOk,
      handleCreateCancel,
      regionOptions,
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
.container {
  padding: 0 20px 20px 20px;
}

.operations {
  display: flex;
}
</style>
