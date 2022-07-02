<template>
  <div class="container">
    <Breadcrumb :items="['menu.setting', 'menu.setting.admin']" />
    <UserInfoHeader />
    <div class="content">
      <a-row class="wrapper">
        <a-col :span="24">
          <a-tabs default-active-key="1" type="rounded">
            <a-tab-pane key="1" :title="$t('admin.tab.basicInformation')">
              <BasicInformation
                :init-value="userStore"
                :on-submit="handleOnSubmit"
              />
            </a-tab-pane>
            <a-tab-pane
              v-if="userStore.isManager === ManagerType.superAdmin"
              key="2"
              :title="$t('admin.tab.member')"
            >
              <Member />
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Modal, Message } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { Manager, ManagerType } from '@/types/global';
import { setInfo } from '@/api/manager';
import UserInfoHeader from './components/user-info-header.vue';
import Member from './components/member.vue';
import BasicInformation from './components/manager-form.vue';

export default defineComponent({
  components: {
    UserInfoHeader,
    BasicInformation,
    Member,
  },
  setup() {
    const userStore = useUserStore();
    const handleOnSubmit = async (formData: Manager) => {
      const data = await setInfo(formData);
      // @ts-ignore
      if (data.code === 6) {
        Message.success('保存成功');
      }
    };
    return {
      userStore,
      ManagerType,
      handleOnSubmit,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}

.content {
  margin-top: 12px;
}
.wrapper {
  padding: 20px 0 0 20px;
  min-height: 580px;
  background-color: var(--color-bg-2);
  border-radius: 4px;
}
</style>
