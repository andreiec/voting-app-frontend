import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, automaticLogout, userActions } from "./store";
import React, { Fragment, useState, useEffect } from "react";
import SingleVote from "./pages/SingleVote";
import AllVotes from "./pages/AllVotes";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import AllGroups from "./pages/AllGroups";
import CreateVote from "./pages/CreateVote";
import VoteConfirmed from "./components/Votes/VoteConfirmed";
import Admin from "./pages/Admin/Admin";
import AdminVotes from "./pages/Admin/AdminVotes";
import AdminGroups from "./pages/Admin/AdminGroups";
import AdminUsers from "./pages/Admin/AdminUsers";
import AdminVoteDetails from "./pages/Admin/AdminVoteDetails";
import AdminVotesArchived from "./pages/Admin/AdminVotesArchived";
import apiClient from "./http-common";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import AdminGroupDetails from "./pages/Admin/AdminGroupDetails";
import CreateGroup from "./pages/CreateGroup";
import AdminUserDetails from "./pages/Admin/AdminUserDetails";
import CreateUser from "./pages/CreateUser";
import AdminVoteDetailsArchived from "./pages/Admin/AdminVoteDetailsArchived";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import SingleGroup from "./pages/SingleGroup";
import { toast, useToast } from "@chakra-ui/react";


const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime * 1000).getTime();

    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
}


function App() {
    const authSelector = useSelector((selector) => selector.auth);
    const toast = useToast();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const fetchUser = () => {
        let requestConfig = {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
            },
        };

        apiClient
            .get(`users/${authSelector.userID}/`, requestConfig)
            .then((response) => {
                setUser(response.data);
                dispatch(userActions.setUser(response.data))
                setIsLoading(false);
            })
            .catch((error) => {
                dispatch(userActions.removeUser());
                dispatch(authActions.logout());
                toast({
                    title: 'A ap??rut o eroare!',
                    status: 'error',
                    position: 'top',
                    duration: 4000,
                    isClosable: true,
                })
            });
    };


    useEffect(() => {
        if (authSelector.isLoggedIn) {
            setIsLoading(true);
            fetchUser();
            const remainingTime = calculateRemainingTime(jwt_decode(Cookies.get("token"))["exp"]);
            dispatch(automaticLogout(remainingTime));
        } else {
            setIsLoading(false);
        }
    }, [authSelector.isLoggedIn]);


    return (
        <BrowserRouter>
            {!isLoading &&
                <Routes>
                    {user && authSelector.isLoggedIn && (
                        <Route element={<Layout />}>
                            <Route index element={<Main />} />
                            <Route path="votes" element={<AllVotes />} />
                            <Route path="votes/:id" element={<SingleVote />} />
                            <Route path="groups" element={<AllGroups />} />
                            <Route path="groups/:id" element={<SingleGroup />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="vote-confirmed" element={<VoteConfirmed />} />
                            
                            {user.is_staff && (
                                <>
                                <Route path="create-vote" element={<CreateVote />} />
                                <Route path="create-group" element={<CreateGroup />} />
                                <Route path="create-user" element={<CreateUser />} />
                                <Route path="admin" element={<Admin />} />
                                <Route path="admin/votes" element={<AdminVotes />} />
                                <Route path="admin/votes/:id" element={<AdminVoteDetails />} />
                                <Route path="admin/votes/archived" element={<AdminVotesArchived />} />
                                <Route path="admin/votes/archived/:id" element={<AdminVoteDetailsArchived />} />
                                <Route path="admin/groups" element={<AdminGroups />} />
                                <Route path="admin/groups/:id" element={<AdminGroupDetails />} />
                                <Route path="admin/users" element={<AdminUsers />} />
                                <Route path="admin/users/:id" element={<AdminUserDetails />} />
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
                        <>
                        <Route path="login" element={<Login />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        </>
                    )}

                    {!authSelector.isLoggedIn && (
                        <Route path="*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            }
        </BrowserRouter>
    );
}

export default App;
