import Header from './Header'
import Footer from './Footer'

/**
 * App shell: film-grain overlay, floating header, page content and footer.
 * The `grain` class paints a fixed noise layer over the whole viewport.
 */
export default function Layout({ children }) {
  return (
    <div className="grain relative min-h-screen bg-ink text-paper">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
