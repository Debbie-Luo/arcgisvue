/*
 * @Author: luobr
 * @Date: 2022-04-10 15:20:28
 * @LastEditors: luobr
 * @LastEditTime: 2022-04-10 19:28:41
 * @Description: 
 */

//COMMONJS(依赖Node环境)的导入导出方式
const path = require('path')
module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                '@':path.resolve('src') //修改src的路径为@指向路径
            }
        }
    },
    devServer:{

    },

}
