import {Navbar} from "react-bootstrap";

export default function Footer() {
    return (
        <Navbar expand={"lg"} className={"bg-secondary-subtle justify-content-center mt-auto"}
                id={"sn-footer"}>
            Team Members: Kristen Lee |
            <a href={"https://github.com/leekristen090/social-network-final"} target={"_blank"}
               id={"sn-react-git-link"} className={"m-1"}>
                Frontend GitHub Link
            </a>
            <span className={"me-1"}>|</span>
            <a href={"https://github.com/leekristen090/social-network-final-server"}
               target={"_blank"} id={"sn-server-git"}>
                Server GitHub Link
            </a>
        </Navbar>
    );
}