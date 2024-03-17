import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useAppContext } from "@context/app/app-context";
import { ToastContainer } from "react-toastify";
import router from "./router";
import "react-toastify/dist/ReactToastify.css"
import 'leaflet/dist/leaflet.css';

function App() {

  const { theme } = useAppContext()

  useEffect(() => {
    const head = document.head
    const link = document.createElement('link')
    link.rel = "stylesheet"
    link.href = `css/${theme}.css`
    head.appendChild(link)

    return () => {
      head.removeChild(link)
    }
  }, [theme])

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer rtl />
    </>
  )
}

export default App;
