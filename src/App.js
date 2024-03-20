import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Page1 from "./Pages/page1";
import Page2 from "./Pages/page2";
import Page3 from "./Pages/page3";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Page1 />
      <Page2 />
      <Page3 />
      <Footer />
    </div>
  );
}

export default App;
