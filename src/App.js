import Votes from "./components/Votes/Votes";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Vote from './pages/Vote'
import Layout from "./layout/Layout";
import NotFound from "./pages/NotFound";
import Main from "./pages/Main";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/login" element={<></>} />
                    <Route path="/votes" element={<Votes />} />
                    <Route path="/votes/:id" element={<Vote />}/>
                    <Route path="/settings" element={<></>} />
                    <Route path="*" element={<NotFound />}/>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
