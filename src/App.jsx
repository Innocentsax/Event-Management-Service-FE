import React, {createContext,useContext, useState } from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import SearchAPI from "./components/Search/SearchParentComponent";
import EventDetails from "./components/EventDetails/EventDetails";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import { Routes,Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword";
import { UserProvider } from "./UserContext";
import UserEvent from "./components/EventRecord/UserEvent"
import BookTicket from "./components/BookTicket/BookTicket";
import Checkout from "./components/Checkout/Checkout";


export const MyContext = createContext();

function App() {
  const savedLoginInfo = JSON.parse(localStorage.getItem('loginInfo'));

  // Initialize loginInfo with the saved data (or default values)
  const [loginInfo, setLoginInfo] = useState(savedLoginInfo || {
    token: "",
    loggedIn: false,
  });
  return (
    <UserProvider>
      <>
            <Navbar />
            <Routes>
              <Route path="/" element={<SearchAPI/>} />
              <Route path="/signup" element ={<Signup/>} />
              <Route path="/login" element ={<Login/>} />
              <Route path="/allEvent" element={<EventDetails/>} />
              <Route path="/user/dashboard" element={<UserEvent/>} />
              <Route path="/create_event" element={<CreateEvent/>}/>
              <Route path="/events/viewevent" element={<EventDetails/>}/>
              <Route path="/forgot-password" element={<ForgotPassword/>}/>
              <Route path ="/events/book" element = {<BookTicket/>} />
              <Route path="/event/checkout" element={<Checkout/>} />
            </Routes>
            <Footer />
      </>
   </UserProvider>
  
  );
}

export default App;
