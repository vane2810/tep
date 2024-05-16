import Navbar from '../components/navbar'
import '../styles/globals.css';
import Navbar from '../components/footer' 
import Footer from '../components/footer';

export const metadata ={
  title: "TechEduPlanet - Home"
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header><Navbar/></header>
        <div>{children}</div>
        <footer><Footer/></footer>
      </body>
    </html>
  )
}
