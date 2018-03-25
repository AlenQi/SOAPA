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
      Active: 2,
      Disconnected: 0,
      neverConnected: 0
    }
  },
  created() {
    SourceOperationResource.queryAgentSummary().then(response => {
      if (response.data.status) {
        console.log(response.data.agent_summary)
      } else {
        this.$Message.error(response.data.desc)
      }
    })
  },
  mounted() {
    this.$nextTick(() => {
      var dataSourcePie = echarts.init(document.getElementById('data_source_con'))
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '访问来源',
            data: [
              {
                value: 2103456,
                name: 'ios',
                itemStyle: {
                  normal: {
                    color: '#9bd598'
                  }
                }
              },
              {
                value: 1305923,
                name: 'android',
                itemStyle: {
                  normal: {
                    color: '#ffd58f'
                  }
                }
              },
              {
                value: 543250,
                name: 'pc',
                itemStyle: {
                  normal: {
                    color: '#abd5f2'
                  }
                }
              },
              {
                value: 798403,
                name: 'web',
                itemStyle: {
                  normal: {
                    color: '#ab8df2'
                  }
                }
              },
              {
                value: 302340,
                name: 'others',
                itemStyle: {
                  normal: {
                    color: '#e14f60'
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
    })
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
