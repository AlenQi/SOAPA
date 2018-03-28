<template lang="html">
  <div class="">
    <row>
      <i-col span="1">
        <i-button type="primary" @click="addSystemConf">
          <Icon type="plus-round" class="icon"></Icon>添加
        </i-button>
      </i-col>
    </row>
    <el-table class="table" :data="systemConfList" border style="width: 100%">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="conf_value" prop="conf_value"></el-table-column>
      <el-table-column label="conf_name" prop="conf_name"></el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="editSystemConf(scope.$index, scope.row)">修改</el-button>
          <el-popover ref="expertPopover" placement="top" width="160" v-model="scope.row.deleteVisible">
            <p>您确定删除当前配置么？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="scope.row.deleteVisible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="deleteSystemConf(scope.$index, scope.row.id)">确定</el-button>
            </div>
          </el-popover>
          <el-button type="primary" size="small" v-popover:expertPopover>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Modal v-model="visible" title="添加系统配置">
      <i-form ref="systemConfInfo" :model="systemConfInfo" :label-width="100">
        <form-item label="conf_name" prop="conf_name">
          <i-input v-model="systemConfInfo.conf_name"></i-input>
        </form-item>
        <form-item label="conf_value" prop="conf_value">
          <i-input v-model="systemConfInfo.conf_value"></i-input>
        </form-item>
      </i-form>
      <div slot="footer">
        <i-button type="primary" @click="handleAddSystemConfSubmit()">保存</i-button>
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
      systemConfList: [],
      modifyId: '',
      visible: false,
      systemConfInfo: {
        conf_value: '',
        conf_name: ''
      },
      fieldData: [],
      flag: true,
      searchExpert: {
        name: '',
        resume: '',
        phone: '',
        email: '',
        expert_field_ids: []
      }
    }
  },
  mounted() {
    this.querySystemConfList()
  },
  methods: {
    querySystemConfList() {
      SourceOperationResource.querySystemConfList().then(response => {
        if (response.data.status) {
          const res = response.data
          this.systemConfList = res.system_conf
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    searchsystemConfList() {
      SourceOperationResource.searchsystemConfList(this.searchExpert).then(response => {
        if (response.data.status) {
          const res = response.data
          this.systemConfList = res.experts
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    editSystemConf(index, row) {
      this.modifyId = row.id
      this.systemConfInfo.conf_name = row.conf_name
      this.systemConfInfo.conf_value = row.conf_value
      this.visible = true
      this.flag = false
    },
    deleteSystemConf(index, id) {
      SourceOperationResource.delSystemConf(id).then(response => {
        if (response.data.status) {
          this.$Message.info(response.data.desc)
          this.querySystemConfList()
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    addSystemConf() {
      this.visible = true
      this.flag = true
      this.systemConfInfo = {
        conf_name: '',
        conf_value: ''
      }
    },
    handleAddSystemConfSubmit() {
      if (this.flag) {
        SourceOperationResource.addSystemConf(this.systemConfInfo).then(response => {
          if (response.data.status) {
            this.visible = false
            this.$Message.info(response.data.desc)
            this.querySystemConfList()
          } else {
            this.$Message.error(response.data.desc)
          }
        })
      } else {
        SourceOperationResource.modifySystemConf(this.systemConfInfo, this.modifyId).then(response => {
          if (response.data.status) {
            this.visible = false
            this.$Message.info(response.data.desc)
            this.querySystemConfList()
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
