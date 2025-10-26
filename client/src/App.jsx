import NavBar from "./Components/NavBar/NavBar";
import SiteMain from "./Components/SiteMain/SiteMain";
import Footer from "./Components/Footer/Footer";
import { useState } from "react";
import { UserContext } from "./Contexts/UserContext";

function App() {
  const [authUserData, setAuthUserData] = useState({
    username: "Guest",
    email: "",
    accessToken: "",
    isLoggedIn: false,
  });

  return (
    <>
      <UserContext.Provider value={{ authUserData, setAuthUserData }}>
        <NavBar />
        <SiteMain />
        <Footer />
      </UserContext.Provider>
    </>
  )
}

export default App
