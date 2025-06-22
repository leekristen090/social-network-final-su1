import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./Home";
import Search from "./Search";
import NavigationHeader from "./Navigation.tsx";
import "./styles.css";
import Account from "./Account";
import Footer from "./Footer.tsx";
import BookDetails from "./Home/BookDetails.tsx";
import UserDetails from "./Account/Users/UserDetails.tsx";

export default function SocialNetwork() {
    return (
        <div id={"sn-social-network"} className={"sn-bg-cream min-vh-100"}>
            <NavigationHeader />
            <div id={"sn-main-content"} className={"sn-main-content-offset p-3 sn-bg-cream"}>
                <Routes>
                    <Route path={"/"} element={<Navigate to={"Home"} /> } />
                    <Route path={"/Home"} element={<Home />} />
                    <Route path={"/Account/*"} element={<Account />} />
                    <Route path={"/Discover"} element={<Search />} />
                    {/*<Route path={"/Details/:bid"} element={<BookDetails />} />*/}
                    <Route path={"/Details/:bid"} element={<BookDetails />}>
                        <Route path={"User/:userId"} element={<UserDetails />} />
                    </Route>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}