<template>
  <div>
    <a-select
      v-model="value"
      :loading="loading"
      placeholder="搜索单位名称"
      :field-names="fieldNames"
      :options="dataList"
      :filter-option="false"
      :allow-search="true"
      @search="handleSearch"
      @dropdown-reach-bottom="handleClickLoadMore"
      @change="handleChange"
      @blur="handleBlur"
    >
    </a-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { OrgListParams, queryOrgList, getOrgInfo } from '@/api/organization';
import { codeToText } from '@/utils/region';
import { Organization } from '@/types/global';

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      type: Number,
      default: undefined,
    },
  },
  emits: ['update:modelValue', 'select'],
  setup(props, context) {
    const { loading, setLoading } = useLoading(true);
    const { loading: loadingMore, setLoading: setLoadingMore } =
      useLoading(false);
    const ifShowList = ref<boolean>(false);
    const dataList = ref<Organization[]>([]);
    const keyword = ref<string>('');
    const fetchSingleOrg = async (params: { orgId: number }) => {
      const org = dataList.value.filter((item) => {
        return item.id === params.orgId;
      });
      if (org.length > 0) return;
      const { data } = await getOrgInfo(params);
      dataList.value = dataList.value.concat(data);
    };
    const value = computed({
      get: () => {
        if (props.modelValue || props.modelValue === 0) {
          fetchSingleOrg({ orgId: props.modelValue });
        }
        return props.modelValue;
      },
      set: (newValue) => {
        context.emit('update:modelValue', newValue);
      },
    });
    const fieldNames = { value: 'id', label: 'name' };
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
    const fetchOrgData = async (params: OrgListParams, ifMore: boolean) => {
      // 地址编码转为文字
      params.orgAddress = codeToText(params.orgAddress).join('/');
      try {
        const { data } = await queryOrgList(params);
        const newData = data.list;
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

    const fetchData = async (ifMore: boolean) => {
      if (ifMore) {
        // console.log('setLoadingMore');
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      await fetchOrgData(
        {
          pageNum: pagination.current,
          size: pagination.pageSize,
          orgName: keyword.value ? keyword.value.trim() : undefined,
        },
        ifMore
      );
      if (ifMore) {
        setLoadingMore(false);
      } else {
        setLoading(false);
      }
    };
    fetchData(false);

    const handleSearch = (item: string) => {
      resetPagination();
      keyword.value = item;
      fetchData(false);
    };

    const handleClickLoadMore = async () => {
      if (pagination.hasNextPage) {
        pagination.current += 1;
        await fetchData(true);
      }
    };

    const handleChange = (id: any) => {
      const selectOrg = dataList.value.filter((item) => {
        return item.id === id;
      });
      context.emit('select', selectOrg[0]);
    };

    const handleBlur = () => {
      if (!keyword.value && !keyword.value.trim()) return;
      keyword.value = '';
      fetchData(false);
    };

    return {
      loading,
      loadingMore,
      ifShowList,
      keyword,
      dataList,
      value,
      fieldNames,
      pagination,
      handleSearch,
      handleClickLoadMore,
      handleChange,
      handleBlur,
    };
  },
});
</script>

<style scoped lang="less">
.container {
}
</style>
