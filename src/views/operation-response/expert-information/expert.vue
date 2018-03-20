<template lang="html">
  <div class="">
    <div>
      <Button @click="addExpert">
        <Icon type="plus-round" class="icon"></Icon>添加
      </Button>
    </div>
    <el-table class="table" :data="expertList" border style="width: 100%">
      <el-table-column label="专家姓名" width="180" prop="name"></el-table-column>
      <el-table-column label="专家简介" prop="resume"></el-table-column>
      <el-table-column label="擅长安全领域" width="180">
        <template slot-scope="scope">
          <span v-for="field in scope.row.fields" :key="field.id">
            {{ field.field_name }}/
          </span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" width="180" prop="phone"></el-table-column>
      <el-table-column label="联系邮箱" prop="phone"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editExpert(scope.$index, scope.row)">修改</el-button>
          <el-popover ref="expertPopover" placement="top" width="160" v-model="scope.row.deleteVisible">
            <p>您确定删除当前专家么？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteExpert(scope.$index, scope.row.id)">确定</el-button>
            </div>
          </el-popover>
          <el-button type="primary" size="small" v-popover:expertPopover>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Modal v-model="visible" title="添加专家信息">
      <i-form ref="expertInfo" :model="expertInfo" :label-width="100">
        <form-item label="专家姓名" prop="name">
          <i-input v-model="expertInfo.name"></i-input>
        </form-item>
        <form-item label="专家简介" prop="resume">
          <i-input v-model="expertInfo.resume"></i-input>
        </form-item>
        <form-item label="擅长安全领域">
          <template>
            <Cascader :data="fieldData" trigger="hover" v-model="selectedField"></Cascader>
          </template>
        </form-item>
        <form-item label="联系电话" prop="phone">
          <i-input v-model="expertInfo.phone"></i-input>
        </form-item>
      </i-form>
      <div slot="footer">
        <i-button type="primary" @click="handleAddExpertSubmit()">保存</i-button>
        <i-button type="ghost" @click="handleAddExpertReset()" style="margin-left: 8px">取消</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import axios from 'axios'
// import DialogExpert form './dialogExpert'

export default {
  components: {
    // DialogExpert
  },
  data() {
    return {
      expertList: [],
      visible: false,
      expertInfo: {
        name: '', //用户名
        resume: '',
        expert_field_ids: [],
        expert_rule_ids: [31103, 31166],
        phone: '',
        email: '13838383838@qq.com'
      },
      fieldData: [],
      selectedField: []
    }
  },
  created() {
    this.queryExpertList()
    this.querySecurityField()
  },
  computed: {
    url() {
      return this.$store.state.userCode.url
    }
  },
  methods: {
    querySecurityField() {
      const url = this.url + '/ops/api/v1.0/sec_field_types'
      axios({
        method: 'get',
        url: url
      }).then(response => {
        if (response.data.status) {
          const res = response.data
          this.formatCascader(res.security_field_types)
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    formatCascader(data) {
      data.forEach((item, index) => {
        this.fieldData.push({})
        this.fieldData[index].value = item.id
        this.fieldData[index].label = item.type_name
        let flag = index
        if (item.fields) {
          this.fieldData[flag].children = []
          item.fields.forEach((item, index) => {
            this.fieldData[flag].children.push({})
            this.fieldData[flag].children[index].value = item.id
            this.fieldData[flag].children[index].label = item.field_name
          })
        }
      })
    },
    queryExpertList() {
      const url = this.url + '/ops/api/v1.0/experts'
      axios({
        method: 'get',
        url: url
      }).then(response => {
        if (response.data.status) {
          const res = response.data
          this.expertList = res.experts
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    editExpert() {},
    deleteExpert() {},
    addExpert() {
      this.visible = true
    },
    handleAddExpertSubmit() {
      this.expertInfo.expert_field_ids = this.selectedField
      const url = this.url + '/ops/api/v1.0/experts'
      axios({
        method: 'post',
        url: url,
        data: this.expertInfo
      }).then(response => {
        if (response.data.status) {
          this.visible = false
          this.$Message.info(response.data.desc)
          this.queryExpertList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped="scoped">
.table {
  margin-top: 10px;
}
</style>
