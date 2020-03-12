/*
 * @Author: Zhelin Cheng
 * @Date: 2019-09-23 10:15:33
 * @LastEditTime: 2020-03-12 12:33:09
 * @LastEditors: Zhelin Cheng
 * @Description: PM2配置文件
 */
const os = require('os')

module.exports = {
  apps: [{
    name: process.env.SALAD_NAME || 'Salad',
    script: 'dist/main.js',
    // Options reference: https://doc.pm2.io/en/runtime/guide/ecosystem-file/#ecosystem-file
    instances: os.cpus().length,
    exec_mode: 'cluster',
    autorestart: true,
    watch: false,
    max_memory_restart: '350M',
    max_restarts: 3,
    env: {
      NODE_ENV: 'production'
    }
  }]
}
