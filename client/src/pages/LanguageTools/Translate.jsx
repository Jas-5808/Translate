import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import Select from 'react-select';
import { FaMicrophone, FaCopy } from 'react-icons/fa';
import volume from '../../assets/volume.png';
import cn from "../style.module.css";

export function Translate() {
    const apiKey = 'AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc';
    const [text, setText] = useState("");
    const [sourceLanguage, setSourceLanguage] = useState(null);
    const [targetLanguage, setTargetLanguage] = useState("en");
    const [translatedText, setTranslatedText] = useState("");
    const [editableTranslatedText, setEditableTranslatedText] = useState("");
    const [detectedLanguage, setDetectedLanguage] = useState(null);
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [recognition, setRecognition] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [originalCharCount, setOriginalCharCount] = useState(0);
    const [translatedCharCount, setTranslatedCharCount] = useState(0);
    const [containers, setContainers] = useState([{ id: 0, text: "", translatedText: "", targetLanguage: "en" }]);
    const maxContainers = 8;
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
            if (!text.trim()) {
                setTranslatedText("");
                setEditableTranslatedText("");
                setDetectedLanguage(null);
                return;
            }
    
            try {
                const detectUrl = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
                const detectResponse = await axios.post(detectUrl, { q: text });
                const detectedLangCode = detectResponse.data.data.detections[0][0].language;
                setDetectedLanguage(detectedLangCode);
    
                const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
                const response = await axios.post(url, {
                    q: text,
                    source: detectedLangCode,
                    target: targetLanguage,
                });
                const translated = response.data.data.translations[0].translatedText.replace(/__NEWLINE__/g, '\n');
                setTranslatedText(decodeHTML(translated));
                setEditableTranslatedText(decodeHTML(translated));
                setTranslatedCharCount(countCharsWithoutSpaces(translated));
            } catch (error) {
                console.error("Ошибка при переводе:", error.response?.data || error.message);
                setTranslatedText("Произошла ошибка при переводе.");
            }
        };
    
        translateAndDetectLanguage();
    }, [text, targetLanguage]);
    

    function decodeHTML(html) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }
    // const decodedText = decodeHTML(container.translatedText);
    const handlePlusClick = () => {
        if (containers.length < maxContainers) {
            setContainers((prev) => [...prev, { id: prev.length, text: "", translatedText: "", targetLanguage: "en" }]);
        } else {
            alert("Достигнут предел количества контейнеров.");
        }
    };
    
    const handleTextChange = (id, newText) => {
        setContainers((prev) =>
            prev.map((container) =>
                container.id === id ? { ...container, text: newText } : container
            )
        );
    };
    
    const handleLanguageChange = (id, newLanguage) => {
        setContainers((prev) =>
            prev.map((container) =>
                container.id === id ? { ...container, targetLanguage: newLanguage } : container
            )
        );
    };
    
    useEffect(() => {
        const translateText = async (id, targetLanguage) => {
            if (text.trim()) {
                try {
                    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
                    const response = await axios.post(url, {
                        q: text,
                        target: targetLanguage,
                    });
                    const translated = response.data.data.translations[0].translatedText;

                    setContainers((prev) =>
                        prev.map((container) =>
                            container.id === id ? { ...container, translatedText: translated } : container
                        )
                    );
                } catch (error) {
                    console.error("Ошибка при переводе:", error);
                }
            }
        };

        containers.forEach((container) => {
            translateText(container.id, container.targetLanguage);
        });
    }, [text, containers]);
    
    

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
            utterance.rate = 0.9;
            utterance.pitch = 1;
    
            // Устанавливаем голос для русского языка
            if (utterance.lang.startsWith("ru")) {
                const russianVoices = voices.filter(voice => voice.lang.startsWith("ru"));
                // Пример: выберем второй доступный голос, если есть несколько
                if (russianVoices.length > 1) {
                    utterance.voice = russianVoices[1]; // Выбор другого голоса
                } else if (russianVoices.length > 0) {
                    utterance.voice = russianVoices[0];
                }
            } else {
                // Выбор голоса для других языков
                const languageVoices = voices.filter(voice => voice.lang.startsWith(utterance.lang));
                if (languageVoices.length > 0) {
                    utterance.voice = languageVoices[0];
                } else {
                    alert("Не удалось найти подходящий голос для выбранного языка. Используется голос по умолчанию.");
                }
            }
    
            utterance.onboundary = function(event) {
                const text = textToSpeak;
                const start = event.charIndex;
                const end = start + (event.charLength || 1); // Если `charLength` недоступен, просто выделяем по одному символу
                highlightText(start, end, isTranslated);
            };
    
            utterance.onend = () => {
                setIsSpeaking(false);
                clearHighlight(isTranslated);
            };
    
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
            setIsSpeaking(true);
        }
    }
    
    // Функции `highlightText` и `clearHighlight` остаются такими же, как и ранее
    
    
    function highlightText(start, end, isTranslated) {
        const textArea = isTranslated ? translatedTextAreaRef.current : textAreaRef.current;
        if (textArea) {
            textArea.focus();
            textArea.setSelectionRange(start, end);
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

    const detectLanguage = async (text) => {
        if (text.trim()) {
            const detectUrl = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
            try {
                const detectResponse = await axios.post(detectUrl, { q: text });
                const detectedLangCode = detectResponse.data.data.detections[0][0].language;
                setSourceLanguage(detectedLangCode);
            } catch (error) {
                console.error("Ошибка при определении языка:", error);
            }
        }
    };
    useEffect(() => {
        if (text.trim() && !sourceLanguage) {
            detectLanguage(text); 
        }
    }, [text, sourceLanguage]);
    
    const countCharsWithoutSpaces = (text) => {
        return text.replace(/\s/g, '').length;
    };

    
    
    
    return (
        <div>
            <div className={cn.title}>
                <ul>
                    <li><a href="/file">Перевести файл</a></li>
                </ul>

                <h3>Бесплатный онлайн-переводчик</h3>
            </div>

            <div className={cn.language_box}>
                <div className={cn.microphone}>
                    <Select
                        value={languageOptions.find(option => option.value === sourceLanguage)}
                        onChange={(selectedOption) => setSourceLanguage(selectedOption.value)}  
                        options={[{ value: null, label: 'Определить язык' }, ...languageOptions]}
                        className={cn.languageSelector}
                        classNamePrefix="react-select"
                        placeholder="Определить язык"
                    />

                    <div className={cn.text_box}>
                        <textarea
                            ref={textAreaRef}
                            value={text}
                            onChange={(e) => {
                                const newText = e.target.value;
                                setText(newText);
                                adjustHeight(e.target); 
                                setOriginalCharCount(countCharsWithoutSpaces(newText));
                            }}
                            placeholder="Введите текст для перевода..."
                        />
                        <div className={cn.equipments}>
                            <div className={cn.charCount}>
                                <button onClick={startRecognition}>
                                    <FaMicrophone />
                                </button>
                                <p>К-во симв: {originalCharCount}</p>
                            </div>
                            

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

                {containers.map((container) => (
                    <div key={container.id} className={cn.microphone}>
                        <Select
                            value={languageOptions.find(option => option.value === container.targetLanguage)}
                            onChange={(selectedOption) => handleLanguageChange(container.id, selectedOption.value)}
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
                                value={decodeHTML(container.translatedText)}
                                onChange={(e) => handleTextChange(container.id, e.target.value)}
                                onInput={(e) => adjustHeight(e.target)}
                            />

                            <div className={cn.equipments}>
                                <div className={cn.charCount}>
                                    <p>К-во симв: {translatedCharCount}</p>
                                </div>
                                <div className={cn.eq_leftside}>
                                    <button onClick={copyToClipboardTranslated}>
                                        <FaCopy />
                                    </button>

                                    <div className={cn.volume}>
                                        <img src={volume} alt="" onClick={() => speakText(true)} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


            </div>
            <div>

            <button className={cn.plusButton} onClick={handlePlusClick}>+</button>

            </div>
            <div className={cn.description}>
                <h2>Многоязычный переводчик</h2>
                <p>На этой странице пользователи могут ввести текст и сразу перевести его на 10 различных языков. Переводчик позволяет легко и быстро получить перевод на несколько языков одновременно, что идеально подходит для людей, которые хотят понимать текст на разных языках без необходимости делать это по очереди.</p>
            </div>
        </div>
    );
}
