import NavBar from "./Components/NavBar/NavBar";
import SiteMain from "./Components/SiteMain/SiteMain";
import Footer from "./Components/Footer/Footer";
import AuthProvider from "./Contexts/UserContext";

function App() {
  return (
    <>
      <AuthProvider>
        <NavBar />
        <SiteMain />
        <Footer />
      </AuthProvider>
    </>
  )
}

export default App
