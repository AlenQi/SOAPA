<template>
<div>
  <row>
    <i-col span="24">
      <div class="">
        类型：
        <i-input type="text" v-model="type_name" style="width:220px;"></i-input>
        备注：
        <i-input type="text" v-model="describe" style="width:220px;"></i-input>
        <i-button @click="addRules">新增</i-button>
      </div>
      <div class="search">
        <Input v-model="searchMsg">
        <Button slot="append" icon="ios-search" @click="queryRulesList"></Button>
        </Input>
      </div>
    </i-col>
  </row>
  <el-table :data="dataRegulation" border style="width: 100%">
    <el-table-column label="ID" prop="id"></el-table-column>
    <el-table-column label="类型" width="" prop="type_name"></el-table-column>
    <!-- 业务备注 -->
    <el-table-column label="备注" width="" prop="describe"></el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope" class="clearfix">
        <Upload class="upload-demo down_btn" :action="rule_file_info" list-type="text">
          <el-button type="primary" size="small" @click="upload(scope.row.id, scope.row.rule_file)" >上传</el-button>
        </Upload>
        <el-popover ref="popover" placement="top" width="160" v-model="scope.row.deleteVisible">
          <p>您确定删除当前信息么？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="delRule(scope.row.id)">确定</el-button>
          </div>
        </el-popover>
        <el-button type="primary" class="down_btn" size="small" @click="download(scope.row.id, scope.row.rule_file)">下载</el-button>
        <el-button type="primary" class="down_btn" size="small" @click="show(scope.row.id, scope.row.rule_file)">查看</el-button>
        <el-button type="primary" class="del_btn" size="small" v-popover:popover>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="margin: 10px;overflow: hidden;float: right;">
    <Page :total="total" :page-size="pageSize" :current="1" @on-change="changePage"></Page>
  </div>
  <modal v-model="modalDetail" title="详情">
    <i-table border :columns="modalDetails " :data="modalData"></i-table>
    <div slot="footer"></div>
  </modal>
</div>
</template>

<script>
import SourceRuleManageResource from '@/resources/SourceRuleManageResource'

export default {
  data() {
    return {
      searchMsg: '',
      type_name: '',
      describe: '',
      modalDetail: false,
      dataRegulation: [],
      modalDetaildata: {
        name: '',
        id: null
      },
      modalDetails: [
        {
          title: 'rule_id',
          key: 'rule_id'
        },
        {
          title: '级别',
          key: 'level'
        },
        {
          title: '备注',
          key: 'describe'
        }
      ],
      modalData: [],
      rule_file_info: '',
      total: 0,
      pageSize: 10,
      pageNum: 1
    }
  },
  created() {
    this.queryRulesList()
  },
  computed: {
    url() {
      return this.$store.state.userCode.url
    }
  },
  methods: {
    changePage(num) {
      this.pageNum = num
      this.queryRulesList()
    },
    delRule(id) {
      SourceRuleManageResource.delRule(id).then(response => {
        if (response.data.status) {
          this.$Message.success(response.data.desc)
          this.queryRulesList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    show(id, name) {
      this.modalDetail = true
      SourceRuleManageResource.queryRuleDetail(id).then(response => {
        if (response.data.status) {
          const res = response.data
          const rules = res.rules
          this.modalData = rules
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    download(id, file) {
      if (file) {
        window.location.href = file
      } else {
        this.$Message.error('当前没有下载链接')
      }
    },
    upload(id) {
      this.rule_file_info = this.url + '/log_an/api/v1.0/rule/types/file/' + id
    },
    showVisible(deleteVisible) {
      deleteVisible = true
    },
    addRules() {
      const params = {
        type_name: this.type_name,
        describe: this.describe
      }
      SourceRuleManageResource.addRules(params).then(response => {
        if (response.data.status) {
          this.$Message.success(response.data.desc)
          this.type_name = ''
          this.describe = ''
          this.queryRulesList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    queryRulesList() {
      const params = {
        page: this.pageNum,
        per_page: this.pageSize,
        search_msg: this.searchMsg
      }
      SourceRuleManageResource.queryRuleList(params).then(response => {
        if (response.data.status) {
          const res = response.data
          const logs = res.rule_type_list
          this.total = res.total
          this.dataRegulation = logs
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    }
  }
}
</script>

<style lang="less">
@import 'regulation.less';

.search {
  margin: 10px 0;
  width: 300px;
}
</style>
