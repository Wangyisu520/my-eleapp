module.exports ={
    // publicPath:'/wxzf/idst/',
    devServer:{
        open: true,
        host: 'localhost',
        // host:"192.168.8.106",
        port: 8080,
        https: false,
        hotOnly: false,
        // proxy:{
        //     '/api':{
        //         target:"https://ele-interface.herokuapp.com/api/",
        //         ws: true,
        //         changOrigin: true,
        //         pathRewrite:{
        //             '^/api': ''
        //         }
        //     }
        // },
        before: app=>{}
    }
}