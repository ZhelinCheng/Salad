<template>
<div class="state">
    <h2>运行信息：</h2>
    <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
            prop="project"
            label="项目"
            width="200">
        </el-table-column>
        <el-table-column
            prop="state"
            label="状态">
        </el-table-column>
    </el-table>
</div>
</template>

<script>
export default {
  name: 'state',
  data () {
    return {
      tableData: [{
        project: '运行时间',
        state: '9d'
      }, {
        project: '生成图片',
        state: '5788张'
      }, {
        project: '回源请求',
        state: '15788次'
      }, {
        project: '请求IP',
        state: '15788'
      }]
    }
  }
}
</script>

<style lang="less" scoped>
    .state {
        h2 {
            color: #5f5f5f;
        }
    }
</style>
