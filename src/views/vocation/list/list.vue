<template>
<div class="home-main">
  <div>
    <Button @click="addProperty"><Icon type="plus-round" class="icon"></Icon>添加</Button>
    <div class="search">
      <Input v-model="searchMsg">
        <Button slot="append" icon="ios-search" @click="queryAboutList"></Button>
      </Input>
    </div>
  </div>
  <div style="margin-top:10px">
    <el-table :data="inspect_systems" border style="width: 100%">
      <el-table-column label="系统编号" width="180" prop="system_no"></el-table-column>
      <el-table-column label="系统名称" width="" prop="system_name"></el-table-column>
      <!-- 业务描述 -->
      <el-table-column label="业务描述" width="" prop="describe"></el-table-column>
      <el-table-column label="自评等级" width="" prop="security_level_name"></el-table-column>
      <el-table-column label="系统服务等级" width="" prop="system_level_name"></el-table-column>
      <el-table-column label="业务信息等级" width="" prop="business_level_name"></el-table-column>
      <el-table-column label="下载路径" width="">
        <template slot-scope="scope">
          <!-- <a v-if="scope.row.system_word" href="scope.row.system_word">下载</a> -->
          <el-button type="primary" class="editor_btn" size="small" @click="handleDownPdf(scope.row.security_level, scope.row.id)">下载预览</el-button>
        </template>
      </el-table-column>
      <el-table-column align="left" label="操作">
        <template slot-scope="scope" class="clearfix">
          <p>
            <el-button type="primary" class="editor_btn" size="small" @click="handleEdit(scope.$index, scope.row.id)">编辑</el-button>
          <p>
            <el-popover ref="popover5" class="editor_btn" placement="top" width="160" v-model="scope.row.deleteVisible">
              <p>您确定删除当前信息么？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="deleteList(scope.$index, scope.row.id)">确定</el-button>
              </div>
            </el-popover>
            <el-button type="primary" class="editor_btn" size="small" v-popover:popover5 @click="showVisible(scope.row.deleteVisible)">删除</el-button>
          </p>
          <p>
            <el-button type="primary" class="editor_btn" size="small" @click="handleLevel(scope.row.security_level, scope.row.id)">等级自评详情</el-button>
          </p>
          <p>
            <el-button type="primary" class="editor_btn" size="small" @click="handleTec(scope.row.security_level, scope.row.id)" v-if="scope.row.security_level_name && scope.row.security_level_name !== ''">技术自评详情</el-button>
          </p>
          <p>
            <el-button type="primary" class="editor_btn" size="small" @click="handleManage(scope.row.security_level, scope.row.id)" v-if="scope.row.security_level_name && scope.row.security_level_name !== ''">管理自评详情</el-button>
          </p>
          <!-- <el-dropdown  @command="handleLevel(scope.row.security_level, scope.row.id)">
            <el-button size="small" type="primary">
                自评<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">等级自评详情</el-dropdown-item>
                <el-dropdown-item command="b" @click="handleTec(scope.row.security_level, scope.row.id)">技术自评详情</el-dropdown-item>
                <el-dropdown-item command="c" @click="handleManage(scope.row.security_level, scope.row.id)">管理自评详情</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
  <div>
    <div class="block" v-if="total > pageSize" style="float: right">
      <Page :total="total" @on-change="handleSizeChange" :current.sync="currentPage1" :page-size="pageSize"></Page>
    </div>
  </div>
</div>
</template>

<script>
import 'element-ui/lib/theme-default/index.css'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
  name: 'home',
  components: {},
  data() {
    return {
      pageSize: 10,
      total: 0,
      pageNum: 1,
      currentPage1: 1,
      inspect_systems: [],
      searchMsg: ''
    }
  },
  computed: {
    url() {
      return this.$store.state.userCode.url
    }
  },
  created() {
    this.queryAboutList()
  },
  methods: {
    ...mapActions(['setInspId']),
    handleSizeChange(num) {
      this.pageNum = num
      this.queryAboutList()
    },
    showVisible(deleteVisible) {
      deleteVisible = true
    },
    queryAboutList() {
      const params = {
        page: this.pageNum,
        per_page: this.pageSize,
        search_msg: this.searchMsg
      }
      axios({
        method: 'get',
        url: this.url + '/insp/api/v1.0/systems',
        params: params
      }).then(response => {
        if (response.data.status) {
          const res = response.data
          this.inspect_systems = res.inspect_systems
          this.total = parseInt(res.total)
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    deleteList(index, params) {
      const url = this.url + '/insp/api/v1.0/systems/' + params
      axios({
        method: 'delete',
        url: url
      }).then(response => {
        if (response.data.status) {
          this.$Message.success('删除成功!')
          this.queryAboutList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    handleEdit(params, id) {
      this.setInspId(id)
      localStorage.inspId = id
      window.location.href = '/#/gradeProtectaion'
    },
    addProperty() {
      this.setInspId(null)
      localStorage.inspId = null
      window.location.href = '/#/gradeProtectaion'
    },
    handleLevel(level, id) {
      // console.log(name, id, index)
      // return false
      // switch (name) {
      //     case 'a':
      localStorage.inspId = id
      window.location.href = '/#/networkSafe'
      //     break
      //     case 'b':
      //     console.log('修改密码')
      //     break
      //     case 'c':

      //     break
      //     default:
      // }
    },
    handleTec(level, id) {
      localStorage.inspId = id
      if (level > 4) {
        level = 4
      }
      if (level < 1) {
        level = 1
      }
      window.location.href = '/#/technology' + level
    },
    handleManage(level, id) {
      localStorage.inspId = id
      if (level == 5) {
        level = 4
      }
      if (level < 1) {
        level = 1
      }
      window.location.href = '/#/manage' + level
    },
    handleDownPdf(level, id) {
      localStorage.inspId = id
      if (level == 5) {
        level = 4
      }
      if (level < 1) {
        level = 1
      }
      window.location.href = '/#/downPdf?level=' + level
    }
  }
}
</script>

<style lang="less">
@import 'list.less';
</style>
