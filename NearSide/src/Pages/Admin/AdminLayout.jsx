import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import './AdminLayout.css';

function AdminLayout(){

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