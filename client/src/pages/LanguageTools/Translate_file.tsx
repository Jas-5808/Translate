import cn from "../style.module.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaMicrophone, FaCopy } from 'react-icons/fa';
import Tesseract from 'tesseract.js';
import Select from 'react-select';
import volume from '../../assets/volume.png';
import mammoth from "mammoth";
import { franc } from 'franc-min'; 
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../../components/LanguageSwitcher";
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';



export function Translate_file() {
    const apiKey = 'AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc';
    const { t } = useTranslation();
    const [text, setText] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState({ value: "auto", label: t('placeholder_detect_language') });
    const [targetLanguage, setTargetLanguage] = useState({ value: "en", label: "English" });
    const [translatedText, setTranslatedText] = useState("");
    const [recognition, setRecognition] = useState(null);
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const location = useLocation();

    const getCurrentLanguage = () => {
      const language = location.pathname.split('/')[1];  
      return language || 'en'; 
    };
  
    const currentLanguage = getCurrentLanguage();


    const languageOptions = [
        { value: "auto", label: "Detect Language" },
        { value: "en", label: "English" },
        { value: "es", label: "Spanish" },
        { value: "fr", label: "French" },
        { value: "ru", label: "Russian" },
        { value: "af", label: "Afrikaans" },
        { value: "sq", label: "Albanian" },
        { value: "am", label: "Amharic" },
        { value: "ar", label: "Arabic" },
        { value: "hy", label: "Armenian" },
        { value: "az", label: "Azerbaijani" },
        { value: "eu", label: "Basque" },
        { value: "be", label: "Belarusian" },
        { value: "bn", label: "Bengali" },
        { value: "bs", label: "Bosnian" },
        { value: "bg", label: "Bulgarian" },
        { value: "ca", label: "Catalan" },
        { value: "ceb", label: "Cebuano" },
        { value: "ny", label: "Chichewa" },
        { value: "zh", label: "Chinese" },
        { value: "zh-CN", label: "Chinese (Simplified)" },
        { value: "zh-TW", label: "Chinese (Traditional)" },
        { value: "co", label: "Corsican" },
        { value: "hr", label: "Croatian" },
        { value: "cs", label: "Czech" },
        { value: "da", label: "Danish" },
        { value: "nl", label: "Dutch" },
        { value: "eo", label: "Esperanto" },
        { value: "et", label: "Estonian" },
        { value: "tl", label: "Filipino" },
        { value: "fi", label: "Finnish" },
        { value: "fy", label: "Frisian" },
        { value: "gl", label: "Galician" },
        { value: "ka", label: "Georgian" },
        { value: "de", label: "German" },
        { value: "el", label: "Greek" },
        { value: "gu", label: "Gujarati" },
        { value: "ht", label: "Haitian Creole" },
        { value: "ha", label: "Hausa" },
        { value: "haw", label: "Hawaiian" },
        { value: "iw", label: "Hebrew" },
        { value: "hi", label: "Hindi" },
        { value: "hmn", label: "Hmong" },
        { value: "hu", label: "Hungarian" },
        { value: "is", label: "Icelandic" },
        { value: "ig", label: "Igbo" },
        { value: "id", label: "Indonesian" },
        { value: "ga", label: "Irish" },
        { value: "it", label: "Italian" },
        { value: "ja", label: "Japanese" },
        { value: "jw", label: "Javanese" },
        { value: "kn", label: "Kannada" },
        { value: "kk", label: "Kazakh" },
        { value: "km", label: "Khmer" },
        { value: "ko", label: "Korean" },
        { value: "ku", label: "Kurdish (Kurmanji)" },
        { value: "ky", label: "Kyrgyz" },
        { value: "lo", label: "Lao" },
        { value: "la", label: "Latin" },
        { value: "lv", label: "Latvian" },
        { value: "lt", label: "Lithuanian" },
        { value: "lb", label: "Luxembourgish" },
        { value: "mk", label: "Macedonian" },
        { value: "mg", label: "Malagasy" },
        { value: "ms", label: "Malay" },
        { value: "ml", label: "Malayalam" },
        { value: "mt", label: "Maltese" },
        { value: "mi", label: "Maori" },
        { value: "mr", label: "Marathi" },
        { value: "mn", label: "Mongolian" },
        { value: "my", label: "Myanmar (Burmese)" },
        { value: "ne", label: "Nepali" },
        { value: "no", label: "Norwegian" },
        { value: "ps", label: "Pashto" },
        { value: "fa", label: "Persian" },
        { value: "pl", label: "Polish" },
        { value: "pt", label: "Portuguese" },
        { value: "pa", label: "Punjabi" },
        { value: "ro", label: "Romanian" },
        { value: "sm", label: "Samoan" },
        { value: "gd", label: "Scots Gaelic" },
        { value: "sr", label: "Serbian" },
        { value: "st", label: "Sesotho" },
        { value: "sn", label: "Shona" },
        { value: "sd", label: "Sindhi" },
        { value: "si", label: "Sinhala" },
        { value: "sk", label: "Slovak" },
        { value: "sl", label: "Slovenian" },
        { value: "so", label: "Somali" },
        { value: "su", label: "Sundanese" },
        { value: "sw", label: "Swahili" },
        { value: "sv", label: "Swedish" },
        { value: "tg", label: "Tajik" },
        { value: "ta", label: "Tamil" },
        { value: "te", label: "Telugu" },
        { value: "th", label: "Thai" },
        { value: "tr", label: "Turkish" },
        { value: "uk", label: "Ukrainian" },
        { value: "ur", label: "Urdu" },
        { value: "uz", label: "Uzbek" },
        { value: "vi", label: "Vietnamese" },
        { value: "cy", label: "Welsh" },
        { value: "xh", label: "Xhosa" },
        { value: "yi", label: "Yiddish" },
        { value: "yo", label: "Yoruba" },
        { value: "zu", label: "Zulu" }
    ];
    

    const adjustHeight = (element) => {
        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
    };

    useEffect(() => {
        const textarea = document.querySelector('textarea');
        if (textarea) {
            adjustHeight(textarea);
        }
    }, [text]);

    useEffect(() => {
        if (text && sourceLanguage.value === 'auto') {
            detectLanguage();
        } else if (text) {
            translateText();
        }
    }, [text, targetLanguage, sourceLanguage]);

    useEffect(() => {
        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRec();
            recognitionInstance.lang = sourceLanguage.value;
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            setRecognition(recognitionInstance);
        }
    }, [sourceLanguage]);

    async function detectLanguage() {
        const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
        try {
            const response = await axios.post(url, { q: text }, {
                headers: { 'Content-Type': 'application/json' },
            });
            
            // Получаем код определенного языка
            const detectedLang = response.data.data.detections[0][0].language;
            
            // Ищем язык в списке опций
            const detectedLangOption = languageOptions.find(lang => lang.value === detectedLang);
            
            // Устанавливаем определенный язык или добавляем, если его нет в списке
            setSourceLanguage(detectedLangOption || { value: detectedLang, label: detectedLang.toUpperCase() });
            
            // Выполняем перевод с найденным языком
            translateText();
        } catch (error) {
            console.error("Ошибка определения языка:", error);
        }
    }
    function decodeHtmlEntities(text) {
        const textArea = document.createElement("textarea");
        textArea.innerHTML = text;
        return textArea.value;
    }


    async function translateText() {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        try {
            const response = await axios.post(url, {
                q: text,
                source: sourceLanguage.value === 'auto' ? undefined : sourceLanguage.value,
                target: targetLanguage.value,
            });
            let translated = response.data.data.translations[0].translatedText;
        
            // Декодируем HTML-символы
            translated = decodeHtmlEntities(translated);
            
            setTranslatedText(translated);
        } catch (error) {
            console.error("Ошибка перевода:", error);
            setTranslatedText(t('translation_error'));
        }
    }

    function speakText(text, language) {
        if (!text) {
            alert(t('perform_translation_first'));
            return;
        }
    
        if (!('speechSynthesis' in window)) {
            alert("Ваш браузер не поддерживает озвучивание текста.");
            return;
        }
    
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.volume = 1;
        utterance.rate = 0.9;
        utterance.pitch = 1;
    
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
    }
    

    function startRecognition() {
        if (recognition) {
            recognition.start();
            recognition.onresult = (event) => {
                setText(event.results[0][0].transcript);
            };
            recognition.onerror = (event) => {
                console.error('Ошибка распознавания:', event.error);
            };
        }
    }

    function handleFileUpload(event) {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        setIsProcessing(true);
        setUploadProgress(0); // Сброс прогресса на 0

        const fileExtension = uploadedFile.name.split('.').pop().toLowerCase();

        // Проверка на формат docx
        if (fileExtension === 'docx') {
            const reader = new FileReader();

            reader.onprogress = function (e) {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100); 
                    setUploadProgress(progress); 
                }
            };

            reader.onload = function (e) {
                const arrayBuffer = e.target.result;

                mammoth.extractRawText({ arrayBuffer: arrayBuffer })
                    .then((result) => {
                        setText(result.value);
                        setIsProcessing(false);
                    })
                    .catch((error) => {
                        console.error(t('word_file_error'), error);
                        setIsProcessing(false);
                    });
            };

            reader.readAsArrayBuffer(uploadedFile);
        }
        // Проверка на изображение
        else if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
            const reader = new FileReader();

            reader.onprogress = function (e) {
                if (e.lengthComputable) {
                    const progress = Math.round((e.loaded / e.total) * 100); // Вычисляем процент прогресса
                    setUploadProgress(progress); // Обновляем состояние прогресса
                }
            };

            reader.onload = function (e) {
                const imageUrl = e.target.result;

                // Используем Tesseract для распознавания текста с изображения
                Tesseract.recognize(
                    imageUrl,
                    'eng+rus', // Используем несколько языков для распознавания
                    {
                        logger: (m) => console.log(m), // Логирование процесса
                    }
                ).then(({ data: { text } }) => {
                    const detectedLanguage = franc(text);
                    let language = 'rus'; // Значение по умолчанию (русский)

                    if (detectedLanguage === 'eng') {
                        language = 'eng'; // Если текст на английском
                    } else if (detectedLanguage === 'rus') {
                        language = 'rus'; // Если текст на русском
                    } else {
                        console.log(t('language_detection_failed'));
                    }

                    setText(text); // Выводим распознанный текст
                    setIsProcessing(false);
                }).catch((error) => {
                    console.error(t('ocr_error'), error);
                    setIsProcessing(false);
                });
            };

            reader.readAsDataURL(uploadedFile);
        } else {
            console.error(t('invalid_file_format'));
            setIsProcessing(false);
        }
    }


    function copyToClipboard(textToCopy) {
        navigator.clipboard.writeText(textToCopy);
        alert(t('text_copied'));
    }
    

    return (
        <div className={cn.lol}>
            <div className={cn.title}>
                <div className={cn.title_content}>
                    <h3>{t('recognize_text')}</h3>
                    <LanguageSwitcher/>
                </div>
                <ul>
                    <li><a href="/">
                        <i className="material-symbols-outlined" translate="no">translate</i> 
                        <p>{t('translate_text')} <span>{t('languages_count')}</span> </p>
                    </a></li>
                </ul>
            </div>


            <div className={cn.language_box}>
                <div className={cn.microphone}>
                    <Select
                        options={languageOptions}
                        value={sourceLanguage}
                        onChange={(selected) => setSourceLanguage(selected)}
                        placeholder="Выберите язык оригинала"
                        className={cn.languageSelector}
                    />
                    <div className={cn.text_box}>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t('placeholder_enter_text')}
                        />
                        <div className={cn.equipments}>
                            <button onClick={startRecognition}>
                                <FaMicrophone />
                            </button>

                            <div className={cn.eq_leftside}>
                                <div className={cn.volume}>
                                    <img src={volume} alt="" onClick={() => speakText(text, sourceLanguage.value)} />
                                </div>
                                <button onClick={() => copyToClipboard(text)}>
                                    <FaCopy />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cn.microphone}>
                    <Select
                        options={languageOptions}
                        value={targetLanguage}
                        onChange={(selected) => setTargetLanguage(selected)}
                        placeholder="Выберите целевой язык"
                        className={cn.languageSelector}
                    />
                    <div className={cn.text_box}>
                        <p id="result">{translatedText}</p>

                        <div className={cn.equipments}>
                            <div></div>
                            <div className={cn.eq_leftside}>
                                <div className={cn.volume}>
                                    <img src={volume} alt="" onClick={() => speakText(translatedText, targetLanguage.value)} />
                                </div>

                                <button onClick={() => copyToClipboard(translatedText)}>
                                    <FaCopy />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cn.fileUploadArea}>
                <label htmlFor="fileInput" className={cn.uploadButton}>
                    {t('upload_image')}
                </label>
                <input 
                    type="file" 
                    id="fileInput"
                    onChange={handleFileUpload} 
                    className={cn.fileInput} 
                    accept="image/*, .pdf, .txt, .docx" 
                    hidden 
                />
                <div className={cn.dragDrop}>
                    <small>{t('supported_formats')}, PDF, TXT, DOCX</small>
                </div>
                {isProcessing && (
                    <div className={cn.progress}>
                        <div
                            className={cn.progress_bar}
                            role="progressbar"
                            style={{ width: `${uploadProgress}%` }}
                            aria-valuenow={uploadProgress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                        >
                            {uploadProgress}%
                        </div>
                    </div>
                )}
            </div>


            <div className={cn.description}>
                <h2>{t('photo_translator')}</h2>
                <p>{t('photo_description')}</p>
            </div>  
            <Helmet>
                <html lang={currentLanguage} />
                <title>{t('photo_translator')}</title>
                <meta name="description" content={t('photo_description')} />
                <meta name="keywords" content={t('photo_page_keywords')} />


                <link rel="alternate" href="https://sneptool.com/en/file" hrefLang="en" />
                <link rel="alternate" href="https://sneptool.com/ru/file" hrefLang="ru" />
                <link rel="alternate" href="https://sneptool.com/uz/file" hrefLang="uz" />
                <link rel="alternate" href="https://sneptool.com/tr/file" hrefLang="tr" />
                <link rel="alternate" href="https://sneptool.com/ky/file" hrefLang="ky" />
                <link rel="alternate" href="https://sneptool.com/fr/file" hrefLang="fr" />
                <link rel="alternate" href="https://sneptool.com/es/file" hrefLang="es" />
                <link rel="alternate" href="https://sneptool.com/de/file" hrefLang="de" />
                <link rel="alternate" href="https://sneptool.com/zh/file" hrefLang="zh" />
                <link rel="alternate" href="https://sneptool.com/ar/file" hrefLang="ar" />
                <link rel="alternate" href="https://sneptool.com/cs/file" hrefLang="cs" />
            </Helmet>
        </div>
    );
}
