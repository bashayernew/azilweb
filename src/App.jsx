import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { useLanguage } from './contexts/LanguageContext'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'

/** Legacy /clients URLs → merged About page (#partners) */
function ClientsRouteRedirect() {
  const { path } = useLanguage()
  return <Navigate to={`${path('about')}#partners`} replace />
}

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/من-نحن" element={<AboutPage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/خدماتنا" element={<ServicesPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/عملائنا" element={<ClientsRouteRedirect />} />
          <Route path="/clients" element={<ClientsRouteRedirect />} />
          <Route path="/فريق-العمل" element={<TeamPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/تواصل-معنا" element={<ContactPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
