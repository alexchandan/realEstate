import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import Home from "./pages/Home"
import About from "./pages/About"
import Signin from "./pages/Signin";
import Signout from "./pages/Signout";
import Profile from "./pages/Profile";
import Header from './components/Header';

export default function App() {
  return <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/signin' element={<Signin />} />
      <Route path='/signout' element={<Signout />} />
      <Route path='/about' element={<About />} />
      <Route path='/profile' element={<Profile />} />
    </Routes>
  </BrowserRouter>
}
