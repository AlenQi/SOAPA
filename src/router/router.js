import main from '@/views/main.vue'

// 不作为main组件的子页面展示的页面单独写，如下
export const loginRouter = {
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录'
  },
  component: () => import('@/views/login.vue')
}

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: () => import('@/views/error-page/404.vue')
}

export const page403 = {
  path: '/403',
  meta: {
    title: '403-权限不足'
  },
  name: 'error-403',
  component: () => import('@//views/error-page/403.vue')
}

export const page500 = {
  path: '/500',
  meta: {
    title: '500-服务端错误'
  },
  name: 'error-500',
  component: () => import('@/views/error-page/500.vue')
}

export const locking = {
  path: '/locking',
  name: 'locking',
  component: () =>
    import('@/views/main-components/lockscreen/components/locking-page.vue')
}

// 作为main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/home',
  component: main,
  children: [
    {
      path: 'home',
      title: {
        i18n: 'home'
      },
      name: 'home_index',
      component: () => import('@/views/home/home.vue')
    },
    {
      path: 'ownspace',
      title: '个人中心',
      name: 'ownspace_index',
      component: () => import('@/views/own-space/own-space.vue')
    },
    {
      // 用于展示带参路由
      path: 'message',
      title: '消息中心',
      name: 'message_index',
      component: () => import('@/views/message/message.vue')
    },
    /*******************tec   manager***********************/
    {
      path: '/gradeProtectaion',
      title: '等保系统创建',
      name: 'gradeProtectaion',
      component: () =>
        import('@/views/vocation/grade-protectaion/gradeProtectaion.vue')
    },
    {
      path: '/networkSafe',
      title: '等保系统自评',
      name: 'networkSafe',
      component: () => import('@/views/vocation/network-safe/networkSafe.vue')
    },
    {
      path: '/manage1',
      title: '管理一',
      name: 'manage1',
      component: () => import('@/views/vocation/key-basics/manage1.vue')
    },
    {
      path: '/manage2',
      title: '管理二',
      name: 'manage2',
      component: () => import('@/views/vocation/key-basics/manage2.vue')
    },
    {
      path: '/manage3',
      title: '管理三',
      name: 'manage3',
      component: () => import('@/views/vocation/key-basics/manage3.vue')
    },
    {
      path: '/manage4',
      title: '管理四',
      name: 'manage4',
      component: () => import('@/views/vocation/key-basics/manage4.vue')
    },
    {
      path: '/technology1',
      title: '技术一',
      name: 'technology1',
      component: () => import('@/views/vocation/key-basics/technology1.vue')
    },
    {
      path: '/technology2',
      title: '技术二',
      name: 'technology2',
      component: () => import('@/views/vocation/key-basics/technology2.vue')
    },
    {
      path: '/technology3',
      title: '技术三',
      name: 'technology3',
      component: () => import('@/views/vocation/key-basics/technology3.vue')
    },
    {
      path: '/technology4',
      title: '技术四',
      name: 'technology4',
      component: () => import('@/views/vocation/key-basics/technology4.vue')
    }
  ]
}

// 作为main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
  {
    path: '/property',
    icon: 'soup-can-outline',
    name: 'property',
    title: '资产管理',
    access: 'sb_asset',
    component: main,
    children: [
      {
        path: 'index',
        title: '资产管理',
        name: 'property_index',
        component: () => import('@/views/home/home.vue')
      }
    ]
  },
  // {
  //   path: '/rules',
  //   icon: 'key',
  //   name: 'rules',
  //   title: '安全规则',
  //   component: main,
  //   children: [
  //     {
  //       path: 'index',
  //       title: '规则配置',
  //       name: 'allcontion',
  //       component: () => import('@/views/rules/allcontion/rule.vue')
  //     }
  //   ]
  // },
  {
    path: '/preserve',
    icon: 'person',
    name: 'preserve',
    title: '系统管理',
    access: 'sb_user',
    component: main,
    children: [
      // {
      //     path: '/menu-preserve',
      //     title: '菜单维护',
      //     name: 'menu-preserve',
      //     component: () => import('@/views/preserve/menu-preserve/menu.vue')
      // },
      {
        path: '/user-perserve',
        title: '用户权限',
        name: 'user-preserve',
        component: () => import('@/views/preserve/user-preserve/user.vue')
      }
      // {
      //     path: '/section-perserve',
      //     title: '部门维护',
      //     name: 'section-preserve',
      //     component: () => import('@/views/preserve/section-preserve/section.vue')
      // },
      // {
      //     path: '/post-perserve',
      //     title: '岗位维护',
      //     name: 'post-preserve',
      //     component: () => import('@/views/preserve/post-preserve/post.vue')
      // },
      // {
      //     path: '/news-perserve',
      //     title: '消息模板维护',
      //     name: 'news-preserve',
      //     component: () => import('@/views/preserve/news-preserve/news.vue')
      // },
    ]
  },
  {
    path: '/vocation',
    icon: 'clipboard',
    name: 'lock-combination',
    title: '合规检测',
    access: 'sb_inspect',
    component: main,
    children: [
      {
        path: '/protectaionList',
        title: '等保系统列表',
        name: 'protectaionList',
        component: () => import('@/views/vocation/list/list.vue')
      }
      // {
      //     path: '/mainframe',
      //     title: 'windows主机安全',
      //     name: 'mainframe',
      //     component: () => import('@/views/vocation/windows-mainframe/mainframe.vue')
      // },
    ]
  },
  {
    path: '/blogs',
    icon: 'clipboard',
    name: 'blogs',
    title: '日志管理',
    access: 'sb_log',
    component: main,
    children: [
      {
        path: 'index',
        title: '日志管理',
        name: 'blog-manage',
        component: () => import('@/views/blogs/blog-manage/blog.vue')
      }
    ]
  },
  {
    path: '/rules-manage',
    icon: 'settings',
    name: 'rules-manage',
    title: '规则管理',
    access: 'sb_rule',
    component: main,
    children: [
      {
        path: 'index',
        title: '规则管理',
        name: 'regulation',
        component: () =>
          import('@/views/rules-manage/rules-manage/regulation.vue')
      }
    ]
  },
  {
    path: '/operation-response',
    icon: 'ios-grid-view',
    name: 'operation-response',
    title: '运维响应',
    component: main,
    children: [
      {
        path: 'erxpert-information',
        title: '专家信息库',
        name: 'erxpert-information',
        icon: 'arrow-move',
        access: 'sb_ops_expert',
        component: () =>
          import('@/views/operation-response/expert-information/expert.vue')
      },
      {
        path: 'event-processing',
        title: '事件处理信息库',
        name: 'event-processing',
        icon: 'edit',
        access: 'sb_ops_solution',
        component: () =>
          import('@/views/operation-response/event-processing/event.vue')
      },
      {
        path: 'agents-manage',
        title: 'Agent管理',
        name: 'agents-manage',
        icon: 'gear-a',
        access: 'sb_ops_agent',
        component: () =>
          import('@/views/operation-response/agents-manage/agents.vue')
      },
      {
        path: 'system-conf',
        title: '系统配置',
        name: 'system-conf',
        icon: 'ios-monitor',
        access: 'sb_ops_conf',
        component: () =>
          import('@/views/operation-response/system-conf/conf.vue')
      }
    ]
  }
  // {
  //     path: '/component',
  //     icon: 'social-buffer',
  //     name: 'component',
  //     title: '组件',
  //     component: main,
  //     children: [
  //         {
  //             path: 'area-linkage',
  //             icon: 'ios-more',
  //             name: 'area-linkage',
  //             title: '城市级联',
  //             component: () => import('@/views/my-components/area-linkage/area-linkage.vue')
  //         }
  //     ]
  // },
  // {
  //     path: '/charts',
  //     icon: 'ios-analytics',
  //     name: 'charts',
  //     title: '图表',
  //     component: main,
  //     children: [
  //         { path: 'pie', title: '饼状图', name: 'pie', icon: 'ios-pie', component: resolve => { require('@/views/access/access.vue') },
  //         { path: 'histogram', title: '柱状图', name: 'histogram', icon: 'stats-bars', component: resolve => { require('@/views/access/access.vue') }

  //     ]
  // },
  // {
  //     path: '/tables',
  //     icon: 'ios-grid-view',
  //     name: 'tables',
  //     title: '表格',
  //     component: main,
  //     children: [
  //         { path: 'dragableTable', title: '可拖拽排序', name: 'dragable-table', icon: 'arrow-move', component: () => import('@/views/tables/dragable-table.vue') },
  //         { path: 'editableTable', title: '可编辑表格', name: 'editable-table', icon: 'edit', component: () => import('@/views/tables/editable-table.vue') },
  //         { path: 'searchableTable', title: '可搜索表格', name: 'searchable-table', icon: 'search', component: () => import('@/views/tables/searchable-table.vue') },
  //         { path: 'exportableTable', title: '表格导出数据', name: 'exportable-table', icon: 'code-download', component: () => import('@/views/tables/exportable-table.vue') },
  //         { path: 'table2image', title: '表格转图片', name: 'table-to-image', icon: 'images', component: () => import('@/views/tables/table-to-image.vue') }
  //     ]
  // },
  // {
  //     path: '/advanced-router',
  //     icon: 'ios-infinite',
  //     name: 'advanced-router',
  //     title: '高级路由',
  //     component: main,
  //     children: [
  //         { path: 'mutative-router', title: '动态路由', name: 'mutative-router', icon: 'link', component: () => import('@/views/advanced-router/mutative-router.vue') },
  //         { path: 'argument-page', title: '带参页面', name: 'argument-page', icon: 'android-send', component: () => import('@/views/advanced-router/argument-page.vue') }
  //     ]
  // }
]

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  loginRouter,
  otherRouter,
  locking,
  ...appRouter,
  page500,
  page403,
  page404
]
