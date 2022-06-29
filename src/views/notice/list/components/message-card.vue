<template>
  <div>
    <a-card
      :loading="loading"
      :hoverable="false"
      :bordered="false"
      class="general-card"
      :body-style="{
        padding: '10px 20px 15px',
        position: 'relative',
        height: '500px',
      }"
    >
      <div class="label-container">
        <span>标题</span>
        <span>{{ title }}</span>
      </div>
      <div class="label-container">
        <span>接收者</span>
        <span>{{ receiverInfo }}</span>
      </div>
      <div class="label-container">
        <span>发布时间</span>
        <span>{{ sendTime }} </span>
      </div>
      <p
        style="padding: 10px 20px; background: #fafafa; min-height: 400px"
        v-html="content"
      ></p>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { cutString } from '@/utils/stringUtils';

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    content: {
      type: String,
      default: '',
    },
    sendTime: {
      type: String,
      default: '',
    },
    receiverInfo: {
      type: String,
      default: '',
    },
    type: {
      type: Number,
      default: undefined,
    },
    onDelete: {
      type: Function,
      default: null,
    },
  },
  setup(props) {
    const calcTextLength = (value: string) => {
      value = value.replace(/\s*/g, ''); // 去掉空格
      value = value.replace(/<[^>]+>/g, ''); // 去掉所有的html标记
      value = value.replace(/↵/g, ''); // 去掉所有的↵符号
      value = value.replace(/[\r\n]/g, ''); // 去掉回车换行
      value = value.replace(/&nbsp;/g, ''); // 去掉空格
      return value.length;
    };
    const isExpand = ref<boolean>(false);
    const contentLength = computed(() => {
      return calcTextLength(props.content);
    });
    const handleEllipsisChange = (val: boolean) => {
      console.log(val);
      isExpand.value = val;
    };
    return {
      cutString,
      contentLength,
      isExpand,
      handleEllipsisChange,
    };
  },
});
</script>

<style scoped lang="less">
.label-container {
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
}
.label-container > *:nth-child(1) {
  width: 80px;
  font-size: 15px;
  padding: 5px;
  background: #3f51b5;
  color: white;
  text-align: center;
  margin-right: 10px;
}

.label-container > *:nth-child(2) {
  flex: 1;
  font-size: 15px;
}
</style>
