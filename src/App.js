import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import GameSelect from "./pages/GameSelect";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


import './App.css';
import API from "./util/API";


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState(0);
  const [profileId, setProfileId] = useState(0);
  const [userLoginId, setUserLoginId] = useState("");
  const [userLoginPassword, setUserLoginPassword] = useState("");
  const [userSignupId, setUserSignupId] = useState("");
  const [userSignupPassword, setUserSignupPassword] = useState("");

  useEffect(() => {
    const storeToken = localStorage.getItem("token")
    if (storeToken) {
      API.getUserFromToken(storeToken).then(data=> {
        if(data){
          setToken(storeToken)
          setIsLoggedIn(true)
          setUserId(data.id)
        }
      })
    } else {
      console.log('no stored Token')
    }
  }, [])

  return (
    <div className="App">
      <Router basename='/'>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} token={token} setToken={setToken}/>
        <Routes>
          <Route path="/" element={<Home userId={userId} profileId={profileId} token={token} isLoggedIn={isLoggedIn}/>} />
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
            userId={userId} setUserId={setUserId} profileId={profileId} setProfileId = {setProfileId}
          />}></Route>
        </Routes>
      </Router>
    </div>
  );
}



export default App;
