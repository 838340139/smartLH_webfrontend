<template>
  <div style="background: white; padding: 30px 20px">
    <a-row :gutter="20">
      <a-col :span="17">
        <a-typography-title>
          {{ perForm.name }}
        </a-typography-title>
        <a-descriptions title="" align="left">
          <descriptions-item label="电话">{{
            perForm.phone
          }}</descriptions-item>
          <descriptions-item label="微信">{{
            perForm.wxAccount
          }}</descriptions-item>
          <descriptions-item label="邮箱">{{
            perForm.mailbox
          }}</descriptions-item>
          <descriptions-item label="性别">{{ perForm.sex }}</descriptions-item>
          <descriptions-item label="出生日期">{{
            perForm.birthday
          }}</descriptions-item>
          <descriptions-item label="现居地">{{
            perForm.place
          }}</descriptions-item>
        </a-descriptions>
      </a-col>
      <a-col :span="7">
        <a-image v-if="perForm.photo !== undefined && perForm.photo!==null" width="200" :src="perForm.photo" />
        <a-image v-else width="200" height="200" alt="无照片" />
      </a-col>
    </a-row>
    <a-typography>
      <a-typography-title :heading="4" style="margin: 50px 0 30px 0">
        基本信息
      </a-typography-title>
      <a-descriptions title="" align="left">
        <descriptions-item label="学历">{{
          perForm.academic
        }}</descriptions-item>
        <descriptions-item label="专业">{{
          perForm.subject
        }}</descriptions-item>
        <descriptions-item label="毕业时间">{{
          perForm.graduation
        }}</descriptions-item>

        <descriptions-item label="现工作单位"
          >{{ perForm.work }} / {{ perForm.undergo }}</descriptions-item
        >
        <descriptions-item label="职称职务">{{
          perForm.post
        }}</descriptions-item>
        <descriptions-item label="人才类别">{{
          perForm.detail
        }}</descriptions-item>

        <descriptions-item label="民族">{{ perForm.nation }}</descriptions-item>
        <descriptions-item label="婚姻状况">{{
          perForm.marriage
        }}</descriptions-item>
        <descriptions-item label="政治面貌">{{
          perForm.politics
        }}</descriptions-item>
        <descriptions-item label="籍贯">{{ perForm.home }}</descriptions-item>
      </a-descriptions>

      <a-typography-title :heading="4" style="margin: 50px 0 30px 0">
        教育经历
      </a-typography-title>
      <div v-for="(item, index) in educationForm" :key="index">
        <a-space wrap :size="50">
          <span>{{ item.inDate }}</span>
          <span>至</span>
          <span>{{ item.outDate }}</span>
          <span>就读于【{{ item.schoolName }}】</span>
        </a-space>
      </div>

      <a-typography-title :heading="4" style="margin: 50px 0 30px 0">
        获奖情况
      </a-typography-title>
      <a-typography-paragraph>
        {{ perForm.prize }}
      </a-typography-paragraph>

      <a-typography-title :heading="4" style="margin: 50px 0 30px 0">
        自我介绍
      </a-typography-title>
      <a-typography-paragraph>
        {{ perForm.introduction }}
      </a-typography-paragraph>
    </a-typography>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, h } from 'vue';
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
import { regionData } from 'element-china-area-data';
import { Modal, Message } from '@arco-design/web-vue';
import { cutString, isString } from '@/utils/stringUtils';

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
  components: {},
  props: {
    form: {
      type: Object,
      default: generateCreatePerFormModel(),
    },
    submit: {
      type: Function,
      default: () => {},
    },
    cancel: {
      type: Function,
      default: () => {},
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(true);
    const { loading: downloadLoading, setLoading: setDownloadLoading } =
      useLoading(false);
    const perModalVisible = ref<boolean>(false);
    const importModalVisible = ref<boolean>(false);
    const viewOrCreate = ref<boolean>(false);
    const perForm = ref<Personnel>(generateCreatePerFormModel());
    const { t } = useI18n();
    const renderData = ref<Personnel[]>([]);
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
    watch(
      () => props.form,
      () => {
        perForm.value = {};
        Object.assign(perForm.value, props.form);
      }
    );
    const forceSet = () => {
      perForm.value.education = JSON.stringify(educationForm.value);
    };
    const handleClickAddEducation = () => {
      educationForm.value.push({
        inDate: undefined,
        outDate: undefined,
        schoolName: undefined,
      });
      forceSet();
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
        Message.info('人才类别必填');
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

    return {
      loading,
      downloadLoading,
      regionOptions,
      cutString,
      isString,
      educationType,
      sexType,
      experienceType,
      politicsType,
      freshType,
      viewOrCreate,
      perModalVisible,
      importModalVisible,
      perForm,
      educationForm,
      forceSet,
      handleBeforeOk,
      handleClickAddEducation,
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
