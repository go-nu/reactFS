const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');  // mysql2 추천!

const app = express();
const PORT = 5000;

// 미들웨어
app.use(cors());
app.use(express.json());

// ✅ MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',     // 본인 MySQL 비밀번호!
  database: 'todo_app', // 본인 DB 이름!
});

// 연결 확인
db.connect(err => {
  if (err) {
    console.error('❌ MySQL 연결 실패:', err);
    return;
  }
  console.log('✅ MySQL 연결 성공!');
});

// ✅ 예: 할 일 전체 조회
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('DB 오류!');
      return;
    }
    res.json(results);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});