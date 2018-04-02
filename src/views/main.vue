<template>
<div class="main" :class="{'main-hide-text': shrink}">
  <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
    <shrinkable-menu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr" :menu-list="menuList">
      <div slot="top" v-bind:class="{ 'logo-max': !shrink, 'logo-min': shrink}">
        <!-- <img v-show="!shrink" src="../images/logo.png" key="max-logo" /> -->
        <!-- <img v-show="shrink" src="../images/logo-min.png" key="min-logo" /> -->
      </div>
    </shrinkable-menu>
  </div>
  <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
    <div class="main-header">
      <div class="navicon-con">
        <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
          <Icon type="navicon" size="32"></Icon>
        </Button>
      </div>
      <div class="header-middle-con">
        <div class="main-breadcrumb">
          <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
        </div>
      </div>
      <div class="header-avator-con">
        <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
        <!-- <lock-screen></lock-screen> -->

        <!-- <message-tip v-model="mesCount"></message-tip> -->

        <div class="user-dropdown-menu-con">
          <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
              <a href="javascript:void(0)">
                <span class="main-user-name">{{userName}}</span>
                <Icon type="arrow-down-b"></Icon>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="password">修改密码</DropdownItem>
                <DropdownItem name="loginout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Avatar :src="avatorPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
          </Row>
        </div>
      </div>
    </div>
  </div>
  <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
    <div class="single-page">
      <keep-alive :include="cachePage">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
  <Modal v-model="visible" title="修改密码">
    <i-form ref="passwordForm" :model="passwordForm" :rules="passwordValidate" :label-width="100">
      <form-item label="用户名" prop="username">
        <i-input :readonly="true" v-model="passwordForm.username"></i-input>
      </form-item>
      <form-item label="输入新密码" prop="passWord">
        <i-input v-model="passwordForm.passwd"></i-input>
      </form-item>
      <form-item label="确认新密码" prop="passWords">
        <i-input v-model="passwordForm.passwords"></i-input>
      </form-item>
    </i-form>
    <div slot="footer">
      <i-button type="primary" @click="handleSubmitPassword('passwordForm')">保存</i-button>
      <i-button type="ghost" @click="visible = false" style="margin-left: 8px">取消</i-button>
    </div>
  </Modal>
</div>
</template>
<script>
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue'
import tagsPageOpened from './main-components/tags-page-opened.vue'
import breadcrumbNav from './main-components/breadcrumb-nav.vue'
import fullScreen from './main-components/fullscreen.vue'
// import lockScreen from './main-components/lockscreen/lockscreen.vue'
import messageTip from './main-components/message-tip.vue'
import Cookies from 'js-cookie'
import util from '@/libs/util.js'
import SourceUserResource from '@/resources/SourceUserResource'

export default {
  components: {
    shrinkableMenu,
    tagsPageOpened,
    breadcrumbNav,
    fullScreen,
    // lockScreen,
    messageTip
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.formCustom.passwdCheck !== '') {
          // 对第二个密码框单独验证
          this.$refs.formCustom.validateField('passwdCheck')
        }
        callback()
      }
    }
    const validatePassCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.formCustom.passwd) {
        callback(new Error('两次密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      passwordForm: {
        username: Cookies.get('user'),
        passwd: '',
        passwords: ''
      },
      passwordValidate: {
        passwd: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ],
        passwords: [
          {
            validator: validatePassCheck,
            trigger: 'blur'
          }
        ]
      },
      visible: false,
      shrink: false,
      userName: '',
      isFullScreen: false,
      openedSubmenuArr: this.$store.state.app.openedSubmenuArr
    }
  },
  computed: {
    menuList() {
      return this.$store.state.app.menuList
    },
    pageTagsList() {
      return this.$store.state.app.pageOpenedList // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.state.app.currentPath // 当前面包屑数组
    },
    avatorPath() {
      return localStorage.avatorImgPath
    },
    cachePage() {
      return this.$store.state.app.cachePage
    },
    lang() {
      return this.$store.state.app.lang
    },
    menuTheme() {
      return this.$store.state.app.menuTheme
    },
    mesCount() {
      return this.$store.state.app.messageCount
    }
  },
  methods: {
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name)
      this.$store.commit('updateMenulist')
      if (pathArr.length >= 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      this.userName = Cookies.get('user')
      let messageCount = 3
      this.messageCount = messageCount.toString()
      this.checkTag(this.$route.name)
      this.$store.commit('setMessageCount', 3)
    },
    handleSubmitPassword(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          SourceUserResource.modifyPassword(this.passwordForm).then(response => {
            if (response.data.status) {
              this.visible = false
              this.$Message.info('修改成功')
            } else {
              this.$Message.error(response.data.desc)
            }
          })
        } else {
        }
      })
    },
    toggleClick() {
      this.shrink = !this.shrink
    },
    handleClickUserDropdown(name) {
      if (name === 'password') {
        this.visible = true
      } else if (name === 'loginout') {
        // 退出登录
        this.$store.commit('logout', this)
        this.$store.commit('clearOpenedSubmenu')
        Cookies.remove('user')
        this.$router.push({
          name: 'login'
        })
      }
    },
    checkTag(name) {
      let openpageHasTag = this.pageTagsList.some(item => {
        if (item.name === name) {
          return true
        }
      })
      if (!openpageHasTag) {
        //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
        util.openNewPage(this, name, this.$route.params || {}, this.$route.query || {})
      }
    },
    handleSubmenuChange(val) {
      // console.log(val)
    },
    beforePush(name) {
      // if (name === 'accesstest_index') {
      //     return false;
      // } else {
      //     return true;
      // }
      return true
    },
    fullscreenChange(isFullScreen) {
      // console.log(isFullScreen);
    }
  },
  watch: {
    $route(to) {
      this.$store.commit('setCurrentPageName', to.name)
      let pathArr = util.setCurrentPath(this, to.name)
      if (pathArr.length > 2) {
        this.$store.commit('addOpenSubmenu', pathArr[1].name)
      }
      this.checkTag(to.name)
      localStorage.currentPageName = to.name
    },
    lang() {
      util.setCurrentPath(this, this.$route.name) // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.init()
  },
  created() {
    this.userName = Cookies.get('user')
    // 显示打开的页面的列表
    this.$store.commit('setOpenedList')
  }
}
</script>

<style lang="less">
@import './main.less';
</style>
