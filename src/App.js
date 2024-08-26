import { Routes, Route, useLocation } from "react-router-dom"
import Header from "./component/Header/Header";
import Body from "./component/Collection/Body";
import Footer from "./component/Footer/Footer";
import Home from "./component/Home/Home";
import Contact from "./component/Contact/Contact";
import Detail from "./component/Detail/Detail";
import TableOrchid from "./component/Admin/table-orchids-view";
import Login from "./component/Login/Login";
import ProtectedRoute from "./Protect";
import NotFound from "./component/Detail/NotFound";


function App() {
  const location = useLocation();

  // Check if the current route is the login page
  const showFooter = location.pathname !== '/Login' && location.pathname !== '/Admin' ;
  const showHeader = location.pathname !== '/Login';
  return (
    <div>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home/>} />

        <Route path="/Login" element={<Login/>} />

        <Route path="/Collection" element={<Body/>} />

        <Route path="/error" element={<NotFound/>} />

        <Route
          path="/Admin"
          element={
            <ProtectedRoute>
              <TableOrchid />
            </ProtectedRoute>
          }
        />

        <Route path="/Contact" element={<Contact/>} />

        <Route path='/Collection/Detail/:id' element={<Detail/>}/>

        

      </Routes>

      {showFooter && <Footer />}
    </div>

  );
}

export default App;
