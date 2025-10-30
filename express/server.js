const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
// 创建 Express 应用
const app = express();
const port = process.env.PORT || 3000;
// 连接数据库
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'Markdown'
});
db.connect((err) => {
  if (err) {
    console.error('数据库连接失败:', err);
    return;
  }
  console.log('数据库连接成功');
});
// 中间件配置
app.use(cors()); // 解决跨域问题
app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码请求体
app.use(express.static(path.join(__dirname, 'public'))); // 静态文件服务

// 用户相关 API
app.get('/markdown/notes', (req, res) => {
  const sql = 'SELECT * FROM notes ORDER BY updated_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).json({ success: false, message: '服务器错误' });
    }
    res.json({
      success: true,
      total: results.length,
      data: results
    });
  });
});

// 获取单条笔记
app.get('/markdown/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);  // 获取 URL 中的 id
  if (isNaN(noteId)) {
    return res.status(400).json({ success: false, message: '无效的笔记ID' });
  }
  const sql = 'SELECT * FROM notes WHERE id = ?';
  db.query(sql, [noteId], (err, results) => {
    if (err) {
      console.error('查询失败:', err);
      return res.status(500).json({ success: false, message: '服务器错误' });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: '笔记未找到' });
    }
    res.json({
      success: true,
      data: results[0]  // 返回查询到的单条笔记
    });
  });
});
// 创建新笔记
app.post('/markdown/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ success: false, message: '标题不能为空' });

  const sql = 'INSERT INTO notes (title, content, updated_at) VALUES (?, ?, NOW())';
  db.query(sql, [title, content || ''], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '插入失败' });
    res.json({ success: true, data: { id: result.insertId, title, content } });
  });
});
// 更新笔记
app.put('/markdown/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const { title, content } = req.body;
  if (isNaN(noteId)) {
    return res.status(400).json({ success: false, message: '无效的笔记ID' });
  }
  // 构建要更新的字段
  const fields = [];
  const values = [];
  if (title !== undefined) {   // 用户传了 title 就更新
    if (title.trim() === '') {
      return res.status(400).json({ success: false, message: '标题不能为空' });
    }
    fields.push('title = ?');
    values.push(title);
  }
  if (content !== undefined) { // 用户传了 content 就更新
    fields.push('content = ?');
    values.push(content);
  }
  if (fields.length === 0) {
    return res.status(400).json({ success: false, message: '没有需要更新的字段' });
  }
  // 自动更新 updated_at
  fields.push('updated_at = NOW()');
  const sql = `UPDATE notes SET ${fields.join(', ')} WHERE id = ?`;
  values.push(noteId);
  db.query(sql, values, (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '更新失败' });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: '笔记未找到' });
    res.json({ success: true, message: '更新成功' });
  });
});

// 删除笔记
app.delete('/markdown/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  if (isNaN(noteId)) return res.status(400).json({ success: false, message: '无效的笔记ID' });

  const sql = 'DELETE FROM notes WHERE id = ?';
  db.query(sql, [noteId], (err, result) => {
    if (err) return res.status(500).json({ success: false, message: '删除失败' });
    if (result.affectedRows === 0) return res.status(404).json({ success: false, message: '笔记未找到' });
    res.json({ success: true, message: '删除成功' });
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