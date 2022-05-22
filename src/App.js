import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { Fragment } from "react";
import SingleVote from "./pages/SingleVote";
import AllVotes from "./pages/AllVotes";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import AllGroups from "./pages/AllGroups";
import CreateVote from "./pages/CreateVote";
import VoteConfirmed from "./pages/VoteConfirmed";
import Admin from "./pages/Admin/Admin";
import AdminVotes from "./pages/Admin/AdminVotes";
import AdminGroups from "./pages/Admin/AdminGroups";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminVoteDetails from "./pages/Admin/AdminVoteDetails";

function App() {
    const authSelector = useSelector((selector) => selector.auth);
    const userSelector = useSelector((selector) => selector.user);

    return (
        <BrowserRouter>
            <Routes>
                {authSelector.isLoggedIn && (
                    <Route element={<Layout />}>
                        <Route index element={<Main />} />
                        <Route path="votes" element={<AllVotes />} />
                        <Route path="votes/:id" element={<SingleVote />} />
                        <Route path="groups" element={<AllGroups />} />
                        <Route path="settings" element={<></>} />
                        <Route path="vote-confirmed" element={<VoteConfirmed />} />
                        
                        {userSelector.is_staff && (
                            <>
                            <Route path="create-vote" element={<CreateVote />} />
                            <Route path="admin" element={<Admin />} />
                            <Route path="admin/votes" element={<AdminVotes />} />
                            <Route path="admin/votes/:id" element={<AdminVoteDetails />} />
                            <Route path="admin/groups" element={<AdminGroups />} />
                            <Route path="admin/users" element={<AdminUsers />} />
                            </>
                        )}
                        
                    </Route>
                )}

                {authSelector.isLoggedIn && (
                    <Fragment>
                        <Route path="not-found" element={<NotFound />} />
                        <Route path="*" element={<NotFound />} />
                    </Fragment>
                )}

                {!authSelector.isLoggedIn && (
                    <Route path="login" element={<Login />} />
                )}

                {!authSelector.isLoggedIn && (
                    <Route path="*" element={<Navigate to="/login" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
