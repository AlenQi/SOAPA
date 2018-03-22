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
                <div class="level_name">描述：</div>
                <div class="level_name">
                  <i-input v-model="searchEvent.describe" style="width: 300px"></i-input>
                </div>
              </div>
              <div class="threat_level clearfix">
                <div class="level_name">处理方案信息：</div>
                <div class="level_name">
                  <i-input v-model="searchEvent.solution_info" style="width: 300px"></i-input>
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
      <el-table-column label="规则ID" width="100" prop="id"></el-table-column>
      <el-table-column label="描述" prop="describe"></el-table-column>
      <el-table-column label="处理方案信息" prop="solution_info"></el-table-column>
      <el-table-column label="处理方案文件">
        <template slot-scope="scope">
          <p v-for="file in scope.solution_files" :key="file.id">
            <a :href="file.file_url">{{ file.file_name }}</a>
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editEvent(scope.$index, scope.row)">修改</el-button>
          <el-popover ref="expertPopover" placement="top" width="160" v-model="scope.row.deleteVisible">
            <p>您确定删除当前处理方案么？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteEvent(scope.$index, scope.row.id)">确定</el-button>
            </div>
          </el-popover>
          <el-button type="primary" size="small" v-popover:expertPopover>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Modal v-model="visible" title="创建处理方案">
      <i-form ref="addEventInfo" :model="addEventInfo" :label-width="100">
        <form-item label="规则ID" prop="name">
          <i-input v-model="addEventInfo.rule_id"></i-input>
        </form-item>
        <form-item label="描述" prop="phone">
          <i-input v-model="addEventInfo.describe"></i-input>
        </form-item>
        <form-item label="处理方案信息" prop="resume">
          <i-input v-model="addEventInfo.solution_info"></i-input>
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
    if (this.$route.query.rule_id) {
      this.queryLoginExpertList(this.$route.query.rule_id)
    } else {
      this.queryEventList()
    }
  },
  methods: {
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

<style lang="less" scoped="scoped">
@import '../../../styles/search.less';
.table {
  margin-top: 10px;
}
</style>
