<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px',
      }"
      :title="$t('workplace.visit.dailyChange')"
    >
      <template #extra>
        <!--        <a-link>{{ $t('workplace.viewMore') }}</a-link>-->
      </template>
      <Chart height="289px" :option="chartOption" />
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { graphic } from 'echarts';
import useLoading from '@/hooks/loading';
import {
  queryContentData,
  ContentDataRecord,
  Visit,
  PeriodVisit,
  getRecentVisit,
} from '@/api/dashboard';
import useChartOption from '@/hooks/chart-option';
import { ToolTipFormatterParams } from '@/types/echarts';
import { AnyObject } from '@/types/global';
import { periodDate } from '@/utils/dateUtils';

function graphicFactory(side: AnyObject) {
  return {
    type: 'text',
    bottom: '8',
    ...side,
    style: {
      text: '',
      textAlign: 'center',
      fill: '#4E5969',
      fontSize: 12,
    },
  };
}
export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading(true);
    const xAxis = ref<string[]>([]);
    const perChartsData = ref<number[]>([]);
    const orgChartsData = ref<number[]>([]);
    // const chartsData = ref<number[]>([]);
    const graphicElements = ref([
      graphicFactory({ left: '2.6%' }),
      graphicFactory({ right: 0 }),
    ]);
    const { chartOption } = useChartOption(() => {
      return {
        grid: {
          left: '2.6%',
          right: '0',
          top: '10',
          bottom: '30',
        },
        xAxis: {
          type: 'category',
          offset: 2,
          data: xAxis.value,
          boundaryGap: false,
          axisLabel: {
            color: '#4E5969',
            formatter(value: number, idx: number) {
              if (idx === 0) return '';
              if (idx === xAxis.value.length - 1) return '';
              return `${value}`;
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: true,
            interval: (idx: number) => {
              if (idx === 0) return false;
              if (idx === xAxis.value.length - 1) return false;
              return true;
            },
            lineStyle: {
              color: '#E5E8EF',
            },
          },
          axisPointer: {
            show: true,
            lineStyle: {
              color: '#23ADFF',
              width: 2,
            },
          },
        },
        legend: {
          data: ['个人', '单位'],
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisLabel: {
            formatter(value: any, idx: number) {
              if (idx === 0) return value;
              return `${value}k`;
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: '#E5E8EF',
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          className: 'echarts-tooltip-diy',
        },
        graphic: {
          elements: graphicElements.value,
        },
        series: [
          {
            data: perChartsData.value,
            name: '个人',
            type: 'line',
            smooth: true,
            // symbol: 'circle',
            symbolSize: 12,
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderWidth: 2,
              },
            },
            lineStyle: {
              width: 3,
              color: new graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: 'rgba(30, 231, 255, 1)',
                },
                {
                  offset: 0.5,
                  color: 'rgba(36, 154, 255, 1)',
                },
                {
                  offset: 1,
                  color: 'rgba(111, 66, 251, 1)',
                },
              ]),
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(17, 126, 255, 0.16)',
                },
                {
                  offset: 1,
                  color: 'rgba(17, 128, 255, 0)',
                },
              ]),
            },
          },
          {
            data: orgChartsData.value,
            type: 'line',
            name: '单位',
            smooth: true,
            // symbol: 'circle',
            symbolSize: 12,
            emphasis: {
              focus: 'series',
              itemStyle: {
                borderWidth: 2,
              },
            },
            lineStyle: {
              width: 3,
              color: new graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: '#FFEB3B',
                },
                {
                  offset: 0.5,
                  color: '#FFC107',
                },
                {
                  offset: 1,
                  color: '#FF5722',
                },
              ]),
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: new graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(17, 126, 255, 0.16)',
                },
                {
                  offset: 1,
                  color: 'rgba(17, 128, 255, 0)',
                },
              ]),
            },
          },
        ],
      };
    });
    const fetchData = async () => {
      setLoading(true);
      try {
        const {
          data: { intervalDay, from, to, list },
        } = await getRecentVisit();
        const fromDate = from.split(' ')[0];
        const toDate = to.split(' ')[0];
        // const dateList = periodDate(fromDate, toDate, intervalDay);
        // console.log(dateList);
        list.sort((v1, v2) => {
          return v1.visitTime > v2.visitTime ? 1 : -1;
        });
        list.forEach((item) => {
          xAxis.value.push(item.visitTime);
          orgChartsData.value.push(item.orgVisit);
          perChartsData.value.push(item.userVisit);
        });
        // console.log(xAxis.value);
        // console.log(orgChartsData.value);
        // console.log(perChartsData.value);
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

<style scoped lang="less"></style>
