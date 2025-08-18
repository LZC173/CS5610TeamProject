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

                      <footer className="mt-5 border-top py-3 text-center small">
                        <div>
                        <a href="https://github.com/LZC173/CS5610TeamProject/tree/feature/quizzes-page" target="_blank" rel="noreferrer">
                            Frontend Repository
                        </a>
                        {" | "}
                        <a href="https://github.com/Anirudh938/Kambaz-node-server-app/tree/project" target="_blank" rel="noreferrer">
                            Server Repository
                        </a>
                        </div>
                        <div>Team: Liangzhu Chen, Nina Gharachorloo, Anirudh Revalli</div>
                    </footer>
                </div>

            
            </Provider>

        </HashRouter>
    );
}