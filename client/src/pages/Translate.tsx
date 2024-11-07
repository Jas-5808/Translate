import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Select from 'react-select';
import { FaMicrophone, FaCopy } from 'react-icons/fa';
import volume from '../assets/volume.png';
import cn from "./style.module.css";

export function Translate() {
    const apiKey = 'AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc';
    const [text, setText] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("en");
    const [translatedText, setTranslatedText] = useState("");
    const [editableTranslatedText, setEditableTranslatedText] = useState("");
    const [detectedLanguage, setDetectedLanguage] = useState(null);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [recognition, setRecognition] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);

    const languageNames = {
        af: "Afrikaans", sq: "Albanian", am: "Amharic", ar: "Arabic", hy: "Armenian", az: "Azerbaijani",
        eu: "Basque", be: "Belarusian", bn: "Bengali", bs: "Bosnian", bg: "Bulgarian", ca: "Catalan",
        ceb: "Cebuano", ny: "Chichewa", zh: "Chinese", "zh-CN": "Chinese (Simplified)", "zh-TW": "Chinese (Traditional)",
        co: "Corsican", hr: "Croatian", cs: "Czech", da: "Danish", nl: "Dutch", en: "English",
        eo: "Esperanto", et: "Estonian", tl: "Filipino", fi: "Finnish", fr: "French", fy: "Frisian",
        gl: "Galician", ka: "Georgian", de: "German", el: "Greek", gu: "Gujarati", ht: "Haitian Creole",
        ha: "Hausa", haw: "Hawaiian", iw: "Hebrew", hi: "Hindi", hmn: "Hmong", hu: "Hungarian",
        is: "Icelandic", ig: "Igbo", id: "Indonesian", ga: "Irish", it: "Italian", ja: "Japanese",
        jw: "Javanese", kn: "Kannada", kk: "Kazakh", km: "Khmer", ko: "Korean", ku: "Kurdish (Kurmanji)",
        ky: "Kyrgyz", lo: "Lao", la: "Latin", lv: "Latvian", lt: "Lithuanian", lb: "Luxembourgish",
        mk: "Macedonian", mg: "Malagasy", ms: "Malay", ml: "Malayalam", mt: "Maltese", mi: "Maori",
        mr: "Marathi", mn: "Mongolian", my: "Myanmar (Burmese)", ne: "Nepali", no: "Norwegian", ps: "Pashto",
        fa: "Persian", pl: "Polish", pt: "Portuguese", pa: "Punjabi", ro: "Romanian", ru: "Russian",
        sm: "Samoan", gd: "Scots Gaelic", sr: "Serbian", st: "Sesotho", sn: "Shona", sd: "Sindhi",
        si: "Sinhala", sk: "Slovak", sl: "Slovenian", so: "Somali", es: "Spanish", su: "Sundanese",
        sw: "Swahili", sv: "Swedish", tg: "Tajik", ta: "Tamil", te: "Telugu", th: "Thai",
        tr: "Turkish", uk: "Ukrainian", ur: "Urdu", uz: "Uzbek", vi: "Vietnamese", cy: "Welsh",
        xh: "Xhosa", yi: "Yiddish", yo: "Yoruba", zu: "Zulu"
    };

    const languageOptions = Object.keys(languageNames).map((key) => ({
        value: key,
        label: languageNames[key],
    }));

    const textAreaRef = useRef(null); // Для первого textarea
    const translatedTextAreaRef = useRef(null); // Для второго textarea

    useEffect(() => {
        const loadVoices = () => {
            const voicesList = window.speechSynthesis.getVoices();
            setVoices(voicesList);
            if (voicesList.length > 0) {
                setSelectedVoice(voicesList[0]);
            }
        };

        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        if (window.SpeechRecognition || window.webkitSpeechRecognition) {
            const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognitionInstance = new SpeechRec();
            recognitionInstance.lang = 'ru-RU';
            recognitionInstance.continuous = false;
            recognitionInstance.interimResults = false;
            setRecognition(recognitionInstance);
        }
    }, []);

    useEffect(() => {
        const translateAndDetectLanguage = async () => {
            if (text.trim()) {
                const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
                const detectUrl = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
                
                try {
                    const detectResponse = await axios.post(detectUrl, { q: text });
                    const detectedLangCode = detectResponse.data.data.detections[0][0].language;
                    setDetectedLanguage(detectedLangCode);
        
                    // Заменяем символы новой строки на маркеры
                    const formattedText = text.replace(/\n/g, '__NEWLINE__');
                    
                    const response = await axios.post(url, {
                        q: formattedText,
                        target: targetLanguage,
                    });
        
                    let translated = response.data.data.translations[0].translatedText;
        
                    // Возвращаем маркеры в символы новой строки
                    translated = translated.replace(/__NEWLINE__/g, '\n');
                    translated = decodeHTML(translated);
        
                    setTranslatedText(translated);
                    setEditableTranslatedText(translated);
                } catch (error) {
                    console.error("Ошибка:", error);
                    setTranslatedText("Произошла ошибка при переводе.");
                }
            } else {
                setTranslatedText("");
                setDetectedLanguage(null);
            }
        };
        

        translateAndDetectLanguage();
    }, [text, targetLanguage]);

    function decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    function speakText(isTranslated) {
        const textToSpeak = isTranslated ? editableTranslatedText : text; 
    
        if (!textToSpeak) {
            alert(isTranslated ? "Пожалуйста, сначала выполните перевод." : "Пожалуйста, введите текст.");
            return;
        }
    
        if (!('speechSynthesis' in window)) {
            alert("Ваш браузер не поддерживает озвучивание текста.");
            return;
        }
    
        if (isSpeaking) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        } else {
            const utterance = new SpeechSynthesisUtterance(textToSpeak);
            utterance.lang = isTranslated ? targetLanguage : detectedLanguage; 
            utterance.volume = 1;
            utterance.rate = 0.8;
            utterance.pitch = 1;
    
            const languageVoices = voices.filter(voice => voice.lang.startsWith(utterance.lang));
            if (languageVoices.length > 0) {
                utterance.voice = languageVoices[0];
            }
    
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
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

    function copyToClipboardOriginal() {
        navigator.clipboard.writeText(text);
        alert("Текст скопирован в буфер обмена!");
    }
    
    function copyToClipboardTranslated() {
        navigator.clipboard.writeText(editableTranslatedText);
        alert("Текст скопирован в буфер обмена!");
    }

    const adjustHeight = (element) => {
        element.style.height = "auto"; 
        element.style.height = `${element.scrollHeight}px`; 
    };

    return (
        <div>
            <h3 className={cn.title}>Бесплатный онлайн-переводчик</h3>

            <div className={cn.language_box}>
                <div className={cn.microphone}>
                    <h3>{detectedLanguage ? `${languageNames[detectedLanguage] || detectedLanguage}` : "Определить язык"}</h3>

                    <div className={cn.text_box}>
                        <textarea
                            ref={textAreaRef}
                            value={text}
                            onChange={(e) => {
                                setText(e.target.value);
                                adjustHeight(e.target); 
                            }}
                            placeholder="Введите текст для перевода..."
                        />
                        <div className={cn.equipments}>
                            <button onClick={startRecognition}>
                                <FaMicrophone />
                            </button>

                            <div className={cn.eq_leftside}>
                                <button onClick={copyToClipboardOriginal}>
                                    <FaCopy />
                                </button>

                                <div className={cn.volume}>
                                    <img src={volume} alt="" onClick={() => speakText(false)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className={cn.microphone}>
                    <Select
                        value={languageOptions.find(option => option.value === targetLanguage)}
                        onChange={(selectedOption) => setTargetLanguage(selectedOption.value)}
                        options={languageOptions}
                        className={cn.languageSelector}
                        classNamePrefix="react-select"
                        placeholder="Выберите язык"
                    />   

                    <div className={cn.text_box}>
                        <textarea
                            ref={translatedTextAreaRef}
                            id="result"
                            className={cn.translatedText}
                            value={editableTranslatedText}
                            onChange={(e) => {
                                setEditableTranslatedText(e.target.value);
                                adjustHeight(e.target); 
                            }}
                            onInput={(e) => adjustHeight(e.target)}
                        />

                        <div className={cn.equipments}>
                            <div></div>
                            <div className={cn.eq_leftside}>
                                <button onClick={copyToClipboardTranslated}>
                                    <FaCopy />
                                </button>

                                <div className={cn.volume}>
                                    <img src={volume} alt="" onClick={() => speakText(true)}/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
