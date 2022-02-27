import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SingleVote from './pages/SingleVote'
import AllVotes from './pages/AllVotes';
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";
import Login from "./pages/Login"
import Layout from "./layout/Layout"
import { useSelector } from 'react-redux';

function App() {
    const authSelector = useSelector(selector => selector.auth)

    return (
        <BrowserRouter>
            <Routes>
                {authSelector.isLoggedIn &&
                    <Route element={<Layout />}>
                        <Route index element={<Main />} />
                        <Route path="votes" element={<AllVotes />} />
                        <Route path="votes/:id" element={<SingleVote />} />
                        <Route path="settings" element={<></>} />  
                    </Route>
                }
                
                {authSelector.isLoggedIn &&
                    <Route path="*" element={<NotFound />}/>
                }
            
                {!authSelector.isLoggedIn &&
                    <Route index element={<Login />} />
                }
                
                {!authSelector.isLoggedIn &&
                    <Route path='*' element={<Navigate to='/' />} />
                }

            </Routes>
        </BrowserRouter>
    );
}

export default App;
