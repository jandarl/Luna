import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import UsrCtrlQuery from "../../Comms/UserControlQueries";
import UserNavbar from "./UserNavBar";
import './UserLayout.css';

function UserLayout(){

    useEffect(() => {
        window.addEventListener('beforeunload', logOutUser);
        checkIfAdmin();

        return () => {
            window.removeEventListener('beforeunload', logOutUser);
        }
    })

    const logOutUser = (e) => {
        e.preventDefault();
        Promise.all([UsrCtrlQuery.logOut()]);
        e.returnValue = '';
    }

    const checkIfAdmin =() => {
         var logInfo = UsrCtrlQuery.getLogInfo();
         if(logInfo.type === 1){
            e.preventDefault();
            Promise.all([UsrCtrlQuery.logOut()]);
            e.returnValue = '';
        }
    }

    return(
        <>
            <UserNavbar />
            <main>
                <Outlet />
            </main>
        </>
    )
};

export default UserLayout;