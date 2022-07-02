<template>
  <div class="container">
    <Breadcrumb :items="['menu.recruitment', 'menu.recruitment.publish']" />
    <recruitment-form
      :on-submit="handleSubmit"
      submit-text="发布"
    ></recruitment-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import useLoading from '@/hooks/loading';
import { Message } from '@arco-design/web-vue';
import { useRouter } from 'vue-router';
import { addRecruitment } from '@/api/recruitment';
import RecruitmentForm from '@/views/recruitment/components/recruitment-form.vue';
import { Recruitment } from '@/types/global';

export default defineComponent({
  components: {
    RecruitmentForm,
  },
  setup() {
    const { loading, setLoading } = useLoading(false);
    const router = useRouter();
    const handleSubmit = async (item: Recruitment) => {
      const data = await addRecruitment(item);
      // @ts-ignore
      if (data.code === 6) {
        Message.success({
          content: '发布成功',
        });
      }
      router.push({
        name: 'success-recruitment',
      });
    };

    return {
      loading,
      handleSubmit,
    };
  },
});
</script>

<style scoped lang="less"></style>
