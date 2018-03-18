<template>
    <div class="lists">
        <el-table
            :data="tableData"
            style="width: 100%"
            max-height="750"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                fixed
                prop="date"
                label="日期"
                width="150">
            </el-table-column>
            <el-table-column
                fixed
                prop="pic"
                label="缩略图"
                width="100">
                <template slot-scope="scope">
                    <img class="el-thumbnail" :src="scope.row.pic" />
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="文件名"
                width="340">
            </el-table-column>
            <el-table-column
                prop="classify"
                label="分类"
                width="120">
                <template slot-scope="scope">
                    <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{scope.row.classify}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="pure">清纯</el-dropdown-item>
                            <el-dropdown-item command="coser">Coser</el-dropdown-item>
                            <el-dropdown-item command="sexy">性感</el-dropdown-item>
                            <el-dropdown-item command="games">游戏</el-dropdown-item>
                            <el-dropdown-item command="logo">LOGO</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column
                prop="shape"
                label="形状"
                width="70">
            </el-table-column>
            <el-table-column
                prop="size"
                label="大小"
                width="60">
            </el-table-column>
            <el-table-column
                prop="path"
                label="路径"
                width="240">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button
                        @click.native.prevent="deleteRow(scope.$index, tableData)"
                        type="text"
                        size="small">
                        移除
                    </el-button>
                    <el-button
                        type="text"
                        size="small">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="lists-panel">
            <el-button type="danger" @click="deleteAll">删除所选</el-button>
            <el-pagination
                @size-change="handleSizeChange"
                :current-page="currentPage4"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="40">
            </el-pagination>
        </div>
        <el-dialog
            title="警告"
            :visible.sync="centerDialogVisible"
            width="26%"
            center>
            <span>确定删除这些文件吗？</span>
            <span slot="footer" class="dialog-footer">
    <el-button @click="deleteState(false)">取 消</el-button>
    <el-button type="danger" @click="deleteState(true)">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ['classify'],
    data () {
        return {
            currentPage4: 4,
            deleteIndex: null,
            multipleSelection: null,
            centerDialogVisible: false,
            tableData: [{
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M',
                path: '/home/wwwroot/tuimeizi.cn/'
            }]
        }
    },
    methods: {
        // 下拉选择框
        handleCommand (command) {
            // this.$message('click on item ' + command)
            console.log(command)
        },

        // 删除当前选中
        deleteRow (index) {
            this.centerDialogVisible = true
            this.deleteIndex = index
        },

        // 获取选中
        handleSelectionChange (val) {
            console.log(this.classify)
            this.multipleSelection = val
        },

        handleSizeChange (val) {
            console.log(val)
        },

        // 删除所有选中
        deleteAll () {
            this.centerDialogVisible = true
        },

        // 删除状态
        deleteState (val) {
            if (val && this.deleteIndex !== null) {
                this.centerDialogVisible = false
                this.tableData.splice(this.deleteIndex, 1)
            } else {
                this.centerDialogVisible = false
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .show {
        margin-left: 10px;
        display: inline-block;
        font-size: 12px;
        color: #3a8ee6;
        text-decoration: none;
    }

    .el-pagination {
        display: inline-block;
    }

    .el-thumbnail {
        width: 60px;
        height: 60px;
        object-fit: cover;
        background-color: #ccc;
    }
    .lists-panel {
        margin-top: 20px;
        .el-button--danger {
            margin-right: 30px;
        }
    }
</style>
