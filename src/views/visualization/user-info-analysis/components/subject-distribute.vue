<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :title="$t('dataAnalysis.subjectDistribution')"
    >
      <Chart style="width: 100%; height: 300px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useLoading from '@/hooks/loading';
import useChartOption from '@/hooks/chart-option';

export default defineComponent({
  setup() {
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
          data: [
            '计算机类',
            '土木类',
            '法学类',
            '化学类',
            '心理学类',
            '海洋工程类',
            '建筑类',
            '临床医学类',
            '其他',
          ],
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
                text: '专业',
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
            data: [
              {
                value: [864],
                name: '计算机类',
                itemStyle: {
                  color: '#249EFF',
                },
              },
              {
                value: [771],
                name: '土木类',
                itemStyle: {
                  color: '#846BCE',
                },
              },
              {
                value: [694],
                name: '法学类',
                itemStyle: {
                  color: '#21CCFF',
                },
              },
              {
                value: [594],
                name: '化学类',
                itemStyle: {
                  color: '#0E42D2',
                },
              },
              {
                value: [494],
                name: '心理学类',
                itemStyle: {
                  color: '#009688',
                },
              },
              {
                value: [394],
                name: '海洋工程类',
                itemStyle: {
                  color: '#E91E63',
                },
              },
              {
                value: [245],
                name: '建筑类',
                itemStyle: {
                  color: '#FFEB3B',
                },
              },
              {
                value: [154],
                name: '临床医学类',
                itemStyle: {
                  color: '#FF9800',
                },
              },
              {
                value: [644],
                name: '其他',
                itemStyle: {
                  color: '#86DF6C',
                },
              },
            ],
          },
        ],
      };
    });
    const { loading } = useLoading(false);
    return {
      chartOption,
      loading,
    };
  },
});
</script>

<style scoped lang="less"></style>
