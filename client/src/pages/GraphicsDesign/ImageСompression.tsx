import { useState, lazy, Suspense } from 'react';
import imageCompression from 'browser-image-compression';
import 'bootstrap/dist/css/bootstrap.min.css';
import cn from "../style.module.css";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const LanguageSwitcher = lazy(() => import("../../components/LanguageSwitcher"));
const Helmet = lazy(() => import('react-helmet').then(module => ({ default: module.Helmet })));
const Description = lazy(() => import('../../components/Description'));

const ImageCompression = () => {
    const [image, setImage] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [imageSize, setImageSize] = useState(null);
    const [compressedImageSize, setCompressedImageSize] = useState(null);
    const [compressionError, setCompressionError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState("");
    const { t } = useTranslation();
    const location = useLocation();

    const getCurrentLanguage = () => {
      const language = location.pathname.split('/')[1];  
      return language || 'en'; 
    };
  
    const currentLanguage = getCurrentLanguage();


    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                setImageSize((file.size / 1024).toFixed(2));
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 800,
                    useWebWorker: true,
                };
                const compressed = await imageCompression(file, options);
                setCompressedImage(URL.createObjectURL(compressed));
                setImage(URL.createObjectURL(file));
                setCompressedImageSize((compressed.size / 1024).toFixed(2));
                setCompressionError("");
            } catch (error) {
                setCompressionError("Произошла ошибка при сжатии изображения.");
                setCompressedImage(null);
                setCompressedImageSize(null);
            }
        }
    };

    const openModal = (imageSrc) => {
        setModalImage(imageSrc);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalImage("");
    };

    const downloadCompressedImage = () => {
        const a = document.createElement('a');
        a.href = compressedImage;
        a.download = 'compressed-image.jpg';
        a.click();
    };

    const reCompressImage = async () => {
        if (compressedImage) {
            try {
                const compressedFile = await imageCompression(await fetch(compressedImage).then(res => res.blob()), {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 800,
                    useWebWorker: true,
                });
                const compressedURL = URL.createObjectURL(compressedFile);
                setCompressedImage(compressedURL);
                setCompressedImageSize((compressedFile.size / 1024).toFixed(2));
            } catch (error) {
                setCompressionError("Произошла ошибка при повторном сжатии изображения.");
            }
        }
    };

    return (
        <>
            <div className="container p-0">
                <div className={cn.title}>
                    <div className={cn.title_content}>
                        <h3>{t('image_compression')}</h3>
                        <Suspense fallback={null}>
                            <LanguageSwitcher />
                        </Suspense>
                    </div>
                    <ul>
                        <li><a href="/currencyConverter">
                            <i className="fa fa-file-text-o"></i>
                            <p>{t('image_converter')} <span>.jpg, .png, .svg, .gif</span> </p>
                        </a></li>
                    </ul>
                </div>
                
                <div className="d-flex justify-content-center flex-column">
                    <div className="mb-3">
                        <label className="form-label">{t('select_image_for_compression')}</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            className="form-control"
                        />
                    </div>

                    {compressionError && <p className="text-danger">{compressionError}</p>}

                    {image && compressedImage && (
                        <div className="row mt-4">
                            <div className="col-md-6 text-center">
                                <h5>{t('original_image')}</h5>
                                <img 
                                    src={image} 
                                    alt="Uploaded" 
                                    className="img-fluid border rounded shadow mb-2" 
                                    style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }} 
                                    onClick={() => openModal(image)} 
                                />
                                <p>{t('size')} {imageSize} KB</p>
                            </div>

                            <div className="col-md-6 text-center">
                                <h5>{t('compressed_image')}</h5>
                                <img 
                                    src={compressedImage} 
                                    alt="Compressed" 
                                    className="img-fluid border rounded shadow mb-2" 
                                    style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }} 
                                    onClick={() => openModal(compressedImage)} 
                                />
                                <p>{t('size_after_compression')} {compressedImageSize} KB</p>
                                <button className="btn btn-success mt-3" onClick={downloadCompressedImage}>{t('download_compressed_image')}</button>
                                <button className="btn btn-primary mt-3 ml-3" onClick={reCompressImage}>{t('compress_again')}</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal show" style={{ display: 'block', }} onClick={closeModal}>
                    <div className="modal-dialog modal-dialog-centered" 
                        style={{ maxWidth: '100%', maxHeight: '100vh', padding: '0', margin: '0' }} 
                        onClick={(e) => e.stopPropagation()}>
                        <div className="modal-body text-center">
                            <img 
                                src={modalImage} 
                                alt="Modal View" 
                                className="img-fluid" 
                                style={{ width: '100%', height: 'auto', maxHeight: '90vh', objectFit: 'contain' }} 
                            />
                        </div>
                    </div>
                </div>
            )}


        <Suspense fallback={null}>
            <Description 
            title="image_size_reduction" 
            description="image_size_reduction_description" 
            />
        </Suspense>
        
        <Suspense fallback={null}>
            <Helmet>
                <html lang={currentLanguage} />
                <title>{t('image_size_reduction')}</title>
                <meta name="description" content={t('image_size_reduction_description')} />
                <meta name="keywords" content={t('imageSize_page_keywords')} />

                <link rel="alternate" href="https://sneptool.com/en/imageCompression" hrefLang="en" />
                <link rel="alternate" href="https://sneptool.com/ru/imageCompression" hrefLang="ru" />
                <link rel="alternate" href="https://sneptool.com/uz/imageCompression" hrefLang="uz" />
                <link rel="alternate" href="https://sneptool.com/tr/imageCompression" hrefLang="tr" />
                <link rel="alternate" href="https://sneptool.com/ky/imageCompression" hrefLang="ky" />
                <link rel="alternate" href="https://sneptool.com/fr/imageCompression" hrefLang="fr" />
                <link rel="alternate" href="https://sneptool.com/es/imageCompression" hrefLang="es" />
                <link rel="alternate" href="https://sneptool.com/de/imageCompression" hrefLang="de" />
                <link rel="alternate" href="https://sneptool.com/zh/imageCompression" hrefLang="zh" />
                <link rel="alternate" href="https://sneptool.com/ar/imageCompression" hrefLang="ar" />
                <link rel="alternate" href="https://sneptool.com/cs/imageCompression" hrefLang="cs" />
            </Helmet>
        </Suspense>

        </>
    );
}

export default ImageCompression;