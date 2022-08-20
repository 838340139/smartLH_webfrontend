<template>
  <div class="container">
    <Breadcrumb :items="['menu.notice', 'menu.notice.list']" />
    <a-card class="general-card">
      <template #title>
        <a-space
          v-if="
            userStore.role === ManagerType.normalAdmin ||
            userStore.role === ManagerType.superAdmin
          "
          :size="20"
        >
          <a-input-search
            v-model="searchForm.title"
            :placeholder="$t('notice.listSearch.placeholder')"
            style="width: 450px"
            width="200px"
          />
          <a-button type="primary" @click="handleClickSearch"> 搜索 </a-button>
          <a-button @click="handleClickReset"> 重置 </a-button>
        </a-space>
      </template>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :data="dataList"
        :bordered="false"
        @page-change="handlePageChange"
      >
        <template #columns>
          <a-table-column title="消息编号" width="100" data-index="id" />
          <a-table-column
            title="标题"
            data-index="title"
            width="200"
            ellipsis
            tooltip
          />
          <a-table-column title="发布时间" width="200" data-index="sendTime">
          </a-table-column>
          <a-table-column
            title="接收者"
            data-index="receiverInfo"
            ellipsis
            :tooltip="{
              'mouse-enter-delay': 800,
            }"
          >
          </a-table-column>
          <a-table-column title="正文" data-index="content">
            <template #cell="{ record }">
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                  expandable: false,
                  showTooltip: {
                    type: 'tooltip',
                    props: {
                      'mouse-enter-delay': 800,
                      'style': { maxWidth: `500px` },
                    },
                  },
                }"
              >
                {{ getEditorText(record.content) }}
              </a-typography-paragraph>
            </template>
          </a-table-column>
          <a-table-column title="操作" data-index="operations">
            <template #cell="{ record }">
              <a-button
                type="text"
                size="small"
                @click="
                  () => {
                    handleClickDetail(record);
                  }
                "
              >
                详情
              </a-button>
              <a-button
                v-if="
                  userStore.role === ManagerType.normalAdmin ||
                  userStore.role === ManagerType.superAdmin
                "
                type="text"
                status="danger"
                size="small"
                @click="
                  () => {
                    handleClickDelete(record);
                  }
                "
              >
                删除
              </a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
    <a-modal
      v-model:visible="detailModelVisible"
      width="1000px"
      unmount-on-close
      top="100px"
      :hide-cancel="true"
      :mask-closable="false"
    >
      <template #title> 详情 </template>
      <MessageCard
        style="width: 100%"
        :loading="loading"
        :title="detail.title"
        :content="detail.content"
        :type="detail.type"
        :receiver-info="detail.receiverInfo"
        :send-time="detail.sendTime"
      >
      </MessageCard>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { NoticeType, Notice, Pagination, ManagerType } from '@/types/global';
import useLoading from '@/hooks/loading';
import { Modal, Message } from '@arco-design/web-vue';
import noImgSvg from '@/assets/images/no-img.svg';
import MessageCard from '@/views/notice/list/components/message-card.vue';
import { QueryNoticeParams, getNotices, deleteNotices } from '@/api/notice';
import { cutString, getEditorText } from '@/utils/stringUtils';
import { useUserStore } from '@/store';

const generateSearchForm = () => {
  return {
    title: '',
    pageNum: 1,
    size: 2,
  };
};
export default defineComponent({
  components: {
    MessageCard,
  },
  setup() {
    const { loading, setLoading } = useLoading(true);
    const dataList = ref<Notice[]>([]);
    const detailModelVisible = ref<boolean>(false);
    const searchForm = ref<QueryNoticeParams>(generateSearchForm());
    const detail = ref<Notice>({});
    const userStore = useUserStore();
    const basePagination: Pagination = {
      'current': 1,
      'pageSize': 5,
      'total': 0,
      'show-total': true,
      'show-jumper': true,
    };
    const pagination = reactive({
      ...basePagination,
    });

    let fetchIndex = 0;
    const fetchData = async () => {
      setLoading(true);
      fetchIndex += 1;
      const currentFetchIndex = fetchIndex;
      searchForm.value.pageNum = pagination.current;
      searchForm.value.size = pagination.pageSize;
      const { data } = await getNotices({
        ...searchForm.value,
      });
      if (fetchIndex !== currentFetchIndex) return;
      dataList.value = data.list;
      pagination.total = data.total;
      pagination.pageSize = data.size;
      setLoading(false);
    };

    const handleClickSearch = () => {
      fetchData();
    };

    const handleClickReset = () => {
      searchForm.value.title = '';
      pagination.current = 1;
      fetchData();
    };

    const handlePageChange = (val: number) => {
      pagination.current = val;
      fetchData();
    };

    const handleClickDetail = (record: Notice) => {
      detailModelVisible.value = true;
      detail.value = record;
    };

    const handleClickDelete = async (record: Notice) => {
      Modal.warning({
        title: '提醒',
        content: '是否确认删除消息？',
        onOk: async () => {
          if (record.id === undefined) return;
          await deleteNotices({
            noticeId: record.id,
          });
          Message.success('删除成功');
          fetchData();
        },
        onCancel: () => {},
      });
    };

    fetchData();
    return {
      userStore,
      loading,
      dataList,
      noImgSvg,
      searchForm,
      pagination,
      detailModelVisible,
      detail,
      ManagerType,
      cutString,
      getEditorText,
      handleClickSearch,
      handleClickReset,
      handlePageChange,
      handleClickDetail,
      handleClickDelete,
    };
  },
});
</script>

<style scoped lang="less">
.container {
  :deep(.arco-list-content) {
    overflow-x: hidden;
  }

  :deep(.arco-card-meta-title) {
    font-size: 14px;
  }
}
:deep(.arco-list-col) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

:deep(.arco-list-item) {
  width: 33%;
}

:deep(.block-title) {
  margin: 0 0 12px 0;
  font-size: 14px;
}
:deep(.list-wrap) {
  // min-height: 140px;
  .list-row {
    align-items: stretch;
    .list-col {
      margin-bottom: 16px;
    }
  }
  :deep(.arco-space) {
    width: 100%;
    .arco-space-item {
      &:last-child {
        flex: 1;
      }
    }
  }
}
</style>
