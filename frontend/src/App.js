import './App.css';
import {Login} from './components/page/LoginPage/Login'
import {BrowserRouter ,Routes, Route} from "react-router-dom";
import {Landing} from "./components/page/LandingPage/Landing";

function App() {
  return (
    <>
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/login" element={<Login/>}/>
                    <Route path = "/api/test" element={<Landing/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    </>
  );
}

export default App;
