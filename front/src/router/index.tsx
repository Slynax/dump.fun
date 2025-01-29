import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Home} from '../pages/Home';
import {Token} from "../pages/Token";

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/token/:tokenId" element={<Token />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
