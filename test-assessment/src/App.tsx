
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/global/Header'
import Footer from './components/global/Footer'
import Listing from './pages/Listing'
import Upload from './pages/Upload'

function App() {
  return (
    <>
      <Header/>
      <main className="container mx-auto px-4 py-8">
        <Router>
          <Routes>
            <Route path="/" element={<Listing />} />
            <Route path="/upload" element={<Upload />} />
          </Routes>
        </Router>
      </main>
      <Footer />
    </>
  )
}

export default App
