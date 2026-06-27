import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Portfolio from './components/sections/Portfolio'
import ReelStrip from './components/sections/ReelStrip'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

function App() {
  return (
    <Layout>
      <Hero />
      <Portfolio />
      <ReelStrip />
      <About />
      <Contact />
    </Layout>
  )
}

export default App
