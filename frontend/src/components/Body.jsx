
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet} from "react-router-dom";
const Body = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100">
      <Navbar />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />
      </div>
  )
}

export default Body