import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Portfolio from './components/sections/Portfolio'
import About from './components/sections/About'
// import ReelStrip from './components/sections/ReelStrip'
import Contact from './components/sections/Contact'

function App() {
  return (
    <Layout>
      <Hero />
      <Portfolio />
      <About />
      {/* <ReelStrip /> — WIP: reels, ediciones y videoclips */}
      <Contact />
    </Layout>
  )
}

export default App
