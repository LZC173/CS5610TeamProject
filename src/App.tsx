import Labs from "./Labs";
import {HashRouter, Routes} from "react-router-dom";
import {Navigate, Route} from "react-router";
import Kambaz from "./Kambaz";
export default function App() {
    return (
        <HashRouter>
            <div>
                <Routes>
                    <Route path="/" element={<Navigate to="Kambaz" />} />
                    <Route path="/Labs/*" element={<Labs />} />
                    <Route path="/Kambaz/*" element={<Kambaz />} />
                </Routes>
            </div>
        </HashRouter>
    );
}