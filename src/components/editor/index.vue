<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="height: 350px; overflow-y: hidden"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
      @customInsert="customInsert"
    />
  </div>
</template>

<script lang="tsx">
import {
  defineComponent,
  computed,
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
} from 'vue';
import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

import config from '@/config/settings.json';

type InsertFnType = (url: string, alt: string, href: string) => void;

export default defineComponent({
  components: { Editor, Toolbar },
  props: {
    modelValue: {
      type: String,
    },
  },
  emits: ['update:modelValue'],
  setup(props, context) {
    const valueHtml = computed({
      get: () => {
        return props.modelValue;
      },
      set: (newValue) => {
        // console.log(newValue)
        context.emit('update:modelValue', newValue);
      },
    });
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef();

    // 内容 HTML
    // const valueHtml = ref('');

    // 模拟 ajax 异步获取内容
    onMounted(() => {
      setTimeout(() => {
        valueHtml.value = '';
      }, 1500);
    });

    const toolbarConfig = {
      excludeKeys: [
        'insertVideo',
        'uploadVideo',
        'editVideoSize',
        'uploadImage',
        'insertImage',
        'deleteImage',
        'editImage',
        'viewImageLink',
      ],
    };
    const editorConfig: any = { placeholder: '请输入内容...', MENU_CONF: {} };

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value;
      if (editor == null) return;
      editor.destroy();
    });

    const handleCreated = (editor: any) => {
      editorRef.value = editor; // 记录 editor 实例，重要！
      console.log(editor)
      console.log(editor.getConfig())
      console.log(editor.getAllMenuKeys())
    };

    const customCheckImageFn = (
      src: string,
      alt: string,
      url: string
    ): boolean | undefined | string => {
      if (!src) {
        return;
      }
      if (src.indexOf('http') !== 0) {
        // eslint-disable-next-line consistent-return
        return '图片网址必须以 http/https 开头';
      }
      // eslint-disable-next-line consistent-return
      return true;

      // 返回值有三种选择：
      // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
      // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
      // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
    };

    const customInsert = (res: any, insertFn: InsertFnType) => {
      // res 即服务端的返回结果

      // 从 res 中找到 url alt href ，然后插图图片
      console.log(res);
      insertFn('http://12', '', '');
    };

    editorConfig.MENU_CONF.insertImage = {
      checkImage: customCheckImageFn,
    };

    editorConfig.MENU_CONF.uploadImage = {
      server: config.imageUploadUrl,

      // form-data fieldName ，默认值 'wangeditor-uploaded-image'
      fieldName: 'file',

      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 0.5 * 1024 * 1024, // 1M

      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,

      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/*'],

      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      meta: {
      },

      // 将 meta 拼接到 url 参数中，默认 false
      metaWithUrl: false,

      // 自定义增加 http  header
      headers: {
        Accept: 'application/json, text/plain, */*',
      },

      // 跨域是否传递 cookie ，默认为 false
      withCredentials: true,

      // 超时时间，默认为 10 秒
      timeout: 5 * 1000, // 5 秒
    };

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      customInsert,
    };
  },
});
</script>

<style scoped></style>
