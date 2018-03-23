<template lang="html">
  <div class="">
    <row>
      <i-col span="12">
        <collapse>
          <panel name="1">
            展开搜索条件
            <div slot="content">
              <div class="threat_level clearfix">
                <div class="level_name">专家姓名：</div>
                <div class="level_name">
                  <i-input v-model="searchExpert.name" style="width: 300px"></i-input>
                </div>
              </div>
              <div class="threat_level clearfix">
                <div class="level_name">专家简介：</div>
                <div class="level_name">
                  <i-input v-model="searchExpert.resume" style="width: 300px"></i-input>
                </div>
              </div>
              <div class="threat_level clearfix">
                <div class="level_name">擅长领域：</div>
                <div class="level_name">
                  <Select style="width: 300px" v-model="searchExpert.expert_field_ids" multiple>
                      <OptionGroup v-for="fields in fieldData" :key="fields.id" :value="fields.id" :label="fields.type_name">
                        <Option v-for="item in fields.fields" :value="item.id" :key="item.id">{{ item.field_name }}</Option>
                      </OptionGroup>
                  </Select>
                </div>
              </div>
              <div class="threat_level clearfix">
                <div class="level_name">手机号码：</div>
                <div class="level_name">
                  <i-input v-model="searchExpert.phone" style="width: 300px"></i-input>
                </div>
              </div>
              <div class="threat_level clearfix">
                <div class="level_name">电子邮箱：</div>
                <div class="level_name">
                  <i-input v-model="searchExpert.email" style="width: 300px"></i-input>
                </div>
              </div>
            </div>
          </panel>
        </collapse>
      </i-col>
      <i-col offset="1" span="1">
        <i-button type="primary" @click="searchExpertList">查询</i-button>
      </i-col>
      <i-col offset="1" span="1">
        <i-button type="primary" @click="addAgent">
          <Icon type="plus-round" class="icon"></Icon>添加
        </i-button>
      </i-col>
    </row>
    <el-table @selection-change="handleSelectionChange" ref="multipleTable" class="table" :data="agentsList" border style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="名称" width="180" prop="name"></el-table-column>
      <el-table-column label="状态" prop="status"></el-table-column>
      <el-table-column label="IP" width="180" prop="ip"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editExpert(scope.$index, scope.row)">修改</el-button>
          <el-popover ref="agentPopover" placement="top" width="160" v-model="scope.row.deleteVisible">
            <p>您确定删除当前专家么？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteAgent(scope.$index, scope.row.id)">确定</el-button>
            </div>
          </el-popover>
          <el-button type="primary" size="small" v-popover:agentPopover>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Modal v-model="visible" title="添加专家信息">
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
  </div>
</template>

<script>
import SourceOperationResource from '@/resources/SourceOperationResource'

export default {
  data() {
    return {
      modifyId: '',
      agentsList: [],
      visible: false,
      addAgentInfo: {
        name: '',
        ip: ''
      },
      fieldData: [],
      flag: true,
      searchExpert: {
        name: '',
        resume: '',
        phone: '',
        email: '',
        expert_field_ids: []
      },
      multipleSelection: []
    }
  },
  created() {
    this.querySecurityField()
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    querySecurityField() {
      SourceOperationResource.querySecurityField().then(response => {
        if (response.data.status) {
          const res = response.data
          this.fieldData = res.security_field_types
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryAgentList() {
      SourceOperationResource.queryAgentList().then(response => {
        if (response.data.status) {
          const res = response.data
          this.agentsList = res.agents
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryLoginExpertList(id) {
      SourceOperationResource.queryLoginExpertList(id).then(response => {
        if (response.data.status) {
          const res = response.data
          this.agentsList = res.experts
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    searchExpertList() {
      SourceOperationResource.searchExpertList(this.searchExpert).then(response => {
        if (response.data.status) {
          const res = response.data
          this.agentsList = res.experts
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
</style>
