
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './AuthForm';


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/login' element={<LoginPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default Router;
