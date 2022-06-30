<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '16px' }">
      <template #title>
        {{ $t('dataAnalysis.regionAnalysis') }}
      </template>
      <Chart style="width: 100%; height: 370px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/loading';
import { queryContentPeriodAnalysis } from '@/api/visualization';
import { ToolTipFormatterParams } from '@/types/echarts';
import useChartOption from '@/hooks/chart-option';

const tooltipItemsHtmlString = (items: ToolTipFormatterParams[]) => {
  return items
    .map(
      (el) => `<div class="content-panel">
        <p>
          <span style="background-color: ${el.color}" class="tooltip-item-icon"></span>
          <span>${el.seriesName}</span>
        </p>
        <span class="tooltip-value">
        ${el.value}%
        </span>
      </div>`
    )
    .join('');
};

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true);
    const xAxis = ref<string[]>([]);
    const textChartsData = ref<number[]>([]);
    const imgChartsData = ref<number[]>([]);
    const videoChartsData = ref<number[]>([]);
    const { chartOption } = useChartOption((isDark) => {
      return {
        grid: {
          left: 40,
          right: 30,
          top: 0,
          bottom: 80,
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: true,
            formatter(value: number, idx: number) {
              if (idx === 0) return String(value);
              return `${Number(value) / 1000}k`;
            },
          },
          splitLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#E5E8EF',
            },
          },
        },
        xAxis: {
          type: 'category',
          data: [
            '北京市',
            '天津市',
            '上海市',
            '重庆市',
            '河北省',
            '河南省',
            '云南省',
            '辽宁省',
            '黑龙江省',
            '湖南省',
            '安徽省',
            '山东省',
            '新疆维吾尔',
            '江苏省',
            '浙江省',
            '江西省',
            '湖北省',
            '广西壮族',
            '甘肃省',
            '山西省',
            '内蒙古',
            '陕西省',
            '吉林省',
            '福建省',
            '贵州省',
            '广东省',
            '青海省',
            '西藏',
            '四川省',
            '宁夏回族',
            '海南省',
            '台湾省',
            '香港特别行政区',
            '澳门特别行政区'
          ],
          axisLabel: {
            show: true,
            color: '#4E5969',
            rotate: -60
          },
          axisTick: {
            show: true,
            length: 10,
            lineStyle: {
              color: '#A9AEB8',
            },
            alignWithLabel: true,
          },
          axisLine: {
            lineStyle: {
              color: isDark ? '#484849' : '#A9AEB8',
            },
          },
        },
        tooltip: {
          show: true,
          trigger: 'axis',
        },
        series: [
          {
            data: [
              1033, 1244, 1520, 1033, 1244, 1520, 1033, 1244, 1520, 1520, 1033,
              1244, 1520, 1033, 1244, 1520, 1033, 1244, 1520, 1033, 1033, 1244,
              1520, 1033, 1244, 1520, 1033, 1244, 1520, 1033, 1244, 1520, 1033,
              1244, 1520, 1033,
            ],
            type: 'bar',
            barWidth: 7,
            itemStyle: {
              color: '#4086FF',
              borderRadius: 4,
            },
          },
        ],
      };
    });
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: chartData } = await queryContentPeriodAnalysis();
        xAxis.value = chartData.xAxis;
        chartData.data.forEach((el) => {
          if (el.name === '纯文本') {
            textChartsData.value = el.value;
          } else if (el.name === '图文类') {
            imgChartsData.value = el.value;
          }
          videoChartsData.value = el.value;
        });
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return {
      loading,
      chartOption,
    };
  },
});
</script>

<style scoped lang="less">
.chart-box {
  width: 100%;
  height: 400px;
}
</style>
