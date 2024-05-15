import Navbar from '../components/navbar'
import '../styles/globals.css'; //

export const metadata ={
  title: "TechEduPlanet - Home"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar/>
        </header>
        {children}
        <footer></footer>
      </body>
    </html>
  )
}
