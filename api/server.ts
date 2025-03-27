import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


const app = express();
import cors from 'cors';
app.use(cors());
const SECRET_KEY = 'super_simple_secret_key';

// ユーザーインターフェース
interface User {
  username: string;
  password: string;
}

// ユーザーデータ（本番では絶対にDBに変更してください）
const users: {[username: string]: string} = {};

// JSONデータを解析するミドルウェア
app.use(express.json());

// ユーザー登録
app.post('/signup', async (req: Request, res: Response) => {
  const { username, password }: User = req.body;

  // ユーザーが既に存在するかチェック
  if (users[username]) {
    return res.status(400).json({ error: 'ユーザーは既に存在します' });
  }

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);
  users[username] = hashedPassword;

  res.status(201).json({ message: '登録成功' });
});

// ログイン
app.post('/login', async (req: Request, res: Response) => {
  const { username, password }: User = req.body;

  // ユーザーチェック
  const storedPassword = users[username];
  if (!storedPassword) {
    return res.status(401).json({ error: 'ユーザーが見つかりません' });
  }

  // パスワード検証
  const isPasswordValid = await bcrypt.compare(password, storedPassword);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'パスワードが間違っています' });
  }

  // トークン生成
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// デコードされたトークンの型
interface DecodedToken {
  username: string;
  iat: number;
  exp: number;
}

// 認証ミドルウェア
const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'トークンがありません' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as DecodedToken;
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: '無効なトークンです' });
  }
};

// 認証が必要なプライベートルート
app.get('/private', authenticateToken, (req: Request, res: Response) => {
  res.json({ 
    message: '認証成功！', 
    user: (req as any).user 
  });
});

// サーバー起動
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`サーバーが http://localhost:${PORT} で起動しました`);
});