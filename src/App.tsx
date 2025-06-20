import {HashRouter, Navigate, Route, Routes} from "react-router-dom";
import SocialNetwork from "./index.tsx";
import {Provider} from "react-redux";
import store from "./store.ts";

export default function App() {
    return (
        <HashRouter>
            <Provider store={store}>
                <div className={"sn-bg-cream"}>
                    <Routes>
                        <Route path={"/"} element={<Navigate to={"GoodBooks"} />} />
                        <Route path={"/GoodBooks/*"} element={<SocialNetwork />} />
                    </Routes>
                </div>
            </Provider>
        </HashRouter>
    );
}