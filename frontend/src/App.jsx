// 親コンポーネント
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./const";
import { Home } from './pages/Home';
import { Question } from './pages/Question';
import { Admin } from './pages/Admin';
import { Finish } from './pages/Finish';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.QUESTION} element={<Question />} />
        <Route path={ROUTES.ADMIN} element={<Admin />} />
        <Route path={ROUTES.FINISH} element={<Finish />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App