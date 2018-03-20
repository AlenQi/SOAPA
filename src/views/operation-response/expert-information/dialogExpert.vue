<template lang="html">
  <Modal v-model="visible" title="添加专家信息" @on-ok="ok" @on-cancel="cancel">
    <i-form ref="expertInfo" :model="expertInfo" :label-width="100">
      <form-item label="专家姓名" prop="name">
        <i-input v-model="expertInfo.name"></i-input>
      </form-item>
      <form-item label="专家简介" prop="resume">
        <i-input v-model="expertInfo.resume"></i-input>
      </form-item>
      <form-item label="擅长安全领域" prop="fields">
        <template>
          <span>123</span>
        </template>
      </form-item>
      <form-item label="联系电话" prop="phone">
        <i-input v-model="expertInfo.phone"></i-input>
      </form-item>
    </i-form>
    <div slot="footer">
      <i-button type="primary" @click="handleSubmit()">保存</i-button>
      <i-button type="ghost" @click="handleReset()" style="margin-left: 8px">取消</i-button>
    </div>
  </Modal>
</template>

<script>
export default {
  name: 'dialogExpert',
  data() {
    visible: false,
    expertInfo: {
      name: '', //用户名
      resume: '',
      fields: [],
      phone: ''
    }
  }
}
</script>

<style lang="less">
</style>
