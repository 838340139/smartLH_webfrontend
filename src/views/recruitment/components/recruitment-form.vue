<template>
  <div class="container">
    <a-space direction="vertical" :size="16" fill>
      <a-card class="general-card" title="招聘标题">
        <a-input
          v-model="recruitmentForm.title"
          placeholder="请输入招聘标题"
          :max-length="30"
          size="large"
          allow-clear
          show-word-limit
        />
      </a-card>
      <a-card class="general-card" title="职位信息">
        <a-form :model="recruitmentForm" auto-label-width label-align="right">
          <a-row>
            <a-col :span="8">
              <a-form-item label="招聘单位" required>
                <org-select
                  v-model="recruitmentForm.orgId"
                  style="width: 90%"
                  @select="handleSelectOrg"
                ></org-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="position" label="招聘岗位" required>
                <a-input
                  v-model="recruitmentForm.position"
                  placeholder="请输入"
                  :max-length="30"
                  style="width: 90%"
                  size="medium"
                  allow-clear
                  show-word-limit
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="薪资水平">
                <div style="display: flex; align-items: center">
                  <a-input
                    v-model="recruitmentForm.salaryFloor"
                    placeholder="薪资下限"
                    :max-length="30"
                    style="flex: 1"
                    size="medium"
                    allow-clear
                  />
                  <icon-minus></icon-minus>
                  <a-input
                    v-model="recruitmentForm.salaryCell"
                    placeholder="薪资上限"
                    :max-length="30"
                    style="flex: 1"
                    size="medium"
                    allow-clear
                  />
                </div>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item field="place" label="工作地点" required>
                <a-input
                  v-model="recruitmentForm.place"
                  placeholder="请输入"
                  :max-length="30"
                  style="width: 90%"
                  size="medium"
                  allow-clear
                  show-word-limit
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="number" label="招聘人数">
                <a-input
                  v-model="recruitmentForm.number"
                  placeholder="如:3~5人、若干"
                  style="width: 90%"
                  size="medium"
                  allow-clear
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item field="content" label="岗位职责" required>
                <a-textarea
                  v-model="recruitmentForm.content"
                  :max-length="300"
                  :placeholder="contentPlaceholder"
                  allow-clear
                  style="height: 200px"
                  show-word-limit
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>
      <a-card class="general-card" title="应聘要求">
        <a-form :model="recruitmentForm" auto-label-width label-align="right">
          <a-row>
            <a-col :span="16">
              <a-form-item label="招聘对象" required>
                <a-input
                  v-model="recruitmentForm.fresh"
                  placeholder="如：20xx届毕业生、有工作经验者优先等"
                  style="width: 90%"
                  size="medium"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="16">
              <a-form-item label="专业要求" required>
                <a-input
                  v-model="recruitmentForm.subject"
                  placeholder="如：xx专业、xx专业"
                  style="width: 90%"
                  size="medium"
                />
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item field="education" label="学历要求" required>
                <a-select
                  v-model="recruitmentForm.education"
                  :options="educationType"
                  placeholder="请选择"
                >
                  <a-option value="不限">不限</a-option>
                </a-select>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="8">
              <a-form-item field="age" label="年龄要求">
                <a-input
                  v-model="recruitmentForm.age"
                  placeholder="如：xx岁以下"
                  style="width: 90%"
                  size="medium"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="24">
              <a-form-item label="岗位要求" required>
                <a-textarea
                  v-model="recruitmentForm.remark"
                  :placeholder="remarkPlaceholder"
                  :max-length="300"
                  allow-clear
                  style="height: 200px"
                  show-word-limit
                />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-card>

      <a-card class="general-card">
        <div style="text-align: center; padding: 30px 0 10px">
          <a-button
            type="primary"
            size="large"
            :loading="loading"
            @click="handleClickSubmit"
            >{{ submitText }}</a-button
          >
        </div>
      </a-card>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import useLoading from '@/hooks/loading';
import editor from '@/components/editor/index.vue';
import { Message } from '@arco-design/web-vue';
import { Recruitment, educationType, Organization } from '@/types/global';
import { IconMinus } from '@arco-design/web-vue/es/icon';
import orgSelect from './org-select.vue';

const generateRecForm = () => {
  return {
    orgId: undefined,
    orgName: undefined,
    position: undefined,
    number: undefined,
    age: undefined,
    subject: undefined,
    fresh: undefined,
    education: undefined,
    place: undefined,
    politics: undefined,
    remark: undefined,
    title: undefined,
    content: undefined,
    salaryFloor: undefined,
    salaryCell: undefined,
  };
};
const validate = (form: Recruitment) => {
  if (!form.title || !form.title.trim()) {
    Message.info({
      content: '请填写标题',
    });
    return false;
  }
  if (form.orgId === undefined) {
    Message.info({
      content: '请选择招聘单位',
    });
    return false;
  }
  if (!form.position || !form.position.trim()) {
    Message.info({
      content: '请填写招聘岗位',
    });
    return false;
  }
  if (!form.place || !form.place.trim()) {
    Message.info({
      content: '请填写工作地点',
    });
    return false;
  }
  if (!form.content || !form.content.trim()) {
    Message.info({
      content: '请填写岗位职责',
    });
    return false;
  }
  if (!form.fresh || !form.fresh.trim()) {
    Message.info({
      content: '请填写招聘对象',
    });
    return false;
  }
  if (!form.subject || !form.subject.trim()) {
    Message.info({
      content: '请填写专业要求',
    });
    return false;
  }
  if (!form.education || !form.education.trim()) {
    Message.info({
      content: '请填写学历要求',
    });
    return false;
  }
  if (!form.remark || !form.remark.trim()) {
    Message.info({
      content: '请填写岗位要求',
    });
    return false;
  }
  return true;
};
export default defineComponent({
  components: {
    orgSelect,
    IconMinus,
  },
  props: {
    initValue: {
      type: Object,
      default: generateRecForm(),
    },
    onSubmit: {
      type: Function,
      default: () => {},
    },
    submitText: {
      type: String,
      default: '保存',
    },
    validate: {
      type: Function,
      default: validate,
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(false);
    const recruitmentForm = ref<Recruitment>(generateRecForm());
    watch(
      () => props.initValue,
      () => {
        recruitmentForm.value = {};
        Object.assign(recruitmentForm.value, props.initValue);
      }
    );
    const remarkPlaceholder = `1.xxx \n2.xxx \n3.xxx`;
    const contentPlaceholder = `1.xxx \n2.xxx \n3.xxx`;
    const handleClickSubmit = async () => {
      if (!props.validate(recruitmentForm.value)) {
        return;
      }
      setLoading(true);
      try {
        await props.onSubmit(recruitmentForm.value);
      } finally {
        setLoading(false);
      }
    };
    const handleSelectOrg = (value: Organization) => {
      recruitmentForm.value.orgId = value.id;
      recruitmentForm.value.orgName = value.name;
    };

    return {
      loading,
      educationType,
      remarkPlaceholder,
      contentPlaceholder,
      recruitmentForm,
      handleClickSubmit,
      handleSelectOrg,
    };
  },
});
</script>

<style scoped lang="less"></style>
