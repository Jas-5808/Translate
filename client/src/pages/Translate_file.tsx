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
            <h3 className={cn.title}>Распознать текст онлайн с картинки</h3>
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
                className={cn.resultText}
                placeholder="Распознанный текст из файла отобразится здесь..."
            />
        </div>
    );
}
