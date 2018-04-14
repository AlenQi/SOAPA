<template>
<div class="self-assessment">
  <div class="service-information">
    <div class="service-header">安全保护等级自评表:</div>
    <div class="service-table">
      <row class="destroy">
        <i-col span="8" class="destroy-name">
          业务信息安全保护等级自评表
        </i-col>
        <i-col span="16">
          <row>
            <i-col span="24" class="destroy-level-name">对相应客体的侵害程度</i-col>
          </row>
        </i-col>
      </row>
      <row class="equity">
        <i-col span="8" class="equity-name br">
          公民、法人和其他组织的合法权益
        </i-col>
        <i-col span="16" class="equity-item">
          <RadioGroup v-model="business_assess_show.citizen">
            <Radio class="radio-item" label="一般损害"></Radio>
            <Radio class="radio-item" label="严重损害"></Radio>
            <Radio class="radio-item" label="特别严重损害"></Radio>
          </RadioGroup>
        </i-col>
      </row>
      <row class="equity">
        <i-col span="8" class="equity-name br">
          社会秩序、公共利益
        </i-col>
        <i-col span="16" class="equity-item">
          <RadioGroup v-model="business_assess_show.social">
            <Radio class="radio-item" label="一般损害"></Radio>
            <Radio class="radio-item" label="严重损害"></Radio>
            <Radio class="radio-item" label="特别严重损害"></Radio>
          </RadioGroup>
        </i-col>
      </row>
      <row class="equity">
        <i-col span="8" class="equity-name br">
          国家安全
        </i-col>
        <i-col span="16" class="equity-item">
          <RadioGroup v-model="business_assess_show.country">
            <Radio class="radio-item" label="一般损害"></Radio>
            <Radio class="radio-item" label="严重损害"></Radio>
            <Radio class="radio-item" label="特别严重损害"></Radio>
          </RadioGroup>
        </i-col>
      </row>
    </div>
    <div class="service-table">
      <row class="destroy">
        <i-col span="8" class="destroy-name">
          系统服务安全保护等级自评表
        </i-col>
        <i-col span="16">
          <row>
            <i-col span="24" class="destroy-level-name">对相应客体的侵害程度</i-col>
          </row>
        </i-col>
      </row>
      <row class="equity">
        <i-col span="8" class="equity-name br">
          公民、法人和其他组织的合法权益
        </i-col>
        <i-col span="16" class="equity-item">
          <RadioGroup v-model="system_assess_show.citizen">
            <Radio class="radio-item" label="一般损害"></Radio>
            <Radio class="radio-item" label="严重损害"></Radio>
            <Radio class="radio-item" label="特别严重损害"></Radio>
          </RadioGroup>
        </i-col>
      </row>
      <row class="equity">
        <i-col span="8" class="equity-name br">
          社会秩序、公共利益
        </i-col>
        <i-col span="16" class="equity-item">
          <RadioGroup v-model="system_assess_show.social">
            <Radio class="radio-item" label="一般损害"></Radio>
            <Radio class="radio-item" label="严重损害"></Radio>
            <Radio class="radio-item" label="特别严重损害"></Radio>
          </RadioGroup>
        </i-col>
      </row>
      <row class="equity">
        <i-col span="8" class="equity-name br">
          国家安全
        </i-col>
        <i-col span="16" class="equity-item">
          <RadioGroup v-model="system_assess_show.country">
            <Radio class="radio-item" label="一般损害"></Radio>
            <Radio class="radio-item" label="严重损害"></Radio>
            <Radio class="radio-item" label="特别严重损害"></Radio>
          </RadioGroup>
        </i-col>
      </row>
      <row class="system-button">
        <i-button type="primary" @click="submitAssess">等级测评</i-button>
      </row>
    </div>
  </div>
</div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      business_assess_show: {
        citizen: '一般损害',
        social: '一般损害',
        country: '一般损害'
      },
      system_assess_show: {
        citizen: '一般损害',
        social: '一般损害',
        country: '一般损害'
      },
      business_assess: {
        citizen_normal: false,
        citizen_serious: false,
        citizen_special: false,
        social_normal: false,
        social_serious: false,
        social_special: false,
        country_normal: true,
        country_serious: false,
        country_specail: false
      },
      system_assess: {
        citizen_normal: false,
        citizen_serious: false,
        citizen_special: false,
        social_normal: false,
        social_serious: false,
        social_special: false,
        country_normal: false,
        country_serious: false,
        country_specail: false
      }
    }
  },
  computed: {
    url() {
      return this.$store.state.userCode.url
    }
  },
  mounted() {
    if (localStorage.inspId > 0) {
      this.queryList()
    } else {
    }
  },
  methods: {
    queryList() {
      const url = this.url + '/insp/api/v1.0/systems/assess/' + localStorage.inspId
      axios({
        method: 'get',
        url: url
      }).then(response => {
        if (response.data.status) {
          const res = response.data
          if (res.business_assess.citizen_normal) {
            this.business_assess_show.citizen = '一般损害'
          }
          if (res.business_assess.citizen_serious) {
            this.business_assess_show.citizen = '严重损害'
          }
          if (res.business_assess.citizen_special) {
            this.business_assess_show.citizen = '特别严重损害'
          }
          if (res.business_assess.social_normal) {
            this.business_assess_show.social = '一般损害'
          }
          if (res.business_assess.social_serious) {
            this.business_assess_show.social = '严重损害'
          }
          if (res.business_assess.social_special) {
            this.business_assess_show.social = '特别严重损害'
          }
          if (res.business_assess.country_normal) {
            this.business_assess_show.country = '一般损害'
          }
          if (res.business_assess.country_serious) {
            this.business_assess_show.country = '严重损害'
          }
          if (res.business_assess.country_special) {
            this.business_assess_show.country = '特别严重损害'
          }
          if (res.system_assess.citizen_normal) {
            this.system_assess_show.citizen = '一般损害'
          }
          if (res.system_assess.citizen_serious) {
            this.system_assess_show.citizen = '严重损害'
          }
          if (res.system_assess.citizen_special) {
            this.system_assess_show.citizen = '特别严重损害'
          }
          if (res.system_assess.social_normal) {
            this.system_assess_show.social = '一般损害'
          }
          if (res.system_assess.social_serious) {
            this.system_assess_show.social = '严重损害'
          }
          if (res.system_assess.social_special) {
            this.system_assess_show.social = '特别严重损害'
          }
          if (res.system_assess.country_normal) {
            this.system_assess_show.country = '一般损害'
          }
          if (res.system_assess.country_serious) {
            this.system_assess_show.country = '严重损害'
          }
          if (res.system_assess.country_special) {
            this.system_assess_show.country = '特别严重损害'
          }
        } else {
          this.$Message.error(response.data.desc)
        }
      })
    },
    submitAssess() {
      if (this.business_assess_show.citizen === '一般损害') {
        this.business_assess.citizen_normal = true
      }
      if (this.business_assess_show.citizen === '严重损害') {
        this.business_assess.citizen_serious = true
      }
      if (this.business_assess_show.citizen === '特别严重损害') {
        this.business_assess.citizen_special = true
      }
      if (this.business_assess_show.social === '一般损害') {
        this.business_assess.social_normal = true
      }
      if (this.business_assess_show.social === '严重损害') {
        this.business_assess.social_serious = true
      }
      if (this.business_assess_show.social === '特别严重损害') {
        this.business_assess.social_special = true
      }
      if (this.business_assess_show.country === '一般损害') {
        this.business_assess.country_normal = true
      }
      if (this.business_assess_show.country === '严重损害') {
        this.business_assess.country_serious = true
      }
      if (this.business_assess_show.country === '特别严重损害') {
        this.business_assess.country_special = true
      }
      if (this.system_assess_show.citizen === '一般损害') {
        this.system_assess.citizen_normal = true
      }
      if (this.system_assess_show.citizen === '严重损害') {
        this.system_assess.citizen_serious = true
      }
      if (this.system_assess_show.citizen === '特别严重损害') {
        this.system_assess.citizen_special = true
      }
      if (this.system_assess_show.social === '一般损害') {
        this.system_assess.social_normal = true
      }
      if (this.system_assess_show.social === '严重损害') {
        this.system_assess.social_serious = true
      }
      if (this.system_assess_show.social === '特别严重损害') {
        this.system_assess.social_special = true
      }
      if (this.system_assess_show.country === '一般损害') {
        this.system_assess.country_normal = true
      }
      if (this.system_assess_show.country === '严重损害') {
        this.system_assess.country_serious = true
      }
      if (this.system_assess_show.country === '特别严重损害') {
        this.system_assess.country_special = true
      }
      const url = this.url + '/insp/api/v1.0/systems/assess/' + localStorage.inspId
      axios({
        method: 'post',
        url: url,
        data: {
          system_id: localStorage.inspId,
          system_assess: this.system_assess,
          business_assess: this.business_assess
        }
      }).then(response => {
        if (response.data.status) {
          this.$Message.info('保存成功')
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
@import 'networkSafe.less';
</style>
