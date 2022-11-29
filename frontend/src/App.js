import './App.css';
import {BrowserRouter ,Routes, Route} from "react-router-dom";
// import {Landing} from "./components/page/LandingPage/Landing";
import {Login} from './components/page/LoginPage/Login'
import {Main} from "./components/page/MainPage/Main";
import {Register} from "./components/page/RegisterPage/Register";


function App() {
  return (
    <>
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/login" element={<Login/>}/>
                    <Route path = "/" element={<Main/>}/>
                    <Route path = "/register" element={<Register/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </>
  );
}

export default App;
