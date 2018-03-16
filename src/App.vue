<template>
    <div id="app">
        <el-container>
            <el-header><topMenu/></el-header>
            <el-container>
                <el-aside width="241px">
                    <sidebar/>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import sidebar from './components/sidebar'
import topMenu from './components/topMenu'
export default {
  name: 'App',
  components: {
    sidebar,
    topMenu
  }
}
</script>

<style lang="less">
    html,body {
        height: 100%;
    }
    body {
        padding: 0;
        margin: 0;
    }
    #app {
        height: 100%;
    }
    .el-container {
        height: inherit;
    }
    .el-header {
        padding: 0;
    }
    h1,h2,h3 {
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
    }
</style>
