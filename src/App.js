import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GameSelect from "./pages/GameSelect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import './App.css';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userLoginId, setUserLoginId] = useState("");
  const [userLoginPassword, setUserLoginPassword] = useState("");
  const [userSignupId, setUserSignupId] = useState("");
  const [userSignupPassword, setUserSignupPassword] = useState("");

  useEffect(() => {
    const storeToken = localStorage.getItem("token")
    if (storeToken) {
      console.log(storeToken)
    } else {
      console.log('no stored Token')
    }
  }, [])

  return (
    <div className="App">
      <Router basename='/'>
        <Navbar isLoggedIn={isLoggedIn} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login
            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
            userLoginId={userLoginId} setUserLoginId={setUserLoginId}
            userLoginPassword={userLoginPassword} setUserLoginPassword={setUserLoginPassword} token={token} setToken={setToken}
            userId={userId} setUserId={setUserId} />}></Route>
          <Route path="/gameselect" element={<GameSelect />}></Route>
          <Route path="/signup" element={<Signup
            isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
            userSignupId={userSignupId} setUserSignupId={setUserSignupId}
            userSignupPassword={userSignupPassword} setUserSignupPassword={setUserSignupPassword} token={token} setToken={setToken}
            userId={userId} setUserId={setUserId}
          />}></Route>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
