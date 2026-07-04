import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0F19] text-gray-100 selection:bg-[#6C5CE7]/30">
      <Navbar />

      <main className="flex-1 pt-24 pb-20 px-4 max-w-7xl w-full mx-auto transition-all duration-300">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default Body;