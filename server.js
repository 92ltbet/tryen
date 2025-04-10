const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Sử dụng cổng môi trường hoặc 3000

// Phục vụ các tệp tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Route mặc định trỏ về index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
}); 