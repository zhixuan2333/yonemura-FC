import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AuthForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // ページ読み込み時にトークンをチェック
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password
      });

      // トークンを保存してログイン状態を更新
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setMessage('ログイン成功！');
      
      // 入力フィールドをクリア
      setUsername('');
      setPassword('');
      window.location.href = '/dashboard-e7b1b3e3213123213.html';
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'ログインに失敗しました');
    }
  };


  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = '/dashboard-e7b1b3e3213123213.html';
    }
  }
  , [isLoggedIn]);

  // ログインフォーム
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl mb-6 text-center">ログイン</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-2">ユーザー名</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required 
          />
        </div>
        <div>
          <label className="block mb-2">パスワード</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required 
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          ログイン
        </button>
      </form>
      {message && (
        <div className="mt-4 text-center text-red-500">
          {message}
        </div>
      )}
    </div>
  );
};

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="container mx-auto">
        <AuthForm />
      </div>
    </div>
  );
};



export function LogoutPage() {
  const handleLogout = () => {
    // トークンを削除してログアウト
    localStorage.removeItem('token');

    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl mb-6 text-center">ログアウト</h2>
          <button 
            onClick={handleLogout}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}