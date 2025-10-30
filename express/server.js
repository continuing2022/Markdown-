const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// 创建 Express 应用
const app = express();
const port = process.env.PORT || 3000;

// 中间件配置
app.use(cors()); // 解决跨域问题
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码请求体
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件服务

// 用户相关 API
app.get('/users', (req, res) => {
  const users = [
    { id: 1, name: '张三', age: 25, email: 'zhangsan@example.com' },
    { id: 2, name: '李四', age: 30, email: 'lisi@example.com' },
    { id: 3, name: '王五', age: 28, email: 'wangwu@example.com' }
  ];
  res.json({
    success: true,
    data: users,
    total: users.length
  });
});

// 获取单个用户
app.get('/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = { id: userId, name: `用户${userId}`, age: 25 + userId,email:`user${userId}@example.com` };
  
  res.json({
    success: true,
    data: user
  });
});


// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: '接口不存在',
    path: req.originalUrl
  });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : '请联系管理员'
  });
});

// 启动服务器
app.listen(port, () => {
  console.log(`🚀 Express 服务器运行在 http://localhost:${port}`);
});

module.exports = app;