import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./pages/ErrorPage";
import { Translate } from "./pages/LanguageTools/Translate";
import { Translate_file } from "./pages/LanguageTools/Translate_file";
import { About } from "./pages/About";
import { ColorPicker } from "./pages/GraphicsDesign/ColorPicker";
import { FileConverter } from "./pages/GraphicsDesign/CurrencyConverter";
import { ImageCompression } from "./pages/GraphicsDesign/ImageСompression";
import { Shortener } from "./pages/Shortener";

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
                element: <FileConverter />,
            },
            {
                path: "/imageCompression",
                element: <ImageCompression />,
            },
            {
                path: "/shortener",
                element: <Shortener />,
            },

        ],
    }
]);