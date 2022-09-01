<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :title="$t('dataAnalysis.educationDistribution')"
    >
      <Chart style="width: 100%; height: 300px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref} from 'vue';
import useLoading from '@/hooks/loading';
import useChartOption from '@/hooks/chart-option';
import { getEducationTypesCount } from "@/api/dashboard";

export default defineComponent({
  setup() {
    const { loading } = useLoading();
    const getEducationTypesCount = ref<{ name: string; value: number }[]>([]);
    const { chartOption } = useChartOption((isDark) => {
      const graphicElementStyle = {
        textAlign: 'center',
        fill: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969',
        fontSize: 14,
        lineWidth: 10,
        fontWeight: 'bold',
      };
      return {
        legend: {
          left: 'center',
          data: [],
          bottom: 0,
          icon: 'circle',
          itemWidth: 8,
          textStyle: {
            color: isDark ? 'rgba(255,255,255,0.7)' : '#4E5969',
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
              left: '50%',
              top: '40%',
              style: {
                text: '学历分布',
                ...graphicElementStyle,
              },
            }
          ],
        },
        series: [
          {
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['52%', '40%'],
            label: {
              formatter: '{b}{d}% ',
              color: isDark ? 'rgba(255, 255, 255, 0.7)' : '#4E5969',
            },
            itemStyle: {
              borderColor: isDark ? '#000' : '#fff',
              borderWidth: 1,
            },
            data: getEducationTypesCount.value,
            // data: [
            //   {
            //     value: [148564],
            //     name: '博士研究生',
            //     itemStyle: {
            //       color: '#249EFF',
            //     },
            //   },
            //   {
            //     value: [334271],
            //     name: '硕士研究生',
            //     itemStyle: {
            //       color: '#846BCE',
            //     },
            //   },
            //   {
            //     value: [445694],
            //     name: '本科',
            //     itemStyle: {
            //       color: '#21CCFF',
            //     },
            //   },
            //   {
            //     value: [445694],
            //     name: '大专',
            //     itemStyle: {
            //       color: '#0E42D2',
            //     },
            //   },
            //   {
            //     value: [445694],
            //     name: '中专',
            //     itemStyle: {
            //       color: '#009688',
            //     },
            //   },
            //   {
            //     value: [445694],
            //     name: '高中',
            //     itemStyle: {
            //       color: '#E91E63',
            //     },
            //   },
            //   {
            //     value: [445694],
            //     name: '初中',
            //     itemStyle: {
            //       color: '#FFEB3B',
            //     },
            //   },
            //   {
            //     value: [445694],
            //     name: '小学',
            //     itemStyle: {
            //       color: '#FF9800',
            //     },
            //   },
            //   {
            //     value: [445694],
            //     name: '其他',
            //     itemStyle: {
            //       color: '#86DF6C',
            //     },
            //   },
            // ],
          },
        ],
      };
    });
      const fetchData = async () => {
      const { data } = await getEducationTypesCount();
      if (data) {
        getEducationTypesCount.value = data.map((item)=>{
          return {
            name: item.type,
            value: item.count,
          }
        });
      }
    }
    // const { loading } = useLoading(false);
    fetchData();
    return {
      chartOption,
      loading,
    };
  },
});
</script>

<style scoped lang="less"></style>
