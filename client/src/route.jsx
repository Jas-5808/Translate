import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./pages/ErrorPage";
import { Translate } from "./pages/Translate";
import { Translate_file } from "./pages/Translate_file";
import { About } from "./pages/About";
import { ColorPicker } from "./pages/ColorPicker";
import { CurrencyConverter } from "./pages/CurrencyConverter";

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
            {
                path: "/file",
                element: <Translate_file />,
            },
            {
                path: "/about",
                element: <About />,
            },
            {
                path: "/colorPicker",
                element: <ColorPicker />,
            },
            {
                path: "/currencyConverter",
                element: <CurrencyConverter />,
            },

        ],
    }
]);