import React, {useEffect} from "react";
import { Outlet } from "react-router-dom";
import UsrCtrlQuery from "../../Comms/UserControlQueries";
import AdminNavbar from "./AdminNavbar";
import './AdminLayout.css';

function AdminLayout(){

    useEffect(() => {
        window.addEventListener('beforeunload', logOutUser);

        return () => {
            window.removeEventListener('beforeunload', logOutUser);
        }
    })

    const logOutUser = (e) => {
        e.preventDefault();
        Promise.all([UsrCtrlQuery.logOut()]);
        e.returnValue = '';
    }

    return(
        <>
            <AdminNavbar />
            <main>
                <Outlet />
            </main>
        </>
    )
};

export default AdminLayout;