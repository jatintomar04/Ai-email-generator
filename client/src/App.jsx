import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ToastContainer } from "react-toastify"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import VerifyotpPage from './pages/VerifyotpPage'
import LoginwithGmail from './pages/LoginwithGmail'
import GenerateEmail from './pages/GenrateEmail'
import PrivateComponent from './components/privateComponent'
import ScrollTop from './components/Scrolltop'
import AllEmails from './pages/AllEmails'



const App = () => {
  return (
    <>
      <BrowserRouter>

        <Navbar />
         <ScrollTop />
        <Routes>
         
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/verify-otp' element={<VerifyotpPage />} />
          <Route path='/login/mail' element={<LoginwithGmail />} />
          <Route element={<PrivateComponent />}>
          <Route path='/generate/mail' element={<GenerateEmail />} />
          <Route path='/all-emails' element={<AllEmails />} />

          </Route>

        </Routes>
        <ToastContainer />
        <Footer />
      </BrowserRouter>

    </>
  )
}

export default App