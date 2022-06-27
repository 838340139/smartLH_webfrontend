<template>
  <div class="container">
    <Breadcrumb :items="['menu.setting', 'menu.setting.admin']" />
    <UserInfoHeader />
    <div class="content">
      <a-row class="wrapper">
        <a-col :span="24">
          <a-tabs default-active-key="1" type="rounded">
            <a-tab-pane key="1" :title="$t('admin.tab.basicInformation')">
              <BasicInformation />
            </a-tab-pane>
            <a-tab-pane key="2" :title="$t('admin.tab.member')" >
              <MyProject />
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
<!--      <div class="content-left">-->
<!--        <a-space direction="vertical" :size="16" fill>-->
<!--          <LatestActivity />-->
<!--        </a-space>-->
<!--      </div>-->
<!--      <div class="content-right">-->
<!--        <a-space :size="16" direction="vertical" fill>-->
<!--          <Myteam />-->
<!--          <LatestNotification />-->
<!--        </a-space>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useI18n } from 'vue-i18n';
import UserInfoHeader from './components/user-info-header.vue';
import LatestNotification from './components/latest-notification.vue';
import MyProject from './components/member.vue';
import LatestActivity from './components/latest-activity.vue';
import Myteam from './components/my-team.vue';
import BasicInformation from './components/basic-information.vue';

export default defineComponent({
  components: {
    UserInfoHeader,
    BasicInformation,
    MyProject,
  },
  setup() {
    const { t } = useI18n();
    return {

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
