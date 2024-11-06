import cn from "./style.module.css";
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaMicrophone, FaCopy } from 'react-icons/fa';
import Tesseract from 'tesseract.js';

export function Translate(){
    const apiKey = 'AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc';
    const [text, setText] = useState("");
    const [targetLanguage, setTargetLanguage] = useState("en");
    const [translatedText, setTranslatedText] = useState("");
    const [voices, setVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [recognition, setRecognition] = useState(null);
    const [file, setFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

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

    async function translateText() {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        try {
        const response = await axios.post(url, {
            q: text,
            target: targetLanguage,
        });
        const translated = response.data.data.translations[0].translatedText;
        setTranslatedText(translated);
        } catch (error) {
        console.error("Ошибка перевода:", error);
        setTranslatedText("Произошла ошибка при переводе.");
        }
    }

    function speakText() {
        if (!translatedText) {
        alert("Пожалуйста, сначала выполните перевод.");
        return;
        }

        if (!('speechSynthesis' in window)) {
        alert("Ваш браузер не поддерживает озвучивание текста.");
        return;
        }

        const utterance = new SpeechSynthesisUtterance(translatedText);
        utterance.lang = targetLanguage;
        utterance.volume = 1;
        utterance.rate = 0.9;
        utterance.pitch = 1;

        if (selectedVoice) {
        utterance.voice = selectedVoice;
        }

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

        Tesseract.recognize(uploadedFile, 'eng', {
        logger: (m) => console.log(m),
        }).then(({ data: { text } }) => {
        setText(text);
        setIsProcessing(false);
        }).catch((error) => {
        console.error("Ошибка OCR:", error);
        setIsProcessing(false);
        });
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(translatedText);
        alert("Текст скопирован в буфер обмена!");
    }
    return(
        <>
            <div>
                <h3 className={cn.title}>Бесплтаный онлайн-переводчик</h3>

                <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                >
                    <option value="en">Английский</option>
                    <option value="es">Испанский</option>
                    <option value="fr">Французский</option>
                    <option value="ru">Русский</option>
                </select>
                <div className={cn.microphone}>
                    <h3>Определить язык</h3>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Введите текст для перевода..."
                    />
                    <div className={cn.equipments}>
                        <button onClick={startRecognition}>
                            <FaMicrophone />
                        </button>

                        <button onClick={copyToClipboard}>
                            <FaCopy />
                        </button>
                    </div>
                </div>


                
                <button onClick={translateText}>Перевести</button>

                <select
                    value={selectedVoice?.name}
                    onChange={(e) =>
                        setSelectedVoice(voices.find((voice) => voice.name === e.target.value))
                    }
                >
                    {voices
                    .filter((voice) => voice.lang.startsWith(targetLanguage))
                    .map((voice) => (
                        <option key={voice.name} value={voice.name}>
                            {voice.name} ({voice.lang})
                        </option>
                    ))}
                </select>

                <button onClick={speakText}>Озвучить перевод</button>



                <div>
                    <input type="file" onChange={handleFileUpload} />
                    {isProcessing && <p>Обработка изображения...</p>}
                </div>

                <p id="result">{translatedText}</p>
            </div>
        </>
    )
}
