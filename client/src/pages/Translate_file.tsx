import React, { useState } from "react";
import Tesseract from "tesseract.js";
import mammoth from "mammoth";  
import * as pdfjsLib from "pdfjs-dist/webpack";
import cn from "./style.module.css";

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;

export function Translate_file() {
    const [fileText, setFileText] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);

    function handleFileUpload(event) {
        const uploadedFile = event.target.files[0];
        const fileType = uploadedFile.type;
        setIsProcessing(true);

        // Обработка изображения (OCR)
        if (fileType.startsWith("image")) {
            Tesseract.recognize(uploadedFile, 'eng', {
                logger: (m) => console.log(m),
            })
            .then(({ data: { text } }) => {
                setFileText(text);
                setIsProcessing(false);
            })
            .catch((error) => {
                console.error("Ошибка OCR:", error);
                setIsProcessing(false);
            });
        }

        // Обработка PDF
        else if (fileType === "application/pdf") {
            const fileReader = new FileReader();
            fileReader.onload = function () {
                const pdfData = new Uint8Array(this.result);
                pdfjsLib.getDocument(pdfData).promise.then(function (pdf) {
                    let fullText = "";
                    let pagePromises = [];

                    // Прочитать все страницы
                    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                        pagePromises.push(
                            pdf.getPage(pageNum).then(function (page) {
                                return page.getTextContent().then(function (textContent) {
                                    fullText += textContent.items.map(item => item.str).join(" ") + "\n";
                                });
                            })
                        );
                    }

                    // Когда все страницы загружены
                    Promise.all(pagePromises).then(() => {
                        setFileText(fullText);
                        setIsProcessing(false);
                    });

                }).catch((error) => {
                    console.error("Ошибка при загрузке PDF:", error);
                    setIsProcessing(false);
                });
            };
            fileReader.readAsArrayBuffer(uploadedFile);
        }

        // Обработка TXT
        else if (fileType === "text/plain") {
            const reader = new FileReader();
            reader.onload = function (e) {
                setFileText(e.target.result);
                setIsProcessing(false);
            };
            reader.readAsText(uploadedFile);
        }

        // Обработка DOCX
        else if (fileType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            const reader = new FileReader();
            reader.onload = function (e) {
                mammoth.extractRawText({ arrayBuffer: e.target.result })
                    .then(function (result) {
                        setFileText(result.value);
                        setIsProcessing(false);
                    })
                    .catch(function (err) {
                        console.error("Ошибка при обработке DOCX:", err);
                        setIsProcessing(false);
                    });
            };
            reader.readAsArrayBuffer(uploadedFile);
        } else {
            setIsProcessing(false);
            alert("Неподдерживаемый формат файла.");
        }
    }

    return (
        <div className={cn.container}>
            <div className={cn.title}>
                <h3>Распознать текст онлайн с картинки</h3>
                <a href="/">Перевести текст</a>
            </div>

            <div className={cn.fileUploadArea}>
                <input 
                    type="file" 
                    onChange={handleFileUpload} 
                    className={cn.fileInput}
                    accept="image/*, .pdf, .txt, .docx"
                />
                <div className={cn.dragDrop}>
                    <p>Перетащите файл сюда или выберите файл для загрузки</p>
                </div>
            </div>

            {isProcessing && <p className={cn.processingText}>Обработка файла...</p>}

            <textarea
                value={fileText}
                onChange={(e) => setFileText(e.target.value)}
                readOnly
                className={cn.resultText}
                placeholder="Распознанный текст из файла отобразится здесь..."
            />


            <div className={cn.description}>
                <h2>Переводчик по фото</h2>
                <p>На этой странице пользователи могут загружать фотографии с текстом, и сервис автоматически распознает текст на изображении с помощью технологии оптического распознавания символов (OCR), а затем переводит его на 10 различных языков. Это идеальный инструмент для перевода текстов с изображений, таких как вывески, документы, рекламные материалы и другие визуальные материалы.</p>
            </div>  
        </div>
    );
}
