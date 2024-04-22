import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Dashboard from "./Pages/Dashboard";
import CreateOffer from "./Pages/CreateOffer";
import DeleteOffer from "./Pages/DeleteOffer";
import MatchedOffers from "./Pages/MatchedOffers";

const MyRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/createoffer" element={<CreateOffer />} />
            <Route path="/deleteoffer" element={<DeleteOffer />} />
            <Route path="/matchedoffers" element={<MatchedOffers />} />
            <Route path="*" element={<h1>Error 404: Page Not Found</h1>} />
        </Routes>
    );
};

export default MyRoutes;
