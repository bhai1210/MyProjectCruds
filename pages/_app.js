import "@/styles/globals.css";
import SidebarDrawer from "./Components/Sidebar";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

export default function App({ Component, pageProps }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen flex relative overflow-x-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:block w-64`}
      >
        <SidebarDrawer onLinkClick={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Overlay (for mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Hamburger Icon on Mobile */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white shadow-md rounded-md"
        >
          <HiMenu size={24} />
        </button>
      </div>

      {/* Main Content */}
      <main className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarOpen ? 'ml-64' : ''} md:ml-64 w-full`}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
