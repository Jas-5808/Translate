import 'bootstrap/dist/css/bootstrap.min.css'; // Импорт Bootstrap
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaMicrophone, FaCopy, FaCamera } from 'react-icons/fa'; // Иконки для микрофона и копирования
import Tesseract from 'tesseract.js'; // Импортируем библиотеку для OCR

function App() {
  const apiKey = 'AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc';
  const [text, setText] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Получаем список голосов при загрузке страницы
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

    // Настройка распознавания речи
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
      const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRec();
      recognitionInstance.lang = 'ru-RU';
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      setRecognition(recognitionInstance);
    }
  }, []);

  // Функция для перевода с использованием Axios
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

  // Функция для синтеза речи
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
    utterance.rate = 0.9;  // Немного медленнее для более естественной речи
    utterance.pitch = 1;

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  // Функция для начала распознавания речи
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

  // Обработчик для загрузки изображения
  function handleFileUpload(event) {
    const uploadedFile = event.target.files[0];
    setFile(uploadedFile);
    setIsProcessing(true);

    // Используем Tesseract.js для извлечения текста из изображения
    Tesseract.recognize(uploadedFile, 'eng', {
      logger: (m) => console.log(m), // Логирование прогресса
    }).then(({ data: { text } }) => {
      setText(text);
      setIsProcessing(false);
    }).catch((error) => {
      console.error("Ошибка OCR:", error);
      setIsProcessing(false);
    });
  }

  // Функция для копирования текста в буфер обмена
  function copyToClipboard() {
    navigator.clipboard.writeText(translatedText);
    alert("Текст скопирован в буфер обмена!");
  }

  return (
    <div className="container">
      <h1>Сайт переводчика</h1>

      <div className="mb-3">
        <button className="btn btn-info me-2" onClick={startRecognition}>
          <FaMicrophone /> Распознавание речи
        </button>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите текст для перевода..."
          className="form-control my-3"
        />
      </div>

      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
        className="form-select my-3"
      >
        <option value="en">Английский</option>
        <option value="es">Испанский</option>
        <option value="fr">Французский</option>
        <option value="ru">Русский</option>
      </select>
      
      <button onClick={translateText} className="btn btn-primary me-2">Перевести</button>

      {/* Выбор голоса */}
      <select
        value={selectedVoice?.name}
        onChange={(e) =>
          setSelectedVoice(voices.find((voice) => voice.name === e.target.value))
        }
        className="form-select my-3"
      >
        {voices
          .filter((voice) => voice.lang.startsWith(targetLanguage)) // Фильтрация по языку
          .map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
      </select>

      <button onClick={speakText} className="btn btn-secondary">Озвучить перевод</button>

      {/* Кнопка для копирования текста */}
      <button onClick={copyToClipboard} className="btn btn-success ms-2">
        <FaCopy /> Копировать перевод
      </button>

      {/* Загрузка изображения */}
      <div className="mt-3">
        <input type="file" onChange={handleFileUpload} className="form-control" />
        {isProcessing && <p>Обработка изображения...</p>}
      </div>

      <p className="mt-3" id="result">{translatedText}</p>
    </div>
  );
}

export default App;
