module.exports = {
    devServer: {
        host: '0.0.0.0',  // 使服务器监听所有地址
        port: '8081',    // Vue 开发服务器端口
        proxy: {
            '/api': {
                target: 'http://192.168.31.30:8080',  // 将目标地址改为你的本地 IP 地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
};

