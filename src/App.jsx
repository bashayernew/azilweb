import { Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import ClientsPage from './pages/ClientsPage'
import TeamPage from './pages/TeamPage'
import ContactPage from './pages/ContactPage'

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
          <Route path="/عملائنا" element={<ClientsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
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
