/*
 * @Author: Zhelin Cheng
 * @Date: 2019-09-23 10:15:33
 * @LastEditTime: 2019-11-26 22:21:36
 * @LastEditors: Zhelin Cheng
 * @Description: PM2配置文件
 */

module.exports = {
  apps: [{
    name: process.env.SALAD_NAME || 'Salad',
    script: 'dist/main.js',
    // Options reference: https://doc.pm2.io/en/runtime/guide/ecosystem-file/#ecosystem-file
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1024M',
    max_restarts: 3,
    env: {
      NODE_ENV: 'production'
    }
  }]
}
