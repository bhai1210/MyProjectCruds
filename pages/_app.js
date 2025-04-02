// pages/_app.js
import "@/styles/globals.css";
import SidebarDrawer from "./Components/Sidebar";
export default function App({ Component, pageProps }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SidebarDrawer />
      <main className="flex p-6">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
