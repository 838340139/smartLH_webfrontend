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
      <a-button type="text" @click="handleClickTemplate">
        点击这里下载模板文件
      </a-button>
      <a-card
        v-if="data"
        title="导入结果"
        style="width: 100%"
        :bordered="false"
      >
        <p>成功：{{ data ? data.successRow.length - (data.duplicateRow!=null?data.duplicateRow.length:0) : '-' }}条</p>
        <p>失败：{{ data ? data.failRow.length : '-' }}条</p>
        <p v-if="data && data.failRow.length > 0">
          以下行解析失败：{{ data ? data.failRow.join(',') : '-' }}
        </p>
        <a-typography-paragraph v-if="data && data.duplicateRow && data.duplicateRow.length > 0">
          以下行与已有数据冲突:
          {{ data ? data.duplicateRow.join(',') : '-' }}
        </a-typography-paragraph>
      </a-card>
    </a-space>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { Message } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';
import config from '@/config/settings.json';
import { exportExcelTemplate as exportPTemp } from '@/api/personnel';
import { exportExcelTemplate as exportOTemp } from '@/api/organization';
import { exportExcelTemplate as exportRTemp } from '@/api/recruitment';

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
      data.value = fileItem.response.data;
    };
    const handleClickTemplate = async () => {
      if (!props.url) return;
      let res;
      let name;
      if (props.url.indexOf('User/') > 0) {
        res = await exportPTemp({});
        name = '人才信息模板文件.xlsx';
      } else if (props.url.indexOf('Organization/') > 0) {
        res = await exportOTemp({});
        name = '单位信息模板文件.xlsx';
      } else if (props.url.indexOf('Recruitment/') > 0) {
        res = await exportRTemp({});
        name = '招聘信息模板文件.xlsx';
      } else return;
      // @ts-ignore
      const blob = new Blob([res], { type: 'application/x-xls' });
      const a = document.createElement('a');
      // 创建URL
      const blobUrl = window.URL.createObjectURL(blob);
      a.download = name;
      a.href = blobUrl;
      document.body.appendChild(a);
      // 下载文件
      a.click();
      // 释放内存
      URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    };
    return {
      importExcelHeader,
      importExcelUrl,
      data,
      handleSuccess,
      handleClickTemplate,
    };
  },
});
</script>

<style scoped lang="less"></style>

<style lang="less"></style>
