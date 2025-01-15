import { useState } from "react";
import Header from "../components/Header";
import MainContent from "../components/MainContent/MainContent";
import SideBar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer";
import BackToTop from "../components/MainContent/BackToTop";

function Home() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <SideBar onNavigate={handleNavigation} />
      <MainContent currentPage={currentPage} onNavigate={handleNavigation} />
      <Footer />
      <BackToTop />
    </>
  )
}

export default Home;