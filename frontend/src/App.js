import './App.css';
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import {Landing} from "./components/page/LandingPage/Landing";
import {Login} from './components/page/LoginPage/Login'

function App() {
  return (
    <>
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/login" element={<Login/>}/>
                    <Route path = "/" element={<Landing/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </>
  );
}

export default App;
