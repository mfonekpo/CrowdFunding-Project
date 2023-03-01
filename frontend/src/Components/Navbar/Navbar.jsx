import {ConnectWallet} from "@thirdweb-dev/react";
import React from "react";
import "./Navbar.css"
const Navbar = () => {
    return (
        <header className="poo">
            <div className="logo">
            </div>
            <nav className="connect">
                <ConnectWallet />
            </nav>
        </header>
    );
};

export default Navbar;
