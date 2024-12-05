import {BrowserRouter, Routes, Route} from "react-router-dom";
import Homepage from './pages/homepage';
import SignUpPage from './pages/signup';
import SignInPage from './pages/signin';
import Dashboard from "./pages/dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
