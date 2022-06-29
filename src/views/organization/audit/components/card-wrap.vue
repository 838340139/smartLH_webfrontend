<template>
  <div class="card-wrap">
    <a-card v-if="loading" :bordered="false" hoverable>
      <slot name="skeleton"></slot>
    </a-card>
    <a-card v-else :bordered="false" hoverable :body-style="{ width: '100%' }">
      <a-space align="start">
        <a-card-meta>
          <template #title>
            <a-typography-text style="margin-right: 10px">
              {{ name }}
            </a-typography-text>
            <template v-if="showTag">
              <a-tag v-if="tagType === 'success'" size="small" color="green">
                <template #icon>
                  <icon-check-circle-fill />
                </template>
                <span>{{ tagText }}</span>
              </a-tag>
              <a-tag v-else-if="tagType === 'danger'" size="small" color="red">
                <template #icon>
                  <icon-check-circle-fill />
                </template>
                <span>{{ tagText }}</span>
              </a-tag>
            </template>
          </template>
          <template #description>
            <a-descriptions
              style="margin-top: 20px; height: 17em"
              :data="[
                {
                  label: '单位性质',
                  value: type,
                },
                {
                  label: '单位地址',
                  value: address,
                },
                {
                  label: '联系电话',
                  value: phone,
                },
                {
                  label: isAudited ? '审核时间' : '申请时间',
                  value: auditTime,
                },
                {
                  label: '简介',
                  value: cutString(introduction, 25),
                },
              ]"
              size="large"
              title=""
              :column="1"
            />
            <slot></slot>
          </template>
        </a-card-meta>
      </a-space>
      <template #actions>
        <a-button v-if="onDetail" type="primary" @click="onDetail">
          详情
        </a-button>
        <a-button v-if="onPass" type="primary" status="success" @click="onPass">
          通过
        </a-button>
        <a-button
          v-if="onReject"
          type="primary"
          status="danger"
          @click="onReject"
        >
          不通过
        </a-button>
      </template>
    </a-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useToggle } from '@vueuse/core';
import { cutString } from '@/utils/stringUtils';

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    isAudited: {
      type: Boolean,
      default: true,
    },
    auditTime: {
      type: String,
      default: null,
    },
    introduction: {
      type: String,
      default: '',
    },
    defaultValue: {
      type: Boolean,
      default: false,
    },
    onPass: {
      type: Function,
      default: null,
    },
    onDetail: {
      type: Function,
      default: null,
    },
    onReject: {
      type: Function,
      default: null,
    },
    icon: {
      type: String,
      default: '',
    },
    showTag: {
      type: Boolean,
      default: true,
    },
    tagText: {
      type: String,
      default: '',
    },
    tagType: {
      type: String,
      default: 'success',
    },
  },
  setup(props) {
    const [open, toggle] = useToggle(props.defaultValue);
    return {
      open,
      cutString,
      toggle,
    };
  },
});
</script>

<style scoped lang="less">
.card-wrap {
  height: 100%;
  transition: all 0.3s;
  border: 1px solid var(--color-neutral-3);
  border-radius: 4px;
  &:hover {
    //transform: translateY(-4px);
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.1);
  }
  :deep(.arco-card) {
    height: 100%;
    border-radius: 4px;
    .arco-card-body {
      height: 100%;
      .arco-space {
        width: 100%;
        height: 100%;
        .arco-space-item {
          height: 100%;
          &:last-child {
            flex: 1;
          }
          .arco-card-meta {
            height: 100%;
            display: flex;
            flex-flow: column;
            .arco-card-meta-content {
              flex: 1;
              .arco-card-meta-description {
                margin-top: 8px;
                color: rgb(var(--gray-6));
                line-height: 20px;
                font-size: 12px;
              }
            }
            .arco-card-meta-footer {
              margin-top: 0;
            }
          }
        }
      }
    }
  }
  :deep(.arco-card-meta-title) {
    display: flex;
    align-items: center;

    // To prevent the shaking
    line-height: 28px;
  }
  :deep(.arco-skeleton-line) {
    &:last-child {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
  }
  :deep(.arco-card-meta) {
    width: 100%;
  }
}
</style>
