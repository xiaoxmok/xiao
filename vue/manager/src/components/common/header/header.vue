<template>
  <div>
    <el-container class="home_container">
      <el-header class="header">
        <el-col :span="10" class="logo" v-show="!collapsed">
          {{sysName}}
        </el-col>
        <el-col :span="10">
          <div class="tools" @click.prevent="collapse" :class="[collapsed ? 'pl0' : '']">
            <i class="iconfont icon-align-justify"></i>
          </div>
        </el-col>
        <el-col :span="4" class="userinfo">
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link userinfo-inner"><img :src="this.sysUserAvatar"/> {{sysUserName}}</span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>我的消息</el-dropdown-item>
              <el-dropdown-item>设置</el-dropdown-item>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-header>
      <el-container class="main">
        <el-aside class="aside" style="width: auto;" :class="[collapsed ? 'overVis' : '']">
          <!--导航菜单-->
          <el-menu :default-active="$route.path" @open="handleopen" @close="handleclose"
                   @select="handleselect"
                   background-color="#EEF1F6"
                   :collapse="collapsed"
                   text-color="#48576a"
                   unique-opened router style="height: 100%;">
            <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
              <el-submenu :index="index+''" v-if="!item.leaf">
                <template slot="title">
                  <i :class="item.iconCls"></i>
                  <span slot="title">{{item.name}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">
                  {{child.name}}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-if="item.leaf&&item.children.length>0" :index="item.children[0].path">
                <i :class="item.iconCls"></i>
                <span slot="title">{{item.children[0].name}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="content-container">
          <div class="grid-content bg-purple-light">
            <el-col :span="24" class="breadcrumb-container">
              <strong class="title">{{$route.name}}</strong>
              <el-breadcrumb separator="/" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                  {{ item.name }}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </el-col>
            <el-col :span="24" class="content-wrapper">
              <transition name="el-fade-in" mode="out-in">
                <router-view></router-view>
              </transition>
            </el-col>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        sysName: '成都旅游公共服务平台',
        collapsed: false,
        sysUserName: '',
        sysUserAvatar: 'http://www.qqzhi.com/uploadpic/2015-01-22/022222987.jpg',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      handleopen () {
        // console.log('handleopen');
      },
      handleclose () {
        // console.log('handleclose');
      },
      handleselect (a, b) {
      },
      // 退出登录
      logout: function () {
        var _this = this
        this.$confirm('确认退出吗?', '提示', {
          // type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('user')
          _this.$router.push('/login')
        }).catch(() => {
        })
      },
      // 折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed
      },
      showMenu (i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
      }
    },
    async mounted () {
      // todo 处理用户信息
    }
  }
</script>

<style lang="stylus">
  @import "../../../style/theme.styl"

  .home_container
    height 100vh
    display: flex
    flex-direction column
    .header
      line-height: 60px;
      color: #fff;
      background: color-primary;
      .userinfo
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner
          cursor: pointer;
          color: #fff;
          img
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
      .logo
        width: 230px;
        height: 60px;
        font-size: 18px;
        padding-left: 20px;
        padding-right: 20px;
        border-color: rgba(238, 241, 146, 0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        .txt
          color: #fff
      .logo-width
        width: 230px
      .logo-collapse-width
        width: 60px
      .tools
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
        &.pl0
          padding-left: 0

    .main
      overflow: hidden;
      // 左侧导航栏
      .aside
        overflow auto
        &.overVis
          overflow visible
        .el-menu-item, .el-submenu__title
          &:focus,&:hover
            background-color: rgb(209,219,229) !important
        .el-submenu
          .el-menu-item
            background-color: #e4e8f1!important
            &:focus,&:hover
              background-color: rgb(209,219,229) !important
        .el-menu:not(.el-menu--collapse) {
          width: 250px;
        }
      // 面包屑
      .breadcrumb-container
        overflow: hidden
        .title
          float: left
          font-size: 14px
        .breadcrumb-inner
          float: right

      .content-container
        background-color: #fff
</style>
