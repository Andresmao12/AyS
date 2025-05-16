import { BrowserRouter, Routes, Route } from "react-router-dom"
import Landing from "../views/Landing/Landing.jsx"
import Login from "../views/Login/Login.jsx"
import Home from "../views/Home/Home.jsx"
import { FormsTemplate } from "../views/Forms/FormsTemplate.jsx"


const MyRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/access" element={<Home />} />
                <Route path="/formularios" element={<FormsTemplate />} />
                <Route path="/formularios/:table" element={<FormsTemplate />} />

            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;