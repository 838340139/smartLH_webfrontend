<template>
  <div class="container" style="padding: 0 100px;">
    <Breadcrumb :items="['menu.recruitment', '简历']" />
    <personnel :form="resume"></personnel>
  </div>
</template>

<script type="ts">
import { defineComponent, ref} from 'vue';
import personnel from "@/components/personnel/index.vue";
import {
  useRoute,
} from 'vue-router';
import {getByDeliverId} from "@/api/deliver";

export default defineComponent({
  components:{ personnel },
  setup(){
    const route = useRoute();
    const {deliverId} = route.query;
    const resume = ref({});
    const deliver = ref({});
    const fetchData = async ()=>{
      const {data} = await getByDeliverId({deliverId});
      resume.value = data.users['0'];
      deliver.value = data.resumeDeliverList['0'];
    }
    fetchData();
    return {
      resume,
    }
  }
});
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px 20px;
}
</style>
