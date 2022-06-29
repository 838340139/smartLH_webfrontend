<template>
  <a-card class="general-card" :title="$t('admin.member.title')">
        <template #extra>
          <a-button type="primary">
            <template #icon>
              <icon-plus />
            </template>
            添加管理员
          </a-button>
        </template>
    <a-row :gutter="16">
      <a-col
        v-for="(member, index) in memberList"
        :key="index"
        :span="8"
        class="my-project-item"
      >
        <a-card :body-style="{padding:'10px 20px', minHeight: '50px'}">
          <template #actions>
            <a-button type="text">修改</a-button>
            <a-button type="text" status="danger">删除</a-button>
          </template>
          <a-skeleton v-if="loading" :loading="loading" :animation="true">
            <a-skeleton-line :rows="3" />
          </a-skeleton>
<!--          <a-descriptions v-else :data="data" title="User Info" :column="{xs:1, md:3, lg:4}">-->
<!--            <a-descriptions-item v-for="item of data" :label="item.label">-->
<!--              <a-tag>{{ item.value }}</a-tag>-->
<!--            </a-descriptions-item>-->
<!--          </a-descriptions>-->
          <a-space direction="vertical">
            <a-typography-text type="secondary">
              用户名：{{ member.username }}
            </a-typography-text>
            <a-typography-text type="secondary">
              邮箱：{{ member.mailbox }}
            </a-typography-text>
            <a-typography-text type="secondary">
              电话：{{ member.phone }}
            </a-typography-text>
            <a-typography-text type="secondary">
              密码：******
            </a-typography-text>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { Manager, ManagerType } from '@/types/global';
import useLoading from "@/hooks/loading";
import { IconPlus } from '@arco-design/web-vue/es/icon';

export default defineComponent({
  components:{ IconPlus },
  setup() {
    const memberList = ref<Manager[]>([]);
    const { loading, setLoading } = useLoading(false);
    memberList.value.push({
      id: 1,
      mailbox: '838340139@qq.com',
      username: '罗小超',
      phone: '7879',
      password: '',
      isManager: ManagerType.normalAdmin,
    });
    return {
      loading,
      memberList,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-card-body) {
  min-height: 128px;
  padding-bottom: 0;
}
.my-project {
  &-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &-title {
    margin-top: 0 !important;
    margin-bottom: 18px !important;
  }

  &-list {
    display: flex;
    justify-content: space-between;
  }

  &-item {
    // padding-right: 16px;
    margin-bottom: 16px;

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
