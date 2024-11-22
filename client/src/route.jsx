import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { ErrorPage } from "./pages/ErrorPage";
import { Suspense, lazy } from "react"; 

const Translate = lazy(() => import("./pages/LanguageTools/Translate"));
const Translate_file = lazy(() => import("./pages/LanguageTools/Translate_file"));
const About = lazy(() => import("./pages/About"));
const ColorPicker = lazy(() => import("./pages/GraphicsDesign/ColorPicker"));
const FileConverter = lazy(() => import("./pages/GraphicsDesign/CurrencyConverter"));
const ImageCompression = lazy(() => import("./pages/GraphicsDesign/ImageСompression"));
const Shortener = lazy(() => import("./pages/Shortener"));
const QRCodeGenerator = lazy(() => import("./pages/QRCodeGenerator"));
const ColorMixer = lazy(() => import("./pages/GraphicsDesign/ColorMixer"));
const Abduvoxit = lazy(() => import("./pages/Сreators/Abduvoxit"));
const Jasur = lazy(() => import("./pages/Сreators/Jasur"));
const Partners = lazy(() => import("./pages/Сreators/Partners"));
const PasswordGenerator = lazy(() => import("./pages/PasswordGenerator"));

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={null}>
                        <Translate />
                    </Suspense>
                ),
            },
            {
                path: "file",
                element: (
                    <Suspense fallback={null}>
                        <Translate_file />
                    </Suspense>
                ),
            },
            {
                path: "about",
                element: (
                    <Suspense fallback={null}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "colorPicker",
                element: (
                    <Suspense fallback={null}>
                        <ColorPicker />
                    </Suspense>
                ),
            },
            {
                path: "currencyConverter",
                element: (
                    <Suspense fallback={null}>
                        <FileConverter />
                    </Suspense>
                ),
            },
            {
                path: "imageCompression",
                element: (
                    <Suspense fallback={null}>
                        <ImageCompression />
                    </Suspense>
                ),
            },
            {
                path: "shortener",
                element: (
                    <Suspense fallback={null}>
                        <Shortener />
                    </Suspense>
                ),
            },
            {
                path: "qrCodeGenerator",
                element: (
                    <Suspense fallback={null}>
                        <QRCodeGenerator />
                    </Suspense>
                ),
            },
            {
                path: "colorMixer",
                element: (
                    <Suspense fallback={null}>
                        <ColorMixer />
                    </Suspense>
                ),
            },
            {
                path: "abduvoxit",
                element: (
                    <Suspense fallback={null}>
                        <Abduvoxit />
                    </Suspense>
                ),
            },
            {
                path: "jasur",
                element: (
                    <Suspense fallback={null}>
                        <Jasur />
                    </Suspense>
                ),
            },
            {
                path: "partners",
                element: (
                    <Suspense fallback={null}>
                        <Partners />
                    </Suspense>
                ),
            },
            {
                path: "passwordGenerator",
                element: (
                    <Suspense fallback={null}>
                        <PasswordGenerator />
                    </Suspense>
                ),
            },
        ],
    },
    {
        path: "/:lang",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: (
                    <Suspense fallback={null}>
                        <Translate />
                    </Suspense>
                ),
            },
            {
                path: "file",
                element: (
                    <Suspense fallback={null}>
                        <Translate_file />
                    </Suspense>
                ),
            },
            {
                path: "about",
                element: (
                    <Suspense fallback={null}>
                        <About />
                    </Suspense>
                ),
            },
            {
                path: "colorPicker",
                element: (
                    <Suspense fallback={null}>
                        <ColorPicker />
                    </Suspense>
                ),
            },
            {
                path: "currencyConverter",
                element: (
                    <Suspense fallback={null}>
                        <FileConverter />
                    </Suspense>
                ),
            },
            {
                path: "imageCompression",
                element: (
                    <Suspense fallback={null}>
                        <ImageCompression />
                    </Suspense>
                ),
            },
            {
                path: "shortener",
                element: (
                    <Suspense fallback={null}>
                        <Shortener />
                    </Suspense>
                ),
            },
            {
                path: "qrCodeGenerator",
                element: (
                    <Suspense fallback={null}>
                        <QRCodeGenerator />
                    </Suspense>
                ),
            },
            {
                path: "colorMixer",
                element: (
                    <Suspense fallback={null}>
                        <ColorMixer />
                    </Suspense>
                ),
            },
            {
                path: "abduvoxit",
                element: (
                    <Suspense fallback={null}>
                        <Abduvoxit />
                    </Suspense>
                ),
            },
            {
                path: "jasur",
                element: (
                    <Suspense fallback={null}>
                        <Jasur />
                    </Suspense>
                ),
            },
            {
                path: "partners",
                element: (
                    <Suspense fallback={null}>
                        <Partners />
                    </Suspense>
                ),
            },
            {
                path: "passwordGenerator",
                element: (
                    <Suspense fallback={null}>
                        <PasswordGenerator />
                    </Suspense>
                ),
            },
        ],
    },
]);
