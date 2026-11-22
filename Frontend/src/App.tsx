import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import MarketplacePage from './pages/MarketplacePage'
import ResourcesPage from './pages/ResourcesPage'
import FAQPage from './pages/FAQPage'
import SuccessStoriesPage from './pages/SuccessStoriesPage'
import Product from './pages/Product'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ConfirmPasswordResetPage from './pages/ConfirmPasswordResetPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuthProviderWrapper from './components/GoogleAuthProviderWrapper'
import { LocationProvider } from './contexts/LocationContext'
import { LocationPromptModal } from './components/LocationPromptModal'
import { LocationSelectorModal } from './components/LocationSelectorModal'

function App() {
  return (
    <GoogleAuthProviderWrapper>
      <LocationProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <ToastContainer position="top-right" autoClose={3000} />
            <LocationPromptModal />
            <LocationSelectorModal />
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product" element={<Product />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/confirm-password-reset" element={<ConfirmPasswordResetPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/marketplace" element={<MarketplacePage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/success-stories" element={<SuccessStoriesPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LocationProvider>
    </GoogleAuthProviderWrapper>
  )
}

export default App
