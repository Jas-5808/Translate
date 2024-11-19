import { useState, useEffect } from 'react';
import abduvoxit from '../assets/photo_2023-02-21_17-43-26.jpg';
import jasur from '../assets/photo_2023-04-22_10-55-11.jpg';
import youtubeTemplate from '../assets/youtube_img.jpg';
import Movie_App from '../assets/Movie_App.jpg';
import portfolio from '../assets/portfolio.png';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';


export function About() {
    const [selectedTemplate, setSelectedTemplate] = useState(null); 
    const { t } = useTranslation();


    const templates = [
        {
            id: 1,
            name: 'Шаблон YouTube',
            description: 'Качественная верстка страницы YouTube с адаптивным дизайном. Это шаблон с возможностью адаптироваться под разные устройства и экраны, что делает его универсальным для разных типов пользователей.',
            price: '$6',
            image: youtubeTemplate,
        },
        {
            id: 2,
            name: 'Movie App With Search Function',
            description: 'Качественная верстка страницы YouTube с адаптивным дизайном. Это шаблон с возможностью адаптироваться под разные устройства и экраны, что делает его универсальным для разных типов пользователей.',
            price: '$4',
            image: Movie_App,
        },
        {
            id: 3,
            name: 'Портфолио для работы',
            description: 'Качественная верстка страницы YouTube с адаптивным дизайном. Это шаблон с возможностью адаптироваться под разные устройства и экраны, что делает его универсальным для разных типов пользователей.',
            price: '$2',
            image: portfolio,
        },
    ];

    useEffect(() => {
        const hash = window.location.hash;

        const timeoutId = setTimeout(() => {
            if (hash) {
                const element = document.querySelector(hash);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }, 0); 

        return () => clearTimeout(timeoutId);
    }, []);
    
    const handleCardClick = (template) => {
        setSelectedTemplate(template);
    };

    const closeModal = () => {
        setSelectedTemplate(null);
    };

    const getShortDescription = (description) => {
        return description.length > 50 ? description.substring(0, 50) + '...' : description;
    };



    return (
        <>
            <div className="container">
                <h1 className="text-center">{t('about_us')}</h1>
                <p className="text-center mb-5">
                    {t('website_description')}
                </p>

                <div className="row">
                    <a href="/abduvoxit" className="col-md-6 mb-4 text-decoration-none">
                        <div className="card shadow-sm">
                            <img
                                src={abduvoxit}
                                alt="Abduvoxit"
                                className="card-img-top"
                            />
                            <div className="card-body text-center">
                                <h3 className="card-title">Abduvoxit</h3>
                                <p className="card-text">
                                    {t('specialist_description')}
                                </p>
                            </div>
                        </div>
                    </a>

                    <a href="/jasur" className="col-md-6 mb-4 text-decoration-none">
                        <div className="card shadow-sm">
                            <img
                                src={jasur}
                                alt="Jasur"
                                className="card-img-top"
                            />
                            <div className="card-body text-center">
                                <h3 className="card-title">Jasur</h3>
                                <p className="card-text">
                                    {t('developer_description')}
                                </p>
                            </div>
                        </div>
                    </a>
                </div>

                <div className="text-center mt-5">
                    <h2>{t('pricing_for_website_development')}</h2>
                    <p
                        dangerouslySetInnerHTML={{
                        __html: t('contact_for_website_development')
                        }}
                    />

                </div>

                <div className="mt-5" id="order-site">
                    <h2 className="mb-3">{t('pricing_for_templates')}</h2>
                    <div className="row">
                        {templates.map((template) => (
                            <div
                                key={template.id}
                                className="col-md-4"
                                onClick={() => handleCardClick(template)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="card shadow-sm">
                                    <img
                                        src={template.image}
                                        alt={template.name}
                                        className="card-img-top"
                                    />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{template.name}</h5>
                                        <p className="card-text">{getShortDescription(template.description)}</p>
                                        <p className="text-primary fw-bold mb-0">{template.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {selectedTemplate && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{selectedTemplate.name}</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body text-center">
                                <img
                                    src={selectedTemplate.image}
                                    alt={selectedTemplate.name}
                                    className="img-fluid mb-3"
                                />
                                <p>{selectedTemplate.description}</p>
                                <p className="text-primary fw-bold">{selectedTemplate.price}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                                    Закрыть
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        <Helmet>
            <title>{t('order_website')}</title>
            <meta name="description" content={t('order_website_description')} />
            <meta name="keywords" content={t('order_website_keywords')} />
        </Helmet>
        </>
    );
}
