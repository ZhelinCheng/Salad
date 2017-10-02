/**
 * Created by cheng on 2017/5/10.
 */
const fs = require('fs'),
    exec = require('child_process').exec,
    cronJob = require("cron").CronJob;

module.exports = {
    //计时操作
    TIMER : null,
    time: function (pathname, date) {
        let that = this,
            shell_c = 'find ' + pathname + 'c/ -mtime +' + date + ' -type  f  -name  *.jpg  -exec  rm  -f {}  \;  &&',
            shell_p = 'find ' + pathname + 'p/ -mtime +' + date + ' -type  f  -name  *.jpg  -exec  rm  -f {}  \; ';
            //shell_s = 'find ' + pathname + 's/ -mtime +' + date + ' -type  f  -name  *.jpg  -exec  rm  -f {}  \;';

        //that.shell(shell_c + shell_p, pathname, true);

        /*new cronJob('0 0 4 * * *', () => {

        }, null, true, 'Asia/Chongqing');*/

        this.TIMER = setInterval(function () {
            that.shell(shell_c + shell_p, pathname, true);
        }, 3000);
    },

    mkdir : function (path) {
        fs.exists(dir, function (exists) {
            if(!exists){
                fs.mkdirSync(dir);
            }
        })
    },

    //删除操作
    shell: function (shell, pathname, first) {
        let that = this;
        exec(shell, (err) => {
            if (err) {
                console.error(err);
                clearInterval(that.TIMER);
                return;
            }

            console.log(111);

            if (first) {
                //this.logs(pathname)
            }
        });
    },

    //写入日志
    logs: function (pathname) {
        let data = null,
            shell = '';
        try {
            data = fs.existsSync(pathname + 'del.log');
            if (data) {
                shell = 'echo ' + new Date + ' Success! >>' + pathname + 'del.log';
            } else {
                shell = 'touch ' + pathname + 'del.log && echo ' + new Date + ' Success! >>' + pathname + 'del.log'
            }
            this.shell(shell);
        } catch (err) {
            console.error(err);
        }
    },
};