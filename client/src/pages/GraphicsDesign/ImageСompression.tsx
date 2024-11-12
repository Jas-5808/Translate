import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import 'bootstrap/dist/css/bootstrap.min.css';
import cn from "../style.module.css";

export function ImageCompression() {
    const [image, setImage] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [imageSize, setImageSize] = useState(null);
    const [compressedImageSize, setCompressedImageSize] = useState(null);
    const [compressionError, setCompressionError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [modalImage, setModalImage] = useState("");

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
            <div className="container mt-4">
                <div className={cn.title}>
                    <ul >
                        <li><a href="/currencyConverter">Конвертер изображений</a></li>
                    </ul>
                    <div className="text-center mb-4">
                        <h3>Сжатие изображений</h3>
                        <p className="lead text-muted">Сжать JPG, PNG, SVG или GIF с самым лучшим качеством и сжатием. Уменьшить размер файла с вашими изображениями одновременно.</p>
                    </div>
                </div>
                
                <div className="d-flex justify-content-center align-items-center flex-column">
                    <div className="mb-3">
                        <label className="form-label">Выберите изображение для сжатия:</label>
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
                                <h5>Исходное изображение:</h5>
                                <img 
                                    src={image} 
                                    alt="Uploaded" 
                                    className="img-fluid" 
                                    style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }} 
                                    onClick={() => openModal(image)} 
                                />
                                <p>Размер: {imageSize} KB</p>
                            </div>

                            <div className="col-md-6 text-center">
                                <h5>Сжато изображение:</h5>
                                <img 
                                    src={compressedImage} 
                                    alt="Compressed" 
                                    className="img-fluid" 
                                    style={{ maxWidth: '100%', height: 'auto', cursor: 'pointer' }} 
                                    onClick={() => openModal(compressedImage)} 
                                />
                                <p>Размер после сжатия: {compressedImageSize} KB</p>
                                <button className="btn btn-primary mt-3" onClick={downloadCompressedImage}>Скачать сжатое изображение</button>
                                <button className="btn btn-secondary mt-3" onClick={reCompressImage}>Сжать еще раз</button>
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
        </>
    );
}
