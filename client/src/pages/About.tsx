import { useState, useEffect } from 'react';
import abduvoxit from '../assets/photo_2023-02-21_17-43-26.jpg';
import jasur from '../assets/photo_2023-04-22_10-55-11.jpg';
import youtubeTemplate from '../assets/youtube_img.jpg';
import Movie_App from '../assets/Movie_App.jpg';
import portfolio from '../assets/portfolio.png';
import company_img from '../assets/company_img.png';
import Headphones_img from '../assets/Headphones_img.png';
import Admin_img from '../assets/Admin.jpg';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import cn from "./style.module.css";
const About = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(null); 
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

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
        {
            id: 4,
            name: 'Портфолио для работы',
            description: 'Качественная верстка страницы YouTube с адаптивным дизайном. Это шаблон с возможностью адаптироваться под разные устройства и экраны, что делает его универсальным для разных типов пользователей.',
            price: '$5',
            image: company_img,
        },
        {
            id: 5,
            name: 'Портфолио для работы',
            description: 'Качественная верстка страницы YouTube с адаптивным дизайном. Это шаблон с возможностью адаптироваться под разные устройства и экраны, что делает его универсальным для разных типов пользователей.',
            price: '$4',
            image: Headphones_img,
        },
        {
            id: 6,
            name: 'Портфолио для работы',
            description: 'Качественная верстка страницы YouTube с адаптивным дизайном. Это шаблон с возможностью адаптироваться под разные устройства и экраны, что делает его универсальным для разных типов пользователей.',
            price: '$2',
            image: Admin_img,
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

    const indexOfLastTemplate = currentPage * itemsPerPage;
    const indexOfFirstTemplate = indexOfLastTemplate - itemsPerPage;
    const currentTemplates = templates.slice(indexOfFirstTemplate, indexOfLastTemplate);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(templates.length / itemsPerPage);

    return (
        <>
            <div className="container">
                <h1 className="text-center">{t('about_us')}</h1>
                <p className="text-center mb-5">
                    {t('website_description')}
                </p>

                <div className="row">
                    <a href="https://t.me/abduvoxit260803" className="col-md-6 mb-4 text-decoration-none">
                        <div className="card shadow-sm">
                            <img
                                src={abduvoxit}
                                alt="Abduvoxit"
                                className="card-img-top"
                                loading="lazy"
                            />
                            <div className="card-body text-center">
                                <h3 className="card-title">Abduvoxit</h3>
                                <p className="card-text">
                                    {t('specialist_description')}
                                </p>
                            </div>
                        </div>
                    </a>

                    <a href="https://t.me/int_5808" className="col-md-6 mb-4 text-decoration-none">
                        <div className="card shadow-sm">
                            <img
                                src={jasur}
                                alt="Jasur"
                                className="card-img-top"
                                loading="lazy"
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
                    <div className="row" style={{ display: "flex", rowGap: "16px" }}>
                        {currentTemplates.map((template) => (
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
                                        className={cn.card_img}
                                        loading="lazy"
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

                <div className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                        {[...Array(totalPages)].map((_, index) => (
                            <li
                                key={index + 1}
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => paginate(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {selectedTemplate && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <div className="modal-dialog modal-lg ">
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
                                    loading="lazy"
                                />
                                <p>{selectedTemplate.description}</p>
                                <p className="text-primary fw-bold">{selectedTemplate.price}</p>
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

export default About;
