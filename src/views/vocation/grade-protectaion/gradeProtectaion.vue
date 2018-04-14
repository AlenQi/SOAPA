<template>
<div class="research-table">
  <row class="system">
    <i-col span="4" class="system-name br">01 系统名称</i-col>
    <i-col span="20">
      <row>
        <i-col span="12" class="system-name br">
          <i-input v-model="suchAsPaul.name" placeholder="请输入系统名称"></i-input>
        </i-col>
        <i-col span="12">
          <row>
            <i-col span="12" class="system-name br">
              02 系统编号
            </i-col>
            <i-col span="12" class="system-name">
              <i-input :disabled="idEdit" v-model="suchAsPaul.num" placeholder="请输入系统编号" style=""></i-input>
            </i-col>
          </row>
        </i-col>
      </row>
    </i-col>
  </row>
  <row class="business">
    <i-col span="4" class="system-business br">
      <row>
        <i-col span="8" class="system-case br">03 系统承载业务情况</i-col>
        <i-col span="16">
          <row>
            <i-col span="24" class="business-type">业务类型</i-col>
            <i-col span="24" class="business-descripe">业务描述</i-col>
          </row>
        </i-col>
      </row>
    </i-col>
    <i-col span="20">
      <row>
        <i-col span="24" class="type-select">
          <RadioGroup v-model="suchAsPaul.businessType">
            <Radio label="生产作业"></Radio>
            <Radio label="指挥调度"></Radio>
            <Radio label="管理控制"></Radio>
            <Radio label="内部办公"></Radio>
            <Radio label="公共服务"></Radio>
            <Radio label="其它"></Radio>
          </RadioGroup>
        </i-col>
        <i-col span="24">
          <i-input v-model="suchAsPaul.desc" type="textarea" :autosize="{minRows: 3,maxRows: 4}"></i-input>
        </i-col>
      </row>
    </i-col>
  </row>
  <row class="business">
    <i-col span="4" class="system-business br">
      <row>
        <i-col span="8" class="system-case br">04 系统服务情况</i-col>
        <i-col span="16">
          <row>
            <i-col span="24" class="business-type">服务范围</i-col>
            <i-col span="24" class="business-descripe">服务情况</i-col>
          </row>
        </i-col>
      </row>
    </i-col>
    <i-col span="20">
      <row>
        <i-col span="24" class="type-select">
          <RadioGroup v-model="suchAsPaul.serviceScope">
            <Radio label="全国"></Radio>
            <Radio label="全省（区、市）"></Radio>
            <Radio label="跨省（区、市）"></Radio>
            <Radio label="地（市、区）内"></Radio>
            <Radio label="跨地（市、区）"></Radio>
            <Radio label="其它"></Radio>
          </RadioGroup>
        </i-col>
        <i-col span="24" class="serve-descripe">
          <RadioGroup v-model="suchAsPaul.serviceSituation">
            <Radio label="单位内部人员"></Radio>
            <Radio label="社会公众人员"></Radio>
            <Radio label="两者均包括"></Radio>
            <Radio label="地（市、区）内"></Radio>
            <Radio label="跨地（市、区）"></Radio>
            <Radio label="其它"></Radio>
          </RadioGroup>
        </i-col>
      </row>
    </i-col>
  </row>
  <row class="business">
    <i-col span="4" class="system-business br">
      <row>
        <i-col span="8" class="system-case br">05 系统网络平台</i-col>
        <i-col span="16">
          <row>
            <i-col span="24" class="business-type">覆盖范围</i-col>
            <i-col span="24" class="business-descripe">网络性质</i-col>
          </row>
        </i-col>
      </row>
    </i-col>
    <i-col span="20">
      <row>
        <i-col span="24" class="type-select">
          <RadioGroup v-model="suchAsPaul.coverageRange">
            <Radio label="局域网"></Radio>
            <Radio label="城域网"></Radio>
            <Radio label="广域网"></Radio>
            <Radio label="其它"></Radio>
          </RadioGroup>
        </i-col>
        <i-col span="24" class="serve-descripe">
          <RadioGroup v-model="suchAsPaul.networkProperties">
            <Radio label="业务专网"></Radio>
            <Radio label="互联网"></Radio>
            <Radio label="其它"></Radio>
          </RadioGroup>
        </i-col>
      </row>
    </i-col>
  </row>
  <row class="system">
    <i-col span="4" class="system-name br">06 系统互联情况</i-col>
    <i-col span="20" class="interconnection-descripe">
      <RadioGroup v-model="suchAsPaul.systemInterconnection">
        <Radio label="与其他行业系统连接"></Radio>
        <Radio label="与本行业其他单位系统连接"></Radio>
        <Radio label="与本单位其他系统连接"></Radio>
        <Radio label="其它"></Radio>
      </RadioGroup>
    </i-col>
  </row>
  <row class="employ">
    <i-col span="4" class="employ-name br">07 关键产品使用情况</i-col>
    <i-col span="20" class="product-descripe">
      <row>
        <i-col span="24" class="product-header">
          <row>
            <i-col span="2" class="product-hr br">序号</i-col>
            <i-col span="5" class="product-hr br">产品类型</i-col>
            <i-col span="3" class="product-hr br">数量</i-col>
            <i-col span="14">
              <row>
                <i-col span="24" class="employ-china"> 使用国产品率</i-col>
                <!-- <i-col span="24">
                  <row>
                    <i-col span="7" class="employ-china-num br">全部使用</i-col>
                    <i-col span="7" class="employ-china-num br">全部未使用</i-col>
                    <i-col span="10" class="employ-china-num">部分使用及使用率</i-col>
                  </row>
                </i-col> -->
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">1</i-col>
            <i-col span="5" class="content-hr br">安全专用产品</i-col>
            <i-col span="3" class="content-hr br">
              <i-input v-model="suchAsPaul.useCounts[0]" style="margin-top:-3px;"></i-input>
            </i-col>
            <i-col span="14">
              <row style="padding:4px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.usageRate[0]">
                    <Radio label="全部使用"></Radio>
                    <Radio label="全部未使用"></Radio>
                    <Radio label="部分使用及使用率"></Radio>
                    <span><i-input v-model="suchAsPaul.percent[0]" class="input-num"></i-input></span>%
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">2</i-col>
            <i-col span="5" class="content-hr br">网络产品</i-col>
            <i-col span="3" class="content-hr br">
              <i-input v-model="suchAsPaul.useCounts[1]" style="margin-top:-3px;"></i-input>
            </i-col>
            <i-col span="14">
              <row style="padding:4px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.usageRate[1]">
                    <Radio label="全部使用"></Radio>
                    <Radio label="全部未使用"></Radio>
                    <Radio label="部分使用及使用率"></Radio>
                    <span><i-input v-model="suchAsPaul.percent[1]" class="input-num"></i-input></span>%
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">3</i-col>
            <i-col span="5" class="content-hr br">操作系统</i-col>
            <i-col span="3" class="content-hr br">
              <i-input v-model="suchAsPaul.useCounts[2]" style="margin-top:-3px;"></i-input>
            </i-col>
            <i-col span="14">
              <row style="padding:4px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.usageRate[2]">
                    <Radio label="全部使用"></Radio>
                    <Radio label="全部未使用"></Radio>
                    <Radio label="部分使用及使用率"></Radio>
                    <span><i-input v-model="suchAsPaul.percent[2]" class="input-num"></i-input></span>%
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">4</i-col>
            <i-col span="5" class="content-hr br">数据库</i-col>
            <i-col span="3" class="content-hr br">
              <i-input v-model="suchAsPaul.useCounts[3]" style="margin-top:-3px;"></i-input>
            </i-col>
            <i-col span="14">
              <row style="padding:4px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.usageRate[3]">
                    <Radio label="全部使用"></Radio>
                    <Radio label="全部未使用"></Radio>
                    <Radio label="部分使用及使用率"></Radio>
                    <span><i-input v-model="suchAsPaul.percent[3]" class="input-num"></i-input></span>%
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">5</i-col>
            <i-col span="5" class="content-hr br">服务器</i-col>
            <i-col span="3" class="content-hr br">
              <i-input v-model="suchAsPaul.useCounts[4]" style="margin-top:-3px;"></i-input>
            </i-col>
            <i-col span="14">
              <row style="padding:4px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.usageRate[4]">
                    <Radio label="全部使用"></Radio>
                    <Radio label="全部未使用"></Radio>
                    <Radio label="部分使用及使用率"></Radio>
                    <span><i-input v-model="suchAsPaul.percent[4]" class="input-num"></i-input></span>%
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content-end">
          <row>
            <i-col span="2" class="content-hr br">6</i-col>
            <i-col span="5" class="content-hr br">其它</i-col>
            <i-col span="3" class="content-hr br">
              <i-input v-model="suchAsPaul.useCounts[5]" style="margin-top:-3px;"></i-input>
            </i-col>
            <i-col span="14">
              <row style="padding:4px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.usageRate[5]">
                    <Radio label="全部使用"></Radio>
                    <Radio label="全部未使用"></Radio>
                    <Radio label="部分使用及使用率"></Radio>
                    <span><i-input v-model="suchAsPaul.percent[5]" class="input-num"></i-input></span>%
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
      </row>
    </i-col>
  </row>
  <row class="employ">
    <i-col span="4" class="employ-name-steal br">08 系统采用服务情况</i-col>
    <i-col span="20" class="product-descripe">
      <row>
        <i-col span="24" class="product-header">
          <row>
            <i-col span="2" class="product-hr br">序号</i-col>
            <i-col span="8" class="product-hr br">服务类型</i-col>
            <i-col span="14">
              <row>
                <i-col span="24" class="employ-china"> 服务责任方类型</i-col>
                <!-- <i-col span="24">
                  <row>
                    <i-col span="7" class="employ-china-num br">本行业（单位）</i-col>
                    <i-col span="7" class="employ-china-num br">国内其他服务商</i-col>
                    <i-col span="10" class="employ-china-num">国外服务商</i-col>
                  </row>
                </i-col> -->
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">1</i-col>
            <i-col span="5" class="content-hr br">等级测评</i-col>
            <i-col span="3" class="content-hr br">
              <RadioGroup v-model="suchAsPaul.social[0]">
                <Radio label="有"></Radio>
                <Radio label="无"></Radio>
              </RadioGroup>
            </i-col>
            <i-col span="14">
              <row style="padding:6px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.dutyType[0]">
                    <Radio label="本行业（单位）"></Radio>
                    <Radio label="国内其他服务商"></Radio>
                    <Radio label="国外服务商"></Radio>
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">2</i-col>
            <i-col span="5" class="content-hr br">风险评估</i-col>
            <i-col span="3" class="content-hr br">
              <RadioGroup v-model="suchAsPaul.social[1]">
                <Radio label="有"></Radio>
                <Radio label="无"></Radio>
              </RadioGroup>
            </i-col>
            <i-col span="14">
              <row style="padding:6px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.dutyType[1]">
                    <Radio label="本行业（单位）"></Radio>
                    <Radio label="国内其他服务商"></Radio>
                    <Radio label="国外服务商"></Radio>
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">3</i-col>
            <i-col span="5" class="content-hr br">灾难恢复</i-col>
            <i-col span="3" class="content-hr br">
              <RadioGroup v-model="suchAsPaul.social[2]">
                <Radio label="有"></Radio>
                <Radio label="无"></Radio>
              </RadioGroup>
            </i-col>
            <i-col span="14">
              <row style="padding:6px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.dutyType[2]">
                    <Radio label="本行业（单位）"></Radio>
                    <Radio label="国内其他服务商"></Radio>
                    <Radio label="国外服务商"></Radio>
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">4</i-col>
            <i-col span="5" class="content-hr br">应急响应</i-col>
            <i-col span="3" class="content-hr br">
              <RadioGroup v-model="suchAsPaul.social[3]">
                <Radio label="有"></Radio>
                <Radio label="无"></Radio>
              </RadioGroup>
            </i-col>
            <i-col span="14">
              <row style="padding:6px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.dutyType[3]">
                    <Radio label="本行业（单位）"></Radio>
                    <Radio label="国内其他服务商"></Radio>
                    <Radio label="国外服务商"></Radio>
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">5</i-col>
            <i-col span="5" class="content-hr br">系统集成</i-col>
            <i-col span="3" class="content-hr br">
              <RadioGroup v-model="suchAsPaul.social[4]">
                <Radio label="有"></Radio>
                <Radio label="无"></Radio>
              </RadioGroup>
            </i-col>
            <i-col span="14">
              <row style="padding:6px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.dutyType[4]">
                    <Radio label="本行业（单位）"></Radio>
                    <Radio label="国内其他服务商"></Radio>
                    <Radio label="国外服务商"></Radio>
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">6</i-col>
            <i-col span="5" class="content-hr br">安全咨询</i-col>
            <i-col span="3" class="content-hr br">
              <RadioGroup v-model="suchAsPaul.social[5]">
                <Radio label="有"></Radio>
                <Radio label="无"></Radio>
              </RadioGroup>
            </i-col>
            <i-col span="14">
              <row style="padding:6px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.dutyType[5]">
                    <Radio label="本行业（单位）"></Radio>
                    <Radio label="国内其他服务商"></Radio>
                    <Radio label="国外服务商"></Radio>
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content">
          <row>
            <i-col span="2" class="content-hr br">7</i-col>
            <i-col span="5" class="content-hr br">安全培训</i-col>
            <i-col span="3" class="content-hr br">
              <RadioGroup v-model="suchAsPaul.social[6]">
                <Radio label="有"></Radio>
                <Radio label="无"></Radio>
              </RadioGroup>
            </i-col>
            <i-col span="14">
              <row style="padding:6px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.dutyType[6]">
                    <Radio label="本行业（单位）"></Radio>
                    <Radio label="国内其他服务商"></Radio>
                    <Radio label="国外服务商"></Radio>
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
        <i-col span="24" class="product-content-end">
          <row>
            <i-col span="2" class="content-hr br">8</i-col>
            <i-col span="8" class="content-hr br">
              其它
            </i-col>
            <i-col span="14">
              <row style="padding:6px 30px;">
                <i-col span="24">
                  <RadioGroup v-model="suchAsPaul.dutyType[7]">
                    <Radio label="本行业（单位）"></Radio>
                    <Radio label="国内其他服务商"></Radio>
                    <Radio label="国外服务商"></Radio>
                  </RadioGroup>
                </i-col>
              </row>
            </i-col>
          </row>
        </i-col>
      </row>
    </i-col>
  </row>
  <row class="gradetest-name system">
    <i-col span="4" class="system-name br">09 等级测评单位名称</i-col>
    <i-col span="20" class="system-name">
      <i-input v-model="suchAsPaul.gradeValue"></i-input>
    </i-col>
  </row>
  <row class="operation-when system">
    <i-col span="4" class="system-name br">10 何时投入运行 </i-col>
    <i-col span="20" class="system-name-test">
      <date-picker format="yyyy年MM月dd日" type="date" placeholder="请选择日期" style="width: 200px" :value="suchAsPaul.date" @on-change="changeDate"></date-picker>
    </i-col>
  </row>
  <row class="subsystem-if system">
    <i-col span="4" class="system-name br">11 系统是否为分系统</i-col>
    <i-col span="20" class="system-name">
      <RadioGroup v-model="suchAsPaul.system">
        <Radio label="是"></Radio>
        <Radio label="否"></Radio>
      </RadioGroup>
      （如选择是请填下两项）
    </i-col>
  </row>
  <row class="superior-name system">
    <i-col span="4" class="system-name br">12 上级系统名称</i-col>
    <i-col span="20" class="system-name">
      <i-input :disabled="Object.is(suchAsPaul.system, '否')" v-model="suchAsPaul.superiorValue"></i-input>
    </i-col>
  </row>
  <row class="superior-unit-name system">
    <i-col span="4" class="system-name br">13 上级系统所属单位名称</i-col>
    <i-col span="20" class="system-name">
      <i-input :disabled="Object.is(suchAsPaul.system, '否')" v-model="suchAsPaul.unitName"></i-input>
    </i-col>
  </row>
  <row class="system-button">
    <i-button type="primary" @click="handelSubmit">保&nbsp;&nbsp;&nbsp;存</i-button>
  </row>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      idEdit: false,
      suchAsPaul: {
        name: '', //系统名称
        num: '', //系统编号
        businessType: '', //业务类型
        desc: '', //业务描述
        serviceScope: '', //服务范围
        serviceSituation: '', //服务情况
        coverageRange: '', //覆盖范围
        networkProperties: '', //网络性质
        systemInterconnection: '', //系统互联情况
        useCounts: [0, 0, 0, 0, 0, 0, 0], //使用数量
        usageRate: ['', '', '', '', '', ''],
        dutyType: ['', '', '', '', '', '', '', ''],
        percent: [], //使用率
        gradeValue: '', //等级测评单位名称
        date: '', //日期
        system: '', //区分系统
        superiorValue: '', //上级系统名称
        unitName: '', // 上级系统所属单位名称
        social: ['', '', '', '', '', '', '']
      }
    }
  },
  computed: {
    url() {
      return this.$store.state.userCode.url
    },
    inspId() {
      return this.$store.state.userCode.inspId
    }
  },
  created() {},
  mounted() {
    if (localStorage.inspId > 0) {
      this.idEdit = true
      this.queryList()
    } else {
      this.idEdit = false
    }
  },
  methods: {
    changeDate(date) {
      this.suchAsPaul.date = date
    },
    queryList() {
      const url = this.url + '/insp/api/v1.0/systems/' + localStorage.inspId
      axios({
        method: 'get',
        url: url
      }).then(response => {
        if (response.data.status) {
          const res = response.data.inspect_system
          this.suchAsPaul = res.system_data_json
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    handelSubmit() {
      const url =
        localStorage.inspId > 0
          ? `${this.url}/insp/api/v1.0/systems/${localStorage.inspId}`
          : `${this.url}/insp/api/v1.0/systems`
      const method = localStorage.inspId > 0 ? 'put' : 'post'
      const params = {
        system_name: this.suchAsPaul.name,
        system_no: this.suchAsPaul.num,
        system_data_json: this.suchAsPaul,
        describe: this.suchAsPaul.desc,
        file: ''
      }
      axios({
        method: method,
        url: url,
        data: params
      }).then(response => {
        if (response.data.status) {
          this.$Message.info(response.data.desc)
          window.location.href = '/#/protectaionList'
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    }
  }
}
</script>

<style lang="less">
@import 'gradeProtectaion.less';
</style>
