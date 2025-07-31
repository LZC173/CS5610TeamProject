import {HashRouter, Routes} from "react-router-dom";
import {Navigate, Route} from "react-router";
import Kambaz from "./Kambaz";
import store from "./Kambaz/store";
import { Provider } from "react-redux";

export default function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <div>
                    <Routes>
                        <Route path="/" element={<Navigate to="Kambaz"/>}/>
                        <Route path="/Kambaz/*" element={<Kambaz/>}/>
                    </Routes>
                </div>
            </Provider>

        </HashRouter>
    );
}