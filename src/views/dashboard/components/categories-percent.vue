<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        padding: '20px',
      }"
    >
      <!-- <template #title>
        {{ $t('workplace.categoriesPercent') }}
      </template>-->
      <Chart height="310px" :option="chartOption" /> 
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/loading';
import useChartOption from '@/hooks/chart-option';
import { getTypesCount } from "@/api/dashboard";
import { getTypes } from "@/api/organization";

export default defineComponent({
  setup() {
    const { loading } = useLoading();
    const typeOptions = ref<string[]>([]);
    const typeCounts = ref<{ name: string; value: number }[]>([]);
    const { chartOption } = useChartOption((isDark) => {
      // echarts support https://echarts.apache.org/zh/theme-builder.html
      // It's not used here
      return {
        legend: {
          left: 'center',
          data: [],
          bottom: 0,
          icon: 'circle',
          itemWidth: 8,
          textStyle: {
            color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
          },
          itemStyle: {
            borderWidth: 0,
          },
        },
        tooltip: {
          show: true,
          trigger: 'item',
        },
        graphic: {
          elements: [
            {
              type: 'text',
              left: 'center',
              top: '45%',
              style: {
                text: '单位分布',
                textAlign: 'center',
                fill: isDark ? '#ffffffb3' : '#4E5969',
                fontSize: 14,
              },
            },
          ],
        },
        color : [
          '#2196F3',
          '#3F51B5',
          '#FF5722',
          '#FFC107',
          '#673AB7',
          '#E91E63',
          '#009688',
          '#8BC34A',
          '#CDDC39',
          '#607D8B',
        ],
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            label: {
              formatter: '{b}{d}%',
              fontSize: 14,
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
            },
            itemStyle: {
              borderColor: isDark ? '#232324' : '#fff',
              borderWidth: 1,
            },
            data: typeCounts.value,
            // [
            //   {
            //     value: [148564],
            //     name: '纯文本',
            //     itemStyle: {
            //       color: isDark ? '#3D72F6' : '#249EFF',
            //     },
            //   },
            //   {
            //     value: [334271],
            //     name: '图文类',
            //     itemStyle: {
            //       color: isDark ? '#A079DC' : '#313CA9',
            //     },
            //   },
            //   {
            //     value: [445694],
            //     name: '视频类',
            //     itemStyle: {
            //       color: isDark ? '#6CAAF5' : '#21CCFF',
            //     },
            //   },
            // ],
          },
        ],
      };
    });

    const fetchData = async () => {
      const { data } = await getTypesCount();
      if (data) {
        typeCounts.value = data.map((item)=>{
          return {
            name: item.type,
            value: item.count,
          }
        });
      }
    }
    // const fetchTypeData = async () => {
    //   const { data } = await getTypes();
    //   if (data) {
    //     typeOptions.value = data;
    //   }
    // };
    fetchData();
  //  fetchTypeData();
    return {
      loading,
      chartOption,
    };
  },
});
</script>

<style scoped lang="less"></style>
