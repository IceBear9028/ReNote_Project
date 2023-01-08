import './App.css';
import {BrowserRouter ,Routes, Route, createBrowserRouter} from "react-router-dom";
import {Login} from './components/page/LoginPage/Login'
import {Main} from "./components/page/MainPage/Main";
import {Register} from "./components/page/RegisterPage/Register";
import ErrorPage from "./components/page/ErrorPage/Error";
import Auth from "./hoc/auth";
// react의 어나니머스 컴포넌트를 불러올 때, 자신이 원하는 이름으로 불러올 수 있다.

function App() {
    const AuthLogin = Auth(Login, true);
    const AuthRegister = Auth(Register, null);
    const AuthMain = Auth(Main, true);


    return (
        <>
            <BrowserRouter>
                <div className="App">
                    <Routes>
                        <Route path = "/login" element={<AuthLogin/>}/>
                        <Route path = "/main" element={<AuthMain/>}/>
                        <Route path = "/register" element={<AuthRegister/>}/>
                        <Route path = '/error' element={<ErrorPage/>}/>
                    </Routes>
                </div>
            </BrowserRouter>
        </>
    );
}

export default App;
