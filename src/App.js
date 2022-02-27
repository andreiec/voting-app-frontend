import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SingleVote from './pages/SingleVote'
import AllVotes from './pages/AllVotes';
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Login from "./pages/Login"
import Layout from "./layout/Layout"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="votes" element={<AllVotes />} />
                    <Route path="votes/:id" element={<SingleVote />} />
                    <Route path="settings" element={<></>} />  
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
