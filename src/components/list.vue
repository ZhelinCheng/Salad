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
                width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.pic" />
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
            </el-table-column>
            <el-table-column
                prop="shape"
                label="形状"
                width="120">
            </el-table-column>
            <el-table-column
                prop="size"
                label="大小"
                width="100">
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
                        编辑
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="lists-panel">
            <el-button type="danger" @click="deleteAll">删除所选</el-button>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
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
    methods: {
        // 删除当前选中
        deleteRow (index) {
            this.centerDialogVisible = true
            this.deleteIndex = index
        },

        // 获取选中
        handleSelectionChange (val) {
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
    },
    data () {
        return {
            currentPage4: 4,
            deleteIndex: null,
            multipleSelection: null,
            tableData: [{
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }, {
                date: '2016-05-03',
                pic: 'https://tuimeizi.cn/random?w=60&h=60',
                name: 'hswo3r23hri2uo3h4kwhf23uhr232rh23r.jpg',
                classify: '清纯',
                shape: '长方形',
                size: '3.7M'
            }],
            centerDialogVisible: false
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

    .lists-panel {
        margin-top: 20px;
        .el-button--danger {
            margin-right: 30px;
        }
    }
</style>
