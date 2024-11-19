import './App.css'
import { Outlet, useParams, useNavigate } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Leftside } from './components/Leftside'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import '../i18n';

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
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
