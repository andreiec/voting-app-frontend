import { createSlice, configureStore } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode';


let initialAuthState = {
    token: null,
    isLoggedIn: false,
    userID: null,
}

const tokenFromCookie = Cookies.get('token');

if (tokenFromCookie) {
    initialAuthState = {
        token: tokenFromCookie,
        isLoggedIn: true,
        userID: jwt_decode(tokenFromCookie)['id'],
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            Cookies.set('token', action.payload, { expires: 1, sameSite: 'strict', secure: true });
            state.isLoggedIn = true;
            state.token = action.payload;
            state.userID = jwt_decode(action.payload)['id'];
        },
        logout(state){
            Cookies.remove('token')
            state.isLoggedIn = false;
            state.token = null;
            state.userID = null;
        }
    }
});

const store = configureStore({
    reducer: {
        // Place reducers here
        auth: authSlice.reducer,
    },
});

export const authActions = authSlice.actions;
export default store;