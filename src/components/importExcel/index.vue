<template>
  <div style="width: 100%">
    <a-space direction="vertical" fill align="center">
      <a-upload
        :action="importExcelUrl"
        :headers="importExcelHeader"
        name="file"
        :show-remove-button="false"
        @success="handleSuccess"
      >
        <template #upload-button>
          <a-button> 上传文件 </a-button>
        </template>
      </a-upload>
      <a-card v-if="data" title="导入结果" style="width: 100%" :bordered="false">
        <p>成功：{{ data ? data.successRow.length : '-' }}条</p>
        <p>失败：{{ data ? data.failRow.length : '-' }}条</p>
        <p v-if="data && data.failRow.length>0">
          以下行解析失败：{{ data ? data.failRow.join(',') : '-' }}
        </p>
      </a-card>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';
import config from '@/config/settings.json';

export default defineComponent({
  components: {},
  props: {
    url: {
      type: String,
    },
  },
  setup(props) {
    const importExcelHeader = {
      'X-Token': getToken(),
    };
    const importExcelUrl = `${config.baseUrl}${props.url}`;
    const data = ref<any>();
    const handleSuccess = (fileItem: any) => {
      console.log(fileItem.response);
      data.value = fileItem.response.data;
    };
    return {
      importExcelHeader,
      importExcelUrl,
      data,
      handleSuccess,
    };
  },
});
</script>

<style scoped lang="less"></style>

<style lang="less"></style>
