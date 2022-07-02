<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    auto-label-width
    :label-col-props="{ span: 4 }"
    :wrapper-col-props="{ span: 16 }"
  >
    <a-form-item
      field="username"
      :label="$t('admin.basicInfo.form.label.username')"
      :rules="[
        {
          required: true,
          message: $t('admin.form.error.username.required'),
        },
      ]"
    >
      <a-input
        v-model="formData.username"
        :placeholder="$t('admin.basicInfo.placeholder.username')"
      />
    </a-form-item>
    <a-form-item
      field="password"
      :label="$t('admin.basicInfo.form.label.password')"
      row-class="keep-margin"
    >
      <a-input-password
        :key="passwordFinalDisable"
        v-model="formData.password"
        :disabled="passwordFinalDisable"
        :placeholder="$t('admin.basicInfo.placeholder.password')"
      />
      <a-button
        v-if="passwordInputState === passwordInputStateEnum.selective"
        type="text"
        style="margin-left: 10px; width: 8em"
        @click="handleClickChangePassword"
        >{{ ifChangePassword ? '修改' : '取消修改' }}</a-button
      >
    </a-form-item>
    <a-form-item field="email" :label="$t('admin.basicInfo.form.label.email')">
      <a-input
        v-model="formData.mailbox"
        :placeholder="$t('admin.basicInfo.placeholder.email')"
      />
    </a-form-item>
    <a-form-item field="phone" :label="$t('admin.basicInfo.form.label.phone')">
      <a-input
        v-model="formData.phone"
        :placeholder="$t('admin.basicInfo.placeholder.phone')"
      />
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" :loading="loading" @click="handleSubmit">
          {{ submitText }}
        </a-button>
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref, watch, computed } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { Manager, ManagerType } from '@/types/global';
import useLoading from '@/hooks/loading';
import { useUserStore } from '@/store';

const generateForm = () => {
  return {
    mailbox: undefined,
    username: undefined,
    phone: undefined,
    password: undefined,
    isManager: undefined,
  };
};

export default defineComponent({
  props: {
    initValue: {
      type: Object,
      default: generateForm(),
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
      default: () => true,
    },
    passwordInputState: {
      type: String,
      default: 'selective',
    },
  },
  setup(props) {
    const { loading, setLoading } = useLoading(false);
    const formRef = ref<FormInstance>();
    const userStore = useUserStore();
    const formData = ref<Manager>(props.initValue);
    watch(
      () => props.initValue,
      () => {
        formData.value = {};
        Object.assign(formData.value, props.initValue);
      }
    );
    const ifChangePassword = ref<boolean>(true);
    const passwordInputStateEnum = {
      selective: 'selective',
      disable: 'disable',
      enable: 'enable',
    };
    const passwordFinalDisable = computed(() => {
      if (props.passwordInputState === passwordInputStateEnum.disable)
        return true;
      if (props.passwordInputState === passwordInputStateEnum.enable)
        return false;
      return ifChangePassword;
    });
    const handleSubmit = async () => {
      const res = await formRef.value?.validate();
      if (!props.validate(formData.value)) {
        return;
      }
      if (!res) {
        setLoading(true);
        try {
          if (passwordFinalDisable.value) {
            formData.value.password = undefined;
          }
          await props.onSubmit(formData.value);
        } finally {
          setLoading(false);
        }
      }
    };
    const handleClickChangePassword = () => {
      if (ifChangePassword.value === false) {
        formData.value.password = undefined;
      }
      ifChangePassword.value = !ifChangePassword.value;
      console.log(passwordFinalDisable.value);
    };
    return {
      loading,
      formRef,
      formData,
      ifChangePassword,
      passwordFinalDisable,
      passwordInputStateEnum,
      handleSubmit,
      handleClickChangePassword,
    };
  },
});
</script>

<style scoped lang="less">
.form {
  width: 540px;
  margin: 20px auto;
}
</style>
