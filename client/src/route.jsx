import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./pages/ErrorPage";
import { Translate } from "./pages/Translate";
import { About } from "./pages/About";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Translate />,
            },
        ],
    }
]);