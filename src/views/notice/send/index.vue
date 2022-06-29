<template>
  <div class="container">
    <Breadcrumb :items="['menu.notice', 'menu.notice.send']" />
    <a-space direction="vertical" :size="16" fill>
      <a-card class="general-card" :title="$t('notice.form.title')">
        <a-input
          v-model="noticeForm.notice.title"
          placeholder="请输入标题"
          :max-length="30"
          size="large"
          allow-clear
          show-word-limit
        />
      </a-card>
      <a-card class="general-card" :title="$t('notice.form.content')">
        <editor v-model="noticeForm.notice.content"></editor>
      </a-card>
      <a-card
        class="general-card"
        :title="$t('notice.form.receiver')"
        :body-style="{ paddingBottom: '20px' }"
      >
        <receiver-select @select="handledSelectReceiver"></receiver-select>
      </a-card>
      <a-card class="general-card">
        <div style="text-align: center; padding: 30px 0 10px">
          <a-button
            type="primary"
            size="large"
            :loading="loading"
            @click="handleClickSend"
            >发送</a-button
          >
        </div>
      </a-card>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useLoading from '@/hooks/loading';
import editor from '@/components/editor/index.vue';
import { Notice, NoticeType } from '@/types/global';
import { SendNoticeParams, sendMessage } from '@/api/notice';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import { cutString } from '@/utils/stringUtils';
import receiverSelect from './components/receiver-select.vue';

const generateNoticeForm = () => {
  return {
    notice: {
      managerId: undefined,
      content: '',
      type: undefined,
      sendTime: undefined,
      title: '',
    },
    receiverIds: [],
  };
};
interface SelectReceiverRes {
  receivers: { value: number; label: string }[];
  all: boolean;
  type: string;
}

export default defineComponent({
  components: {
    editor,
    receiverSelect,
  },
  setup() {
    const { loading, setLoading } = useLoading(false);
    const router = useRouter();
    const noticeForm = ref<SendNoticeParams>(generateNoticeForm());
    const selectReceiverResCache = ref<SelectReceiverRes>();
    const handledSelectReceiver = (params: SelectReceiverRes) => {
      selectReceiverResCache.value = params;
    };

    const generateReceiver = (params?: SelectReceiverRes) => {
      if (params === undefined) return;
      const { receivers, all, type } = params;
      if (all && type === 'org') {
        noticeForm.value.notice.type = NoticeType.massOrg;
        noticeForm.value.notice.receiverInfo = '@全部单位';
        noticeForm.value.receiverIds = undefined;
      } else if (all && type === 'personnel') {
        noticeForm.value.notice.type = NoticeType.massPersonnel;
        noticeForm.value.notice.receiverInfo = '@全部个人用户';
        noticeForm.value.receiverIds = undefined;
      } else if (!all) {
        noticeForm.value.receiverIds = receivers.map((item) => {
          return item.value;
        });
        noticeForm.value.notice.receiverInfo = receivers
          .map((item) => {
            return `@${item.label}`.replace(/\s+/g, '');
          })
          .join('');
        noticeForm.value.notice.receiverInfo = cutString(
          noticeForm.value.notice.receiverInfo,
          500
        );
        if (type === 'org') {
          noticeForm.value.notice.type = NoticeType.privateOrg;
        } else {
          noticeForm.value.notice.type = NoticeType.privatePersonnel;
        }
      }
    };

    const handleClickSend = async () => {
      generateReceiver(selectReceiverResCache.value);
      if (
        !noticeForm.value.notice.title ||
        !noticeForm.value.notice.title.trim()
      ) {
        Message.info('请填写标题');
        return;
      }
      if (!noticeForm.value.notice.content) {
        Message.info('请填写内容');
        return;
      }
      if (noticeForm.value.notice.type === undefined) {
        Message.info('请选择发送对象');
        return;
      }
      setLoading(true);
      sendMessage(noticeForm.value)
        .then((data) => {
          // @ts-ignore
          if (data.code === 6) {
            Message.success('发送成功');
            router.push({
              name: 'sendSuccess',
            });
          } else {
            Message.success('发送失败');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    return {
      loading,
      noticeForm,
      NoticeType,
      handledSelectReceiver,
      handleClickSend,
    };
  },
});
</script>

<style scoped lang="less"></style>
