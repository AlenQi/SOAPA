<template lang="html">
  <div class="">
    <row>
      <i-col span="12">
        <collapse>
          <panel name="1">
            展开搜索条件
            <div slot="content">
              <div class="threat_level clearfix">
                <div class="level_name">规则ID：</div>
                <div class="level_name">
                  <i-input v-model="searchEvent.rule_id" style="width: 300px"></i-input>
                </div>
              </div>
              <div class="threat_level clearfix">
                <div class="level_name">方案简介：</div>
                <div class="level_name">
                  <i-input v-model="searchEvent.describe" style="width: 300px"></i-input>
                </div>
              </div>
              <div class="threat_level clearfix">
                <div class="level_name">处理方案信息：</div>
                <div class="level_name">
                  <i-input type="textarea" v-model="searchEvent.solution_info" style="width: 300px"></i-input>
                </div>
              </div>
            </div>
          </panel>
        </collapse>
      </i-col>
      <i-col offset="1" span="1">
        <i-button type="primary" @click="searchEventList">查询</i-button>
      </i-col>
      <i-col offset="1" span="1">
        <i-button type="primary" @click="addEvent">
          <Icon type="plus-round" class="icon"></Icon>添加
        </i-button>
      </i-col>
    </row>
    <el-table class="table" :data="eventList" border style="width: 100%">
      <el-table-column label="ID" width="100" prop="id"></el-table-column>
      <el-table-column label="方案简介" prop="describe"></el-table-column>
      <el-table-column label="处理方案信息" prop="solution_info"></el-table-column>
      <el-table-column label="处理方案文件">
        <template slot-scope="scope">
          <p v-for="file in scope.row.solution_files" :key="file.id">
            <a :href="file.file_url">{{ file.file_name }}</a>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="规则ID">
        <template slot-scope="scope">
          <Tooltip v-if="scope.row.rule" :content="scope.row.rule.describe" placement="top">
            {{ scope.row.rule.rule_id }}
          </Tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <div class="margin-top-5">
            <el-button type="primary" size="small" @click="editEvent(scope.$index, scope.row)">修改</el-button>
            <el-popover ref="expertPopover" placement="top" width="160" v-model="scope.row.deleteVisible">
              <p>您确定删除当前处理方案么？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteEvent(scope.$index, scope.row.id)">确定</el-button>
              </div>
            </el-popover>
            <el-button type="primary" size="small" v-popover:expertPopover>删除</el-button>
          </div>
          <Upload class="upload" multiple :action="uploadUrl + scope.row.id">
            <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
        </template>
      </el-table-column>
    </el-table>
    <Modal v-model="visible" title="创建处理方案">
      <i-form ref="addEventInfo" :model="addEventInfo" :label-width="100">
        <form-item label="规则类型">
          <template>
            <Select v-model="addEventInfo.rule_id">
              <OptionGroup v-for="rules in rulesData" :key="rules.id" :value="rules.id" :label="`${rules.id}/${rules.describe}`">
                <Option v-for="item in rules.rules" :value="item.rule_id" :key="item.rule_id">{{ item.rule_id }}/{{ item.describe }}</Option>
              </OptionGroup>
            </Select>
          </template>
        </form-item>
        <form-item label="方案简介" prop="phone">
          <i-input v-model="addEventInfo.describe"></i-input>
        </form-item>
        <form-item label="处理方案信息" prop="resume">
          <i-input type="textarea" v-model="addEventInfo.solution_info"></i-input>
        </form-item>
      </i-form>
      <div slot="footer">
        <i-button type="primary" @click="handleAddEventSubmit()">保存</i-button>
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
      rulesData: [],
      modifyId: '',
      eventList: [],
      visible: false,
      addEventInfo: {
        rule_id: '',
        solution_info: '',
        describe: ''
      },
      flag: true,
      searchEvent: {
        rule_id: '',
        solution_info: '',
        describe: ''
      }
    }
  },
  mounted() {
    this.queryRuleList()
    if (this.$route.query.rule_id) {
      this.queryLoginExpertList(this.$route.query.rule_id)
    } else {
      this.queryEventList()
    }
  },
  computed: {
    uploadUrl() {
      return `${this.$store.state.userCode.url}/ops/api/v1.0/solution/files/`
    }
  },
  methods: {
    queryRuleList() {
      SourceOperationResource.queryRuleList().then(response => {
        if (response.data.status) {
          const res = response.data
          this.rulesData = res.log_rule_types
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryEventList(params) {
      SourceOperationResource.queryEventList(params).then(response => {
        if (response.data.status) {
          const res = response.data
          this.eventList = res.solutions
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryLoginExpertList(id) {
      SourceOperationResource.queryLoginExpertList(id).then(response => {
        if (response.data.status) {
          const res = response.data
          this.eventList = res.experts
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    searchEventList() {
      this.queryEventList(this.searchEvent)
    },
    editEvent(index, row) {
      this.modifyId = row.id
      this.addEventInfo.rule_id = row.id
      this.addEventInfo.describe = row.describe
      this.addEventInfo.solution_info = row.solution_info
      this.visible = true
      this.flag = false
    },
    deleteEvent(index, id) {
      SourceOperationResource.delEvent(id).then(response => {
        if (response.data.status) {
          this.$Message.info(response.data.desc)
          this.queryEventList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    addEvent() {
      this.visible = true
      this.flag = true
      this.addEventInfo = {
        rule_id: '',
        solution_info: '',
        describe: ''
      }
    },
    handleAddEventSubmit() {
      if (this.flag) {
        SourceOperationResource.addEvent(this.addEventInfo).then(response => {
          if (response.data.status) {
            this.visible = false
            this.$Message.info(response.data.desc)
            this.queryEventList()
          } else {
            this.$Message.error(response.data.desc)
          }
        })
      } else {
        SourceOperationResource.modifyEvent(this.addEventInfo, this.modifyId).then(response => {
          if (response.data.status) {
            this.visible = false
            this.$Message.info(response.data.desc)
            this.queryEventList()
          } else {
            this.$Message.error(response.data.desc)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../styles/search.less';
.table {
    margin-top: 10px;
}

.upload {
  margin-top: 5px;
}
</style>
