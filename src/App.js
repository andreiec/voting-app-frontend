import Votes from "./components/Votes/Votes";
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Vote from './pages/Vote'
import Layout from "./layout/Layout";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Navigate to='/login'/>} />
                    <Route path="/login" element={<></>} />
                    <Route path="/votes" element={<Votes />} />
                    <Route path="/votes/:id" element={<Vote />}/>
                    <Route path="/settings" element={<></>} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
