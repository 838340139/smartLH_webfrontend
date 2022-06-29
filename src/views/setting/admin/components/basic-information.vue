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
      field="email"
      :label="$t('admin.basicInfo.form.label.email')"
      :rules="[
        {
          required: true,
          message: $t('admin.form.error.email.required'),
        },
      ]"
    >
      <a-input
        v-model="formData.email"
        :placeholder="$t('admin.basicInfo.placeholder.email')"
      />
    </a-form-item>
    <a-form-item
      field="phone"
      :label="$t('admin.basicInfo.form.label.phone')"
      :rules="[
        {
          required: true,
          message: $t('admin.form.error.phone.required'),
        },
      ]"
    >
      <a-input
        v-model="formData.phone"
        :placeholder="$t('admin.basicInfo.placeholder.phone')"
      />
    </a-form-item>
    <a-form-item
      field="password"
      :label="$t('admin.basicInfo.form.label.password')"
      row-class="keep-margin"
    >
      <a-input-password
        v-model="formData.password"
        :disabled="changePasswordDisable"
        :placeholder="$t('admin.basicInfo.placeholder.password')"
      />
      <a-button
        type="text"
        style="margin-left: 10px; width: 8em"
        @click="handleClickChangePassword"
        >{{changePasswordDisable?'修改':'取消修改'}}</a-button
      >
    </a-form-item>
    <a-form-item>
      <a-space>
        <a-button type="primary" @click="validate">
          {{ $t('admin.save') }}
        </a-button>
        <!--        <a-button type="secondary" @click="reset">-->
        <!--          {{ $t('admin.reset') }}-->
        <!--        </a-button>-->
      </a-space>
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { Manager, ManagerType } from '@/types/global';

export default defineComponent({
  setup() {
    const formRef = ref<FormInstance>();
    const formData = ref<Manager>({
      mailbox: '',
      username: '',
      phone: '',
      password: '',
      isManager: ManagerType.superAdmin,
    });
    const changePasswordDisable = ref<boolean>(true);
    const validate = async () => {
      const res = await formRef.value?.validate();
      if (!res) {
        // do some thing
        // you also can use html-type to submit
      }
    };
    const handleClickChangePassword = () => {
      if(changePasswordDisable.value === false){
        formData.value.password = undefined;
      }
      changePasswordDisable.value = !changePasswordDisable.value;
    }
    return {
      formRef,
      formData,
      changePasswordDisable,
      validate,
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
