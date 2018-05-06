<template>
<div>
  <el-button v-loading="loading" class="btn-downpdf" type="primary" @click="tableExport">点击下载</el-button>

  <div id="renderPdf" class="self-assessment">
    <div>
      <div class="service-header">等保系统列表:</div>
      <div class="service-table">
        <el-table :data="inspect_systems" border style="width: 100%">
          <el-table-column label="系统编号" width="180" prop="system_no"></el-table-column>
          <el-table-column label="系统名称" width="" prop="system_name"></el-table-column>
          <el-table-column label="业务描述" width="" prop="describe"></el-table-column>
          <el-table-column label="自评等级" width="" prop="security_level_name"></el-table-column>
          <el-table-column label="系统服务等级" width="" prop="system_level_name"></el-table-column>
          <el-table-column label="业务信息等级" width="" prop="business_level_name"></el-table-column>
        </el-table>
      </div>
    </div>
    <div>
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
              <Radio class="radio-item" label="无"></Radio>
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
              <Radio class="radio-item" label="无"></Radio>
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
              <Radio class="radio-item" label="无"></Radio>
              <Radio class="radio-item" label="一般损害"></Radio>
              <Radio class="radio-item" label="严重损害"></Radio>
              <Radio class="radio-item" label="特别严重损害"></Radio>
            </RadioGroup>
          </i-col>
        </row>
      </div>
      <div class="service-table" style="background: #fff">
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
              <Radio class="radio-item" label="无"></Radio>
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
              <Radio class="radio-item" label="无"></Radio>
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
              <Radio class="radio-item" label="无"></Radio>
              <Radio class="radio-item" label="一般损害"></Radio>
              <Radio class="radio-item" label="严重损害"></Radio>
              <Radio class="radio-item" label="特别严重损害"></Radio>
            </RadioGroup>
          </i-col>
        </row>
      </div>
    </div>
    <manage1 :preview="true" v-if="level == 1" />
    <manage2 :preview="true" v-if="level == 2" />
    <manage3 :preview="true" v-if="level == 3" />
    <manage4 :preview="true" v-if="level == 4" />
    <technology1 :preview="true" v-if="level == 1" />
    <technology2 :preview="true" v-if="level == 2" />
    <technology3 :preview="true" v-if="level == 3" />
    <technology4 :preview="true" v-if="level == 4" />
  </div>
</div>
</template>
<script>
import axios from 'axios'
import html2canvas from 'html2canvas'
import jsPDF from 'jsPDF'
import manage1 from '../key-basics/manage1'
import manage2 from '../key-basics/manage2'
import manage3 from '../key-basics/manage3'
import manage4 from '../key-basics/manage4'
import technology1 from '../key-basics/technology1'
import technology2 from '../key-basics/technology2'
import technology3 from '../key-basics/technology3'
import technology4 from '../key-basics/technology4'

export default {
  components: {
    manage1,
    manage2,
    manage3,
    manage4,
    technology1,
    technology2,
    technology3,
    technology4
  },
  data() {
    return {
      loading: true,
      inspect_systems: [],
      level: 0,
      business_assess_show: {
        citizen: '无',
        social: '无',
        country: '无'
      },
      system_assess_show: {
        citizen: '无',
        social: '无',
        country: '无'
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
    // const height = document.getElementById('test').scrollHeight
    document.getElementById('single-page-con').style.height = '20000px'
    this.level = window.location.hash.split('=')[1]
    if (localStorage.inspId > 0) {
      this.queryList()
      this.queryLevelList()
    }
  },
  destroyed() {
    document.getElementById('single-page-con').style.height = 'auto'
  },
  methods: {
    queryList() {
      const params = {
        page: 1,
        per_page: 50
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
    tableExport(type) {
      this.loading = true
      this.$Message.info('正在生成PDF，请稍等。')
      html2canvas(document.getElementById('renderPdf'), {
        height: document.getElementById('renderPdf').offsetHeight,
        onrendered: function(canvas) {
          var contentWidth = canvas.width
          var contentHeight = canvas.height
          var pageHeight = contentWidth / 592.28 * 841.89
          var leftHeight = contentHeight
          var position = 0
          var imgWidth = 555.28
          var imgHeight = 552.28 / contentWidth * contentHeight
          var pageData = canvas.toDataURL('image/jpeg', 1.0)
          var pdf = new jsPDF('', 'pt', 'a4')
          if (leftHeight < pageHeight) {
            pdf.addImage(pageData, 'JPEG', 20, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              pdf.addImage(pageData, 'JPEG', 20, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89
              if (leftHeight > 0) {
                pdf.addPage()
              }
            }
          }
          pdf.save('content.pdf')
        }
      })
      setTimeout(() => {
        this.loading = false
      }, 10000)
    },
    formatValueToFalse() {
      this.business_assess = {
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
      this.system_assess = {
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
    },
    queryLevelList() {
      const url = this.url + '/insp/api/v1.0/systems/assess/' + localStorage.inspId
      axios({
        method: 'get',
        url: url
      }).then(response => {
        if (response.data.status) {
          this.loading = false
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
    }
  }
}
</script>

<style lang="less">
@import 'networkSafe.less';
@import 'keyBasics.less';
* {
  overflow: visible;
}
.btn-downpdf {
  margin-bottom: 20px;
}
</style>
