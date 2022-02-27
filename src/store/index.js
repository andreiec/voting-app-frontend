import { createSlice, configureStore } from '@reduxjs/toolkit'


let initialAuthState = {
    token: '',
    isLoggedIn: false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, token) {
            state.isLoggedIn = true;
            state.token = token;
        },
        logout(state){
            state.isLoggedIn = false;
            state.token = null;
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