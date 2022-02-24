import { Fragment } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout(props) {
    return (
        <Fragment>
            <Sidebar />
            <Navbar />
            <main>{props.children}</main>
        </Fragment>
    )
};

export default Layout;