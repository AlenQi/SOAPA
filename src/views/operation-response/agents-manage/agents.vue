<template lang="html">
  <div class="">
    <Row :gutter="16" class="margin-bottom-10">
      <Col span="12">
        <AgentChart />
      </Col>
      <Col span="12">
        <Card>
          <p slot="title" class="card-title">
            <Icon type="ios-shuffle-strong"></Icon>
            Agent操作系统概要信息
          </p>
          <div class="block">
            <p v-for="value in agentOS">
              {{ value }}
            </p>
          </div>
        </Card>
      </Col>
    </Row>
    <Row :gutter="16">
      <Col span="1">
        <i-button type="primary" @click="addAgent">
          <Icon type="plus-round" class="icon"></Icon>添加
        </i-button>
      </Col>
      <Col offset="1" span="1">
        <i-button type="primary" @click="restartAllAgent">
          重启所有
        </i-button>
      </Col>
      <Col offset="1" span="1">
        <i-button type="primary" @click="restartPartAgent">
          重启部分
        </i-button>
      </Col>
      </Col>
      <Col offset="1" span="1">
        <i-button type="primary" @click="applyAgentRule">
          规则应用
        </i-button>
      </Col>
    </Row>
    <el-table @selection-change="handleSelectionChange" ref="multipleTable" class="table" :data="agentsList" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="名称" width="180" prop="name"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="IP" width="180" prop="ip"></el-table-column>
      <el-table-column label="操作" width="280" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="queryAgentDetails(scope.row.id)">详情</el-button>
          <el-button type="primary" size="small" @click="editExpert(scope.$index, scope.row)">修改</el-button>
          <el-popover ref="agentPopover" placement="top" width="160" v-model="scope.row.deleteVisible">
            <p>您确定删除当前专家么？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteAgent(scope.$index, scope.row.id)">确定</el-button>
            </div>
          </el-popover>
          <el-button type="primary" size="small" v-popover:agentPopover>删除</el-button>
          <el-button type="primary" size="small" @click="queryAgentKey(scope.row.id)">查看Key</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Modal v-model="visible" title="添加专家信息" width="900">
      <i-form ref="addAgentInfo" :model="addAgentInfo" :label-width="100">
        <form-item label="名称" prop="name">
          <i-input v-model="addAgentInfo.name"></i-input>
        </form-item>
        <form-item label="IP" prop="resume">
          <i-input v-model="addAgentInfo.ip"></i-input>
        </form-item>
      </i-form>
      <div slot="footer">
        <i-button type="primary" @click="handleAddExpertSubmit()">保存</i-button>
        <i-button type="ghost" @click="visible = false" style="margin-left: 8px">取消</i-button>
      </div>
    </Modal>
    <Modal width="960" v-model="detailsVisible" title="Agent详情">
      <el-table :data="agentsDetailsList" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="major">
                <span>{{ scope.row.os.major }}</span>
              </el-form-item>
              <el-form-item label="name">
                <span>{{ scope.row.os.name }}</span>
              </el-form-item>
              <el-form-item label="uname">
                <span>{{ scope.row.os.uname }}</span>
              </el-form-item>
              <el-form-item label="platform">
                <span>{{ scope.row.os.platform }}</span>
              </el-form-item>
              <el-form-item label="version">
                <span>{{ scope.row.os.version }}</span>
              </el-form-item>
              <el-form-item label="codename">
                <span>{{ scope.row.os.codename }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="状态" prop="status"></el-table-column>
        <el-table-column label="IP" prop="ip"></el-table-column>
        <el-table-column label="添加时间" prop="dateAdd"></el-table-column>
        <el-table-column label="版本" prop="version"></el-table-column>
      </el-table>
    </Modal>
    <Modal width="960" v-model="agentKeyVisible" title="AgentKey">
      <p>AgnetKey: {{ agentKey }}</p>
    </Modal>
  </div>
</template>

<script>
import SourceOperationResource from '@/resources/SourceOperationResource'
import AgentChart from '../components/AgentChart'

export default {
  components: {
    AgentChart
  },
  data() {
    return {
      agentOS: [],
      agentKey: '',
      detailsVisible: false,
      agentKeyVisible: false,
      modifyId: '',
      agentsList: [],
      agentsDetailsList: [],
      visible: false,
      addAgentInfo: {
        name: '',
        ip: ''
      },
      fieldData: [],
      flag: true,
      multipleSelection: []
    }
  },
  created() {
    this.queryAgentOS()
  },
  mounted() {
    if (this.$route.query.rule_id) {
      this.queryLoginExpertList(this.$route.query.rule_id)
    } else {
      this.queryAgentList()
    }
    console.log('12', this.$route.query.rule_id)
  },
  methods: {
    applyAgentRule() {
      SourceOperationResource.applyAgentRule().then(response => {
        if (response.data.status) {
          this.$Message.info(response.data.desc)
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryAgentKey(id) {
      this.agentKeyVisible = true
      SourceOperationResource.queryAgentKey(id).then(response => {
        if (response.data.status) {
          this.agentKey = response.data.agent_key
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryAgentOS() {
      SourceOperationResource.queryAgentOS().then(response => {
        if (response.data.status) {
          this.agentOS = response.data.agent_os.items
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryAgentDetails(id) {
      this.detailsVisible = true
      SourceOperationResource.queryAgentDetails(id).then(response => {
        if (response.data.status) {
          this.agentsDetailsList.push(response.data.agent)
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = []
      val.forEach(item => {
        this.multipleSelection.push(item.id)
      })
    },
    queryAgentList() {
      SourceOperationResource.queryAgentList().then(response => {
        if (response.data.status) {
          const res = response.data
          this.agentsList = res.agents.items
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryLoginExpertList(id) {
      SourceOperationResource.queryLoginExpertList(id).then(response => {
        if (response.data.status) {
          const res = response.data
          this.agentsList = res.agents.items
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    editExpert(index, row) {
      // this.modifyId = row.id
      // this.addAgentInfo.name = row.name
      // this.addAgentInfo.resume = row.resume
      // this.addAgentInfo.expert_field_ids = []
      // row.fields.forEach(item => {
      //   this.addAgentInfo.expert_field_ids.push(item.id)
      // })
      // this.addAgentInfo.phone = row.phone
      // this.addAgentInfo.email = row.email
      // this.visible = true
      // this.flag = false
    },
    deleteAgent(index, id) {
      SourceOperationResource.delAgent(id).then(response => {
        if (response.data.status) {
          this.$Message.info(response.data.desc)
          this.queryAgentList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    addAgent() {
      this.visible = true
      this.flag = true
      this.addAgentInfo = {
        name: '',
        ip: ''
      }
    },
    restartAllAgent() {
      SourceOperationResource.restartAllAgent().then(response => {
        if (response.data.status) {
          this.$Message.info(response.data.desc)
          this.queryAgentList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    restartPartAgent() {
      if (Object.is(this.multipleSelection.length, 0)) {
        this.$Message.info('请先选择一个Agent！')
        return
      }
      const params = {
        ids: this.multipleSelection
      }
      SourceOperationResource.restartPartAgent(params).then(response => {
        if (response.data.status) {
          this.$Message.info(response.data.desc)
          this.queryAgentList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    handleAddExpertSubmit() {
      if (this.flag) {
        SourceOperationResource.addAgent(this.addAgentInfo).then(response => {
          if (response.data.status) {
            this.visible = false
            this.$Message.info(response.data.desc)
            this.queryAgentList()
          } else {
            this.$Message.error(response.data.desc)
          }
        })
      } else {
        SourceOperationResource.modifyExpert(this.addAgentInfo, this.modifyId).then(response => {
          if (response.data.status) {
            this.visible = false
            this.$Message.info(response.data.desc)
            this.queryAgentList()
          } else {
            this.$Message.error(response.data.desc)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped="scoped">
@import '../../../styles/search.less';
.table {
  margin-top: 10px;
}

.block {
  height: 300px;
}

.table-expand {
  font-size: 0;
}

.table-expand label {
  width: 90px;
  color: #99a9bf;
}

.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>
