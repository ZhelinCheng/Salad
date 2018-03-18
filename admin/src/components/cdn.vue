<template>
    <div class="cdn">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="URL地址">
                <el-input v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="刷新类型">
                <el-select v-model="form.type" placeholder="刷新类型">
                    <el-option label="链接刷新" value="url"></el-option>
                    <el-option label="目录刷新" value="path"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">执行</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'cdn',
    data () {
        return {
            form: {
                url: '',
                type: ''
            }
        }
    },
    methods: {
        onSubmit () {
            console.log(this.form.type)
        }
    }
}
</script>

<style lang="less" scoped>

</style>
