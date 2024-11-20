import './App.css'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Leftside from './components/Leftside'
import { useEffect, lazy, Suspense, } from 'react'
import { useTranslation } from 'react-i18next';
import '../i18n';

const Footer = lazy(() => import('./components/Footer'));

function App() {
  const { lang } = useParams(); 
  const { i18n } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    const supportedLanguages = ['en', 'ru', 'uz', 'tr', 'ky', 'fr', 'es', 'de', 'zh', 'ar', 'cs'];
    
    if (lang && supportedLanguages.includes(lang)) {
      i18n.changeLanguage(lang); 
    } else if (lang && !supportedLanguages.includes(lang)) {
      navigate('/en'); 
    }
  }, [lang, i18n, navigate]);

  return (
    <>
      <div className="allbody">
        <Leftside />
        <div className="wrapper">
          <Header />
          <div className="main">
            <Outlet />
          </div>
          <Suspense fallback={null}>
            <Footer />
          </Suspense>
        </div>
      </div>
    </>
  );
}

export default App;
