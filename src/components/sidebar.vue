<template>
    <div class="sidebar">
        <el-menu
            default-active="1"
            class="el-menu-vertical"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1">
                <i class="el-icon-view"></i>
                <span slot="title">状态</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-tickets"></i>
                    <span>审批</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">全部</template>
                    <el-menu-item route=ture index="2-1">待审批</el-menu-item>
                    <el-menu-item index="2-2">已审批</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <template slot="title">清纯</template>
                    <el-menu-item index="2-3">待审批</el-menu-item>
                    <el-menu-item index="2-4">已审批</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Coser">
                    <el-menu-item index="2-5">待审批</el-menu-item>
                    <el-menu-item index="2-6">已审批</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="其他">
                    <el-menu-item index="2-7">待审批</el-menu-item>
                    <el-menu-item index="2-8">已审批</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="3">
                <i class="el-icon-location-outline"></i>
                <span slot="title">主页</span>
            </el-menu-item>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>设置</span>
                </template>
                <el-menu-item index="4-1">日志</el-menu-item>
                <el-menu-item index="4-2">上传</el-menu-item>
                <el-menu-item index="4-3">禁用IP</el-menu-item>
                <el-menu-item index="4-4">禁用UA</el-menu-item>
            </el-submenu>
            <el-menu-item index="5">
                <i class="el-icon-sort"></i>
                <span>CDN</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    methods: {
        handleOpen (key, keyPath) {
            console.log(key, keyPath)
        },
        handleClose (key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style lang="less" scoped>
    .sidebar, .el-menu-vertical {
        height: 100%;
    }
</style>
