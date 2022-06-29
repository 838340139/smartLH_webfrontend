<template>
  <a-card
    class="general-card"
    :title="$t('workplace.todoWork')"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 0px 40px 0px' }"
  >
    <!--    <template #extra>-->
    <!--      <a-link>{{ $t('workplace.quickOperation.setup') }}</a-link>-->
    <!--    </template>-->
    <a-list :bordered="false" :loading="loading">
      <a-list-item v-for="(link, index) in links" :key="index">
        <a-list-item-meta :description="link.title">
          <template #avatar>
            <TodoSvg style="width: 25px; height: 25px; margin-bottom: 0" />
          </template>
        </a-list-item-meta>
        <template #actions>
          <a-button
            type="text"
            size="mini"
            @click="
              () => {
                handleClick(link);
              }
            "
            >去处理</a-button
          >
        </template>
      </a-list-item>
    </a-list>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TodoSvg from '@/assets/images/todo.svg';
import { getToDoWork } from '@/api/dashboard';
import useLoading from '@/hooks/loading';
import { useRouter } from 'vue-router';

interface Link{
  title: string;
  redirection: string
}
export default defineComponent({
  components: {
    TodoSvg,
  },
  setup() {
    const { loading, setLoading } = useLoading();
    const router = useRouter();
    const links = ref<Link[]>([]);
    const fetchData = async () => {
      setLoading(true);
      getToDoWork()
        .then(({ data }) => {
          if (data.toAuditOrg) {
            links.value.push({
              title: `单位信息审核，待处理${data.toAuditOrg}条`,
              redirection: 'audit',
            });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
    const handleClick = (item:Link) => {
      router.push({
        name: item.redirection,
      });
    };
    return {
      loading,
      links,
      handleClick,
    };
  },
});
</script>

<style scoped lang="less"></style>
