import {Nav, Navbar} from "react-bootstrap";
import {Link, useLocation} from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaSearch, FaHome } from "react-icons/fa";
import { GiOpenBook } from "react-icons/gi";
export default function NavigationHeader() {
    const {pathname} = useLocation();
    const links = [
        {label: "Home", path: "/GoodBooks/Home", icon: FaHome},
        {label: "Discover", path: "/GoodBooks/Discover", icon: FaSearch},
        {label: "Account", path: "/GoodBooks/Account", icon: FaRegCircleUser }
    ];
    return(
        <Navbar expand={"lg"} className={"sn-bg-tan"} id={"sn-navigation-header"} fixed={"top"}>
            <Navbar.Brand as={Link} to={"/GoodBooks/Home"} className={"m-2 sn-header-brand-text"} id={"sn-navigation-brand"}>
                <GiOpenBook className={"fs-1 mb-1 sn-text-cream"} />
                <span className={"sn-text-cream"}> GoodBooks</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={"basic-navbar-nav"} id={"sn-header-toggle"} />
            <Navbar.Collapse id={"sn-header-collapse"} className={"m-3"}>
                <Nav>
                    {links.map((link) => (
                        <Nav.Link href={link.path} key={link.path} as={Link} to={link.path} id={"sn-header-links"}
                                  className={`${pathname.includes(link.label) ? "sn-bg-tan sn-bg-cream" : "sn-text-pink sn-bg-tan"}`}>
                            {/*{link.icon({className: `fs-3 ${pathname.includes(link.label) ? "sn-bg-tan" : "sn-text-cream sn-bg-tan"} mb-1`})}*/}
                            <span className={`sn-header-link-text ${pathname.includes(link.label) ? "text-black" : "sn-text-cream sn-bg-tan"}`}> {link.label}</span>
                        </Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}