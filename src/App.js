import './App.css';
import './default.css';
import Nav from "./components/Nav";
import { Outlet, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import MainPage from './pages/MainPage/MainPage';
import DetailPage from './pages/DetailPage/DetailPage';
import SearchPage from './pages/SearchPage/SearchPage';
//import Banner from './components/Banner';
//import Row from './components/Row';
//import requests from './api/requests';


const Layout = () => {
  return (
    <div>
      {/* Nav컴포넌트와 Footer컴포넌트는 어떤 페이지를 가더라도 항상 보이도록 Layout에 지정
      Outlet컴포넌트로 하위 중첩 컴포넌트 중 경로에 맞는 컴포넌트 페이지를 보여준다. */}
      <Nav />
      <Outlet/>
      <Footer/>
    </div>

  )
}

function App() {
  
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<MainPage />} />
          <Route path=':movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
