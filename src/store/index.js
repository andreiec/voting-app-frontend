import { createSlice, configureStore } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

let initialAuthState = {
    token: null,
    isLoggedIn: false,
    userID: null,
};

let initialUserState = {
    id: null,
    email: null,
    first_name: null,
    last_name: null,
    group: null,
    date_joined: null,
    is_staff: false
};

const tokenFromCookie = Cookies.get("token");

if (tokenFromCookie) {
    initialAuthState = {
        token: tokenFromCookie,
        isLoggedIn: true,
        userID: jwt_decode(tokenFromCookie)["id"],
    };
}

const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload['id'];
            state.email = action.payload['email'];
            state.first_name = action.payload['first_name'];
            state.last_name = action.payload['last_name'];
            state.group_id = action.payload['group']['id'];
            state.group_name = action.payload['group']['name'];
            state.date_joined = action.payload['date_joined'];
            state.is_staff = action.payload['is_staff'];
        },

        removeUser(state) {
            state.id = null;
            state.email = null;
            state.first_name = null;
            state.last_name = null;
            state.group_id = null;
            state.group_name = null;
            state.date_joined = null;
            state.is_staff = false;
        }
    }
})


const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            Cookies.set("token", action.payload, {
                expires: 1,
                sameSite: "strict",
                secure: true,
            });
            state.isLoggedIn = true;
            state.token = action.payload;
            state.userID = jwt_decode(action.payload)["id"];
        },

        logout(state) {
            Cookies.remove("token");
            state.isLoggedIn = false;
            state.token = null;
            state.userID = null;
        },
    },
});

const store = configureStore({
    reducer: {
        // Place reducers here
        auth: authSlice.reducer,
        user: userSlice.reducer,
    },
});

export const authActions = authSlice.actions;
export const userActions = userSlice.actions;
export default store;
