import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import UsrCtrlQuery from "../../Comms/UserControlQueries";
import '/src/fonts.css';
import './UserNavBar.css';

function UserNavbar(){
    const [lastSelectedLink, setLastSelectedLink] = useState(getPage);
    const [logInfo, setLogInfo] = useState(UsrCtrlQuery.getLogInfo());

    useEffect(() =>{
        document.querySelector(lastSelectedLink).classList.add('navSelectedLink');
    })

    function getPage(){
        var path = window.location.href;
        var page = path.split("/").pop();
       return page;
    }

    const handleClick = (id) => {
        id = "#" + id;

        if(lastSelectedLink !== id){
            // Remove first
            document.querySelector(lastSelectedLink).classList.remove('navSelectedLink');

            // Add Next   
            setLastSelectedLink(id);
        }
    }

    const handleLogOut = () => {
        Promise.all([UsrCtrlQuery.logOut()]);
    }

    function renderNavrBar(){
        if(logInfo.success){
        return(
            <>
            <Navbar bg="light" data-bs-theme="light">
                <Container id="user-navbar-container">
                    <Nav className="userNav">
                        <Nav.Link href="#userinventory" className="navLink koulen-regular prevent-select" id="userinventory" onClick={() => handleClick("userinventory")}>Check Inventory</Nav.Link>
                        <Nav.Link href="#itemsale" className="navLink koulen-regular prevent-select" id="itemsale" onClick={() => handleClick("itemsale")}>Item Sale</Nav.Link>
                        <Nav.Link href="/" className="navLink koulen-regular prevent-select" onClick={() => handleLogOut()}>Log Out</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </>
            )
        }
    }

    return(
        <>
        {renderNavrBar()}
        </>
    )
};

export default UserNavbar;