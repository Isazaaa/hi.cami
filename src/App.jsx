import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Portfolio from './components/sections/Portfolio'
import About from './components/sections/About'
import Contact from './components/sections/Contact'

function App() {
  return (
    <Layout>
      <Hero />
      <Portfolio />
      <About />
      <Contact />
    </Layout>
  )
}

export default App
