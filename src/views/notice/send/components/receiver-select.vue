<template>
  <div>
    <a-space direction="vertical" align="left" fill>
      <div>
        <a-radio-group
          v-model="receiverType"
          type="button"
          size="large"
          style="margin-bottom: 20px"
          @change="handleReceiverTypeChange"
        >
          <a-radio :value="ReceiverTypeEnum.org">单位</a-radio>
          <a-radio :value="ReceiverTypeEnum.personnel">个人用户</a-radio>
        </a-radio-group>
        <span style="margin-left: 10px">（只允许一种）</span>
      </div>
      <a-checkbox
        v-model="selectAll"
        :value="true"
        style="margin-bottom: 10px"
        @change="handleCheckAllChange"
        >选择{{ selectAllButtonText }}</a-checkbox
      >
      <a-row :gutter="20">
        <a-col :span="10">
          <a-space direction="vertical" fill>
            <a-input
              v-model="keyword"
              :limit="0"
              :disabled="selectAll"
              :placeholder="selectPlaceholder"
              size="large"
              @press-enter="handleSearch"
            >
            </a-input>
            <a-list
              v-show="!selectAll"
              :loading="loading"
              :bordered="false"
              size="small"
              :max-height="300"
            >
              <a-list-item v-for="item in dataList" :key="item.value">
                {{ item.label }}
                <template #actions>
                  <a-button
                    v-if="!item.checked"
                    type="text"
                    size="medium"
                    @click="() => handleClickAdd(item)"
                  >
                    <template #icon>
                      <icon-plus />
                    </template>
                  </a-button>
                  <a-button
                    v-else
                    type="text"
                    size="medium"
                    @click="() => handleClickClose(item)"
                  >
                    <template #icon>
                      <icon-minus />
                    </template>
                  </a-button>
                </template>
              </a-list-item>
              <a-list-item :key="-1">
                <a-button
                  v-if="pagination.hasNextPage"
                  type="text"
                  size="medium"
                  @click="handleClickLoadMore"
                >
                  加载更多
                  <a-spin v-if="loadingMore" />
                </a-button>
              </a-list-item>
            </a-list>
          </a-space>
        </a-col>
        <a-col :span="14">
          <a-card title="已选择：" :bordered="false">
            <a-space wrap>
              <a-tag v-if="selectAll" :key="-1" color="blue" size="large">
                {{ selectAllButtonText }}
              </a-tag>
              <a-tag
                v-for="item of selectReceiver"
                :key="item.value"
                :visible="!selectAll"
                color="blue"
                size="large"
                closable
                @close="handleClickClose(item)"
              >
                {{ item.label }}
              </a-tag>
            </a-space>
          </a-card>
        </a-col>
      </a-row>

      <!--      <a-table-->
      <!--          style="width: 600px"-->
      <!--          row-key="name"-->
      <!--         :data="data"-->
      <!--         :row-selection="{-->
      <!--            type: 'checkbox',-->
      <!--            showCheckedAll: true,-->
      <!--            onlyCurrent: false,-->
      <!--          }"-->
      <!--          v-model:selectedKeys="selectReceiver">-->
      <!--        <template #columns>-->
      <!--          <a-table-column-->
      <!--              title="单位名称"-->
      <!--              data-index="name"-->
      <!--          />-->
      <!--          <a-table-column-->
      <!--              title="单位地址"-->
      <!--              data-index="address"-->
      <!--          />-->
      <!--        </template>-->
      <!--      </a-table>-->
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { useI18n } from 'vue-i18n';
import { OrgListParams, queryOrgList } from '@/api/organization';
import { getUserBySearch, QueryPersonnelParams } from '@/api/notice';
import { codeToText } from '@/utils/region';
import { IconPlus, IconMinus } from '@arco-design/web-vue/es/icon';
import { Modal } from '@arco-design/web-vue';

const ReceiverTypeEnum = {
  org: 'org',
  personnel: 'personnel'
}
export default defineComponent({
  components: { IconPlus, IconMinus },
  emits: ['select'],
  setup(props, context) {
    const { loading, setLoading } = useLoading(false);
    const { loading: loadingMore, setLoading: setLoadingMore } =
      useLoading(false);
    const selectReceiver = ref<{ label?: string; value?: number }[]>([]);
    const selectReceiverMap = ref<any>({});
    const { t } = useI18n();
    const selectAll = ref<boolean>(false);
    const keyword = ref<string>('');
    const dataList = ref<
      { label?: string; value?: number; checked?: boolean }[]
    >([]);
    let dataListIndexCacheMap: any = {};
    const receiverType = ref<string>(ReceiverTypeEnum.org);
    const pagination = reactive({
      current: 1,
      pageSize: 6,
      hasNextPage: true,
      total: 0,
    });
    const resetPagination = () => {
      pagination.current = 1;
      pagination.pageSize = 6;
      pagination.hasNextPage = true;
      pagination.total = 6;
    };
    resetPagination();
    const selectAllButtonText = computed(() => {
      switch (receiverType.value) {
        case ReceiverTypeEnum.org:
          return t('notice.form.selectAllOrg');
        case ReceiverTypeEnum.personnel:
          return t('notice.form.selectAllPersonnel');
        default:
          return '';
      }
    });
    const selectPlaceholder = computed(() => {
      switch (receiverType.value) {
        case ReceiverTypeEnum.org:
          return t('notice.form.selectOrg.placeholder');
        case ReceiverTypeEnum.personnel:
          return t('notice.form.selectPersonnel.placeholder');
        default:
          return '';
      }
    });

    const fetchOrgData = async (params: OrgListParams, ifMore: boolean) => {
      // 地址编码转为文字
      params.orgAddress = codeToText(params.orgAddress).join('/');
      try {
        const { data } = await queryOrgList(params);
        // for(let i=100; i<1000; i+=1){
        //   data.list.push({
        //     name: `option${i}`,
        //     id: i
        //   })
        // }
        const newData = data.list.map((item) => {
          return {
            label: `${item.name}`,
            value: item.id,
            // @ts-ignore
            checked: selectReceiverMap.value[item.id] !== undefined,
          };
        });
        // console.log(newData)
        // console.log(selectReceiverMap.value)
        if (ifMore) {
          dataList.value = dataList.value.concat(newData);
        } else {
          dataList.value = newData;
        }
        pagination.current = data.pageNum;
        pagination.total = data.total;
        pagination.hasNextPage = data.hasNextPage;
      } catch (err) {
        // you can report use errorHandler or other
      }
    };

    const fetchPersonnelData = async (
      params: QueryPersonnelParams,
      ifMore: boolean
    ) => {
      try {
        const { data } = await getUserBySearch(params);
        const newData = data.list.map((item) => {
          return {
            label: `${item.name} ( 电话: ${item.phone} )`,
            value: item.id,
            // @ts-ignore
            checked: selectReceiverMap.value[item.id] !== undefined,
          };
        });
        // console.log(newData)
        // console.log(selectReceiverMap.value)
        if (ifMore) {
          dataList.value = dataList.value.concat(newData);
        } else {
          dataList.value = newData;
        }
        pagination.current = params.pageNum;
        pagination.total = data.total;
        pagination.hasNextPage = data.hasNextPage;
      } catch (err) {
        // you can report use errorHandler or other
      }
    };

    const fetchData = async (ifMore: boolean) => {
      if (ifMore) {
        // console.log('setLoadingMore');
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      if (receiverType.value === ReceiverTypeEnum.org) {
        await fetchOrgData(
          {
            pageNum: pagination.current,
            size: pagination.pageSize,
            orgName: keyword.value.trim() ? keyword.value.trim() : undefined,
          },
          ifMore
        );
      } else {
        const params: QueryPersonnelParams = {
          pageNum: pagination.current,
          size: pagination.pageSize,
        };
        keyword.value = keyword.value.trim();
        if (keyword.value) {
          if (/^\d+$/.test(keyword.value)) {
            params.phone = keyword.value;
          } else {
            params.userName = keyword.value;
          }
        }

        await fetchPersonnelData(params, ifMore);
      }
      if (ifMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    };
    fetchData(false);

    const emitSelectEvent = () => {
      context.emit('select', {
        receivers: selectReceiver.value,
        type: receiverType.value,
        all: selectAll.value,
      });
    };

    const handleReceiverTypeChange = (value: any) => {
      const reset = () => {
        selectReceiver.value = [];
        selectReceiverMap.value = {};
        dataList.value = [];
        keyword.value = '';
        resetPagination();
        fetchData(false);
        emitSelectEvent();
      };
      if (selectReceiver.value.length <= 0) {
        reset();
        return;
      }
      Modal.info({
        title: '提示',
        content: '切换将丢失已选择的发送对象，是否继续？',
        onOk: () => {
          reset();
        },
        hideCancel: false,
        onCancel: () => {
          receiverType.value =
            value === ReceiverTypeEnum.org
              ? ReceiverTypeEnum.personnel
              : ReceiverTypeEnum.org;
        },
      });
    };

    const handleCheckAllChange = () => {
      emitSelectEvent();
    };

    const handleClickAdd = (item: any) => {
      // console.log(selectReceiverMap.value);
      if (!selectReceiverMap.value[item.value]) {
        item.checked = true;
        selectReceiverMap.value[item.value] = item;
        selectReceiver.value.push(item);
      }
      emitSelectEvent();
    };

    const handleSearch = (item: string) => {
      resetPagination();
      fetchData(false);
    };

    const handleClickLoadMore = async () => {
      if (pagination.hasNextPage) {
        pagination.current += 1;
        await fetchData(true);
      }
    };
    const handleClickClose = (item: any) => {
      const resetCache = () => {
        dataListIndexCacheMap = {};
        dataList.value.forEach((dataItem: any, i: number) => {
          dataListIndexCacheMap[dataItem.value] = i;
        });
      };

      // 从已选中删除
      let index;
      selectReceiver.value.forEach((selectItem, i) => {
        if (selectItem.value === item.value) {
          index = i;
        }
      });
      if (index !== undefined) {
        selectReceiverMap.value[item.value] = undefined;
        selectReceiver.value.splice(index, 1);
      }

      // 置checked为false
      let index2 = dataListIndexCacheMap[item.value];
      if (
        index2 === undefined ||
        dataList.value[index2] === undefined ||
        dataList.value[index2].value !== item.value
      ) {
        resetCache();
      }
      index2 = dataListIndexCacheMap[item.value];
      if (
        index2 !== undefined &&
        dataList.value[index2] !== undefined &&
        dataList.value[index2].value === item.value
      ) {
        dataList.value[index2].checked = false;
      }
      emitSelectEvent();
    };

    return {
      loading,
      loadingMore,
      ReceiverTypeEnum,
      keyword,
      dataList,
      pagination,
      selectAll,
      receiverType,
      selectReceiver,
      selectReceiverMap,
      selectAllButtonText,
      selectPlaceholder,
      handleReceiverTypeChange,
      handleCheckAllChange,
      handleSearch,
      handleClickLoadMore,
      handleClickAdd,
      handleClickClose,
    };
  },
});
</script>

<style scoped lang="less">
.container {
}

.steps {
  max-width: 548px;
  margin: 0 auto 10px;
}
</style>
