<template>
  <a-card class="general-card" :title="$t('admin.member.title')">
    <template #extra>
      <a-button type="primary" @click="handleClickCreate">
        <template #icon>
          <icon-plus />
        </template>
        创建管理员
      </a-button>
    </template>
    <a-empty v-if="memberList.length === 0"></a-empty>
    <a-card :loading="loading" :bordered="false">
      <a-row :gutter="16">
        <a-col
          v-for="(member, index) in memberList"
          :key="index"
          :span="8"
          class="my-project-item"
        >
          <a-card :body-style="{ padding: '10px 20px', minHeight: '50px' }">
            <template #actions>
              <a-button type="text" @click="handleClickChange(member)"
                >修改</a-button
              >
              <a-button
                type="text"
                status="danger"
                @click="handleClickDelete(member)"
                >删除</a-button
              >
            </template>
            <a-skeleton v-if="loading" :loading="loading" :animation="true">
              <a-skeleton-line :rows="3" />
            </a-skeleton>
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
    <a-modal v-model:visible="modalVisible" width="50%" :mask-closable="false">
      <template #title>{{
        form.id || form.id === 0 ? '修改' : '创建管理员'
      }}</template>
      <template #footer><span></span></template>
      <manager-form
        :init-value="form"
        submit-text="保存"
        :on-submit="handleOnSubmit"
        :password-input-state="
          form.id || form.id === 0 ? 'selective' : 'enable'
        "
      >
      </manager-form>
    </a-modal>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { Manager, ManagerType } from '@/types/global';
import useLoading from '@/hooks/loading';
import { IconPlus } from '@arco-design/web-vue/es/icon';
import { addManager, deleteManager, getAll, setInfo } from '@/api/manager';
import { useUserStore } from '@/store';
import { Modal, Message } from '@arco-design/web-vue';
import ManagerForm from '@/views/setting/admin/components/manager-form.vue';

export default defineComponent({
  components: { ManagerForm, IconPlus },
  setup() {
    const memberList = ref<Manager[]>([]);
    const { loading, setLoading } = useLoading(false);
    const modalVisible = ref<boolean>(false);
    const form = ref<Manager>({});
    const userStore = useUserStore();
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await getAll();
        memberList.value = data.filter((item) => {
          return item.id !== userStore.id;
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    const handleClickCreate = () => {
      form.value = {};
      modalVisible.value = true;
    };
    const handleClickChange = (item: Manager) => {
      form.value = item;
      modalVisible.value = true;
    };
    const handleClickDelete = async (item: any) => {
      Modal.info({
        title: '提醒',
        content: '是否确认删除？',
        onOk: async () => {
          const data = await deleteManager({ id: item.id });
          // @ts-ignore
          if (data.code === 6) {
            Message.success('删除成功');
            fetchData();
          }
        },
      });
    };
    const handleOnSubmit = async (item: Manager) => {
      if (item.id || item.id === 0) {
        const data = await setInfo(item);
        // @ts-ignore
        if (data.code === 6) {
          Message.success('保存成功');
          modalVisible.value = false;
          fetchData();
        }
      } else {
        const data = await addManager(item);
        // @ts-ignore
        if (data.code === 6) {
          Message.success('创建成功');
          modalVisible.value = false;
          fetchData();
        }
      }
    };
    return {
      loading,
      modalVisible,
      memberList,
      form,
      handleClickCreate,
      handleClickChange,
      handleClickDelete,
      handleOnSubmit,
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
