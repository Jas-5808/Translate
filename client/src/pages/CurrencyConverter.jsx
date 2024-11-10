import React, { useState, useCallback } from "react";
import * as pdfjsLib from "pdfjs-dist";
import mammoth from "mammoth";
import { jsPDF } from "jspdf";
import JSZip from "jszip"; // Архивация изображений

export function FileConverter() {
    const [file, setFile] = useState(null);
    const [inputType, setInputType] = useState("");
    const [outputType, setOutputType] = useState("");
    const [convertedFile, setConvertedFile] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [dragOver, setDragOver] = useState(false); // Для визуальных эффектов при перетаскивании
    const [fileName, setFileName] = useState(""); // Для отображения имени файла

    pdfjsLib.GlobalWorkerOptions.workerSrc =
        "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js";

    // Функция обработки файла при изменении
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile.size > 10 * 1024 * 1024) { // Ограничение на 10MB
            setError("Файл слишком большой. Пожалуйста, загрузите файл размером не более 10 МБ.");
            return;
        }
        setFile(selectedFile);
        setFileName(selectedFile.name);
        setError("");
        setConvertedFile(null);
        setPreviewImage(null);
        setProgress(0);
        setInputType(selectedFile?.type);

        if (selectedFile?.type.startsWith("image")) {
            setOutputType("image/jpeg");
            previewImageFile(selectedFile);
        } else if (selectedFile?.type === "application/pdf") {
            setOutputType("application/pdf");
        } else if (selectedFile?.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            setOutputType("application/pdf");
        } else if (selectedFile?.type === "text/plain") {
            setOutputType("application/pdf");
        } else {
            setOutputType("");
        }
    };

    // Функция для предварительного просмотра изображения
    const previewImageFile = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(file);
    };

    // Функция для выбора формата вывода
    const handleOutputTypeChange = (e) => {
        setOutputType(e.target.value);
    };

    // Функция конверсии
    const convertFile = async () => {
        if (!file) {
            setError("Пожалуйста, выберите файл.");
            return;
        }

        setLoading(true);
        setProgress(0);

        try {
            // Конвертация изображения
            if (inputType.startsWith("image") && outputType.startsWith("image")) {
                await convertImage();
            }
            // Конвертация PDF
            else if (inputType === "application/pdf" && outputType === "application/pdf") {
                setConvertedFile(URL.createObjectURL(file));
                setLoading(false);
            } else if (inputType === "application/pdf" && outputType.startsWith("image")) {
                await convertPdfToImage();
            }
            // Конвертация Word в PDF
            else if (inputType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" && outputType === "application/pdf") {
                await convertWordToPdf();
            }
            // Конвертация TXT в PDF
            else if (inputType === "text/plain" && outputType === "application/pdf") {
                await convertTxtToPdf();
            }
            else {
                setError("Невозможная конвертация.");
                setLoading(false);
            }
        } catch (err) {
            setError("Произошла ошибка при конверсии.");
            console.error(err);
            setLoading(false);
        }
    };

    // Конвертация изображения в выбранный формат
    const convertImage = async () => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                canvas.toBlob(
                    (blob) => {
                        const newFile = new File([blob], file.name.replace(/\.[^/.]+$/, `.${outputType.split('/')[1]}`), {
                            type: outputType,
                        });
                        setConvertedFile(URL.createObjectURL(newFile));
                        setLoading(false);
                    },
                    outputType,
                    0.95
                );
            };
        };
        reader.readAsDataURL(file);
    };

    // Конвертация PDF в изображения
    const convertPdfToImage = async () => {
        const pdfBytes = await file.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument(pdfBytes).promise;
        const numPages = pdfDoc.numPages;

        let zip = new JSZip();
        let progressIncrement = 100 / numPages;

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdfDoc.getPage(pageNum);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: ctx,
                viewport: viewport,
            }).promise;

            const imageData = canvas.toDataURL(outputType);
            zip.file(`page_${pageNum}.jpg`, imageData.split(',')[1], { base64: true });

            // Обновляем прогресс
            setProgress((prevProgress) => prevProgress + progressIncrement);
        }

        // Создаем и загружаем архив
        zip.generateAsync({ type: "blob" }).then(function (content) {
            const newFile = new File([content], "converted_images.zip", { type: "application/zip" });
            setConvertedFile(URL.createObjectURL(newFile));
            setLoading(false);
        });
    };

    // Конвертация Word в PDF
    const convertWordToPdf = async () => {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        const htmlContent = result.value;

        const pdf = new jsPDF();
        pdf.html(htmlContent, {
            callback: function (pdfInstance) {
                const pdfOutput = pdfInstance.output("blob");
                const newFile = new File([pdfOutput], file.name.replace(/\.[^/.]+$/, ".pdf"), {
                    type: "application/pdf",
                });
                setConvertedFile(URL.createObjectURL(newFile));
                setLoading(false);
            },
            x: 10,
            y: 10,
            width: 180,
            height: 280,
        });
    };

    // Конвертация TXT в PDF
   // Конвертация TXT в PDF с улучшением для длинных строк и пустых строк
const convertTxtToPdf = async () => {
    // Чтение текстового файла
    const text = await file.text();

    // Инициализация объекта jsPDF
    const pdf = new jsPDF();

    // Настройка шрифта и размеров
    pdf.setFontSize(12);
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 10; // Отступы от края
    const maxWidth = pageWidth - 2 * margin; // Максимальная ширина для текста

    // Разбиваем текст на строки с учетом максимальной ширины
    const textLines = pdf.splitTextToSize(text, maxWidth);

    // Высота строки для текста
    const lineHeight = 6;
    let currentHeight = margin; // Начинаем с верхнего отступа

    // Добавляем текст в PDF с переносом строк и добавлением новой страницы при необходимости
    textLines.forEach(line => {
        // Добавляем строку текста
        pdf.text(line, margin, currentHeight);
        currentHeight += lineHeight;

        // Если текст не помещается на странице, добавляем новую страницу
        if (currentHeight + lineHeight > pdf.internal.pageSize.getHeight() - margin) {
            pdf.addPage();
            currentHeight = margin; // Сбрасываем высоту для новой страницы
        }
    });

    // Генерация PDF и создание файла
    const pdfOutput = pdf.output("blob");
    const newFile = new File([pdfOutput], file.name.replace(/\.[^/.]+$/, ".pdf"), {
        type: "application/pdf",
    });

    // Устанавливаем ссылку на загруженный файл
    setConvertedFile(URL.createObjectURL(newFile));
    setLoading(false);
};


    // Получение доступных типов вывода
    const getAvailableOutputTypes = () => {
        if (inputType.startsWith("image")) {
            return ["image/jpeg", "image/png", "image/gif", "image/bmp"];
        } else if (inputType === "application/pdf") {
            return ["application/pdf", "image/jpeg", "image/png"];
        } else if (inputType === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
            return ["application/pdf"];
        } else if (inputType === "text/plain") {
            return ["application/pdf"];
        } else {
            return [];
        }
    };

    // Обработчик события перетаскивания
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileChange({ target: { files: [droppedFile] } });
        }

        setDragOver(false);
    }, []);

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
    };

    return (
        <div className="container mt-4">
            <div
                className={`file-drop-zone ${dragOver ? "drag-over" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
            >
                <p>Перетащите файл сюда или выберите его</p>
                <input
                    id="fileInput"
                    type="file"
                    className="form-control d-none"
                    onChange={handleFileChange}
                />
                <button
                    className="btn btn-outline-primary mt-3"
                    onClick={() => document.getElementById("fileInput").click()}
                >
                    Выбрать файл
                </button>

                {fileName && (
                    <div className="mt-2">
                        <strong>Выбран файл: </strong>
                        {fileName}
                    </div>
                )}
            </div>

            <div className="form-group mt-4">
                <label htmlFor="outputType">Выберите формат вывода</label>
                <select
                    id="outputType"
                    className="form-control"
                    value={outputType}
                    onChange={handleOutputTypeChange}
                    disabled={!file}
                >
                    <option value="">Выберите формат вывода</option>
                    {getAvailableOutputTypes().map((type) => (
                        <option key={type} value={type}>
                            {type.split("/")[1].toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group mt-4">
                <button
                    className="btn btn-primary w-100"
                    onClick={convertFile}
                    disabled={!outputType || loading}
                >
                    {loading ? "Конвертируется..." : "Конвертировать"}
                </button>
            </div>

            {progress > 0 && progress < 100 && (
                <div className="progress mt-3">
                    <div
                        className="progress-bar progress-bar-striped progress-bar-animated"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>
            )}

            {error && (
                <div className="alert alert-danger mt-3">
                    {error}
                </div>
            )}

            {convertedFile && (
                <div className="mt-3 text-center">
                    <h5>Конвертированный файл:</h5>
                    <a href={convertedFile} download className="btn btn-success">
                        Скачать конвертированный файл
                    </a>
                </div>
            )}
        </div>
    );
}
