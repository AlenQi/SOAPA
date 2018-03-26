<template>
  <Card>
    <p slot="title" class="card-title">
      <Icon type="ios-shuffle-strong"></Icon>
      Agent操作系统概要信息
    </p>
    <div class="block" id="data_source_con"></div>
  </Card>
</template>

<script>
import SourceOperationResource from '@/resources/SourceOperationResource'
import echarts from 'echarts'

export default {
  name: 'agent-chart',
  data() {
    return {
      summary: {}
    }
  },
  mounted() {
    SourceOperationResource.queryAgentSummary().then(response => {
      if (response.data.status) {
        this.summary = response.data.agent_summary
        this.renderChart()
      } else {
        this.$Message.error(response.data.desc)
      }
    })
  },
  methods: {
    renderChart() {
      var dataSourcePie = echarts.init(document.getElementById('data_source_con'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['Active', 'Disconnected', 'NeverConnected']
        },
        xAxis: {
          type: 'category',
          data: ['Active', 'Disconnected', 'NeverConnected']
        },
        yAxis: [
          {
            type: 'value',
            min: 0,
            interval: 1
          }
        ],
        series: [
          {
            name: 'Agent操作系统概要信息',
            data: [
              {
                value: this.summary.Active,
                name: 'Active',
                itemStyle: {
                  normal: {
                    color: '#9bd598'
                  }
                }
              },
              {
                value: this.summary.Disconnected,
                name: 'android',
                itemStyle: {
                  normal: {
                    color: '#e14f60'
                  }
                }
              },
              {
                value: this.summary.NeverConnected,
                name: 'pc',
                itemStyle: {
                  normal: {
                    color: '#abd5f2'
                  }
                }
              }
            ],
            type: 'bar'
          }
        ]
      }
      dataSourcePie.setOption(option)
      window.addEventListener('resize', function() {
        dataSourcePie.resize()
      })
    }
  }
}
</script>

<style scoped="scoped">
.block {
  width: 100%;
  height: 300px;
  padding: 20px;
  background: #fff !important;
}
</style>
