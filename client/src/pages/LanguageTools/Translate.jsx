import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import Select from 'react-select';
import { FaCopy, FaVolumeUp } from 'react-icons/fa';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import cn from "../style.module.css";
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const languageOptions = [
    { value: 'auto', label: 'Detect Language' },
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' },
    { value: 'uz', label: 'Uzbek' },
    { value: 'fr', label: 'French' },
    { value: 'es', label: 'Spanish' },
    { value: 'af', label: 'Afrikaans' },
    { value: 'sq', label: 'Albanian' },
    { value: 'am', label: 'Amharic' },
    { value: 'ar', label: 'Arabic' },
    { value: 'hy', label: 'Armenian' },
    { value: 'az', label: 'Azerbaijani' },
    { value: 'eu', label: 'Basque' },
    { value: 'be', label: 'Belarusian' },
    { value: 'bn', label: 'Bengali' },
    { value: 'bs', label: 'Bosnian' },
    { value: 'bg', label: 'Bulgarian' },
    { value: 'ca', label: 'Catalan' },
    { value: 'ceb', label: 'Cebuano' },
    { value: 'ny', label: 'Chichewa' },
    { value: 'zh', label: 'Chinese' },
    { value: 'zh-CN', label: 'Chinese (Simplified)' },
    { value: 'zh-TW', label: 'Chinese (Traditional)' },
    { value: 'co', label: 'Corsican' },
    { value: 'hr', label: 'Croatian' },
    { value: 'cs', label: 'Czech' },
    { value: 'da', label: 'Danish' },
    { value: 'nl', label: 'Dutch' },
    { value: 'eo', label: 'Esperanto' },
    { value: 'et', label: 'Estonian' },
    { value: 'tl', label: 'Filipino' },
    { value: 'fi', label: 'Finnish' },
    { value: 'fy', label: 'Frisian' },
    { value: 'gl', label: 'Galician' },
    { value: 'ka', label: 'Georgian' },
    { value: 'de', label: 'German' },
    { value: 'el', label: 'Greek' },
    { value: 'gu', label: 'Gujarati' },
    { value: 'ht', label: 'Haitian Creole' },
    { value: 'ha', label: 'Hausa' },
    { value: 'haw', label: 'Hawaiian' },
    { value: 'iw', label: 'Hebrew' },
    { value: 'hi', label: 'Hindi' },
    { value: 'hmn', label: 'Hmong' },
    { value: 'hu', label: 'Hungarian' },
    { value: 'is', label: 'Icelandic' },
    { value: 'ig', label: 'Igbo' },
    { value: 'id', label: 'Indonesian' },
    { value: 'ga', label: 'Irish' },
    { value: 'it', label: 'Italian' },
    { value: 'ja', label: 'Japanese' },
    { value: 'jw', label: 'Javanese' },
    { value: 'kn', label: 'Kannada' },
    { value: 'kk', label: 'Kazakh' },
    { value: 'km', label: 'Khmer' },
    { value: 'ko', label: 'Korean' },
    { value: 'ku', label: 'Kurdish (Kurmanji)' },
    { value: 'ky', label: 'Kyrgyz' },
    { value: 'lo', label: 'Lao' },
    { value: 'la', label: 'Latin' },
    { value: 'lv', label: 'Latvian' },
    { value: 'lt', label: 'Lithuanian' },
    { value: 'lb', label: 'Luxembourgish' },
    { value: 'mk', label: 'Macedonian' },
    { value: 'mg', label: 'Malagasy' },
    { value: 'ms', label: 'Malay' },
    { value: 'ml', label: 'Malayalam' },
    { value: 'mt', label: 'Maltese' },
    { value: 'mi', label: 'Maori' },
    { value: 'mr', label: 'Marathi' },
    { value: 'mn', label: 'Mongolian' },
    { value: 'my', label: 'Myanmar (Burmese)' },
    { value: 'ne', label: 'Nepali' },
    { value: 'no', label: 'Norwegian' },
    { value: 'ps', label: 'Pashto' },
    { value: 'fa', label: 'Persian' },
    { value: 'pl', label: 'Polish' },
    { value: 'pt', label: 'Portuguese' },
    { value: 'pa', label: 'Punjabi' },
    { value: 'ro', label: 'Romanian' },
    { value: 'sm', label: 'Samoan' },
    { value: 'gd', label: 'Scots Gaelic' },
    { value: 'sr', label: 'Serbian' },
    { value: 'st', label: 'Sesotho' },
    { value: 'sn', label: 'Shona' },
    { value: 'sd', label: 'Sindhi' },
    { value: 'si', label: 'Sinhala' },
    { value: 'sk', label: 'Slovak' },
    { value: 'sl', label: 'Slovenian' },
    { value: 'so', label: 'Somali' },
    { value: 'su', label: 'Sundanese' },
    { value: 'sw', label: 'Swahili' },
    { value: 'sv', label: 'Swedish' },
    { value: 'tg', label: 'Tajik' },
    { value: 'ta', label: 'Tamil' },
    { value: 'te', label: 'Telugu' },
    { value: 'th', label: 'Thai' },
    { value: 'tr', label: 'Turkish' },
    { value: 'uk', label: 'Ukrainian' },
    { value: 'ur', label: 'Urdu' },
    { value: 'vi', label: 'Vietnamese' },
    { value: 'cy', label: 'Welsh' },
    { value: 'xh', label: 'Xhosa' },
    { value: 'yi', label: 'Yiddish' },
    { value: 'yo', label: 'Yoruba' },
    { value: 'zu', label: 'Zulu' }
  ];

  const Description = lazy(() => import('../../components/Description'));
  const LanguageSwitcher = lazy(() => import("../../components/LanguageSwitcher"));
  const Helmet = lazy(() => import('react-helmet').then(module => ({ default: module.Helmet })));

const Translate = () => {
    const [sourceLanguage, setSourceLanguage] = useState(languageOptions[0]); // По умолчанию "Определить язык"
    const [text, setText] = useState('');
    const [blocks, setBlocks] = useState([
      { id: 1, targetLanguage: languageOptions.find((lang) => lang.value === 'en'), translation: '' }, // Дефолтно английский
    ]);
    const [isSpeaking, setIsSpeaking] = useState(false); // Флаг для отслеживания, идет ли озвучка
    const [speechInstance, setSpeechInstance] = useState(null);
    const { t } = useTranslation();
    const location = useLocation();
    const [speakingState, setSpeakingState] = useState({
        sourceLanguage: false,
        targetLanguage: false,
      });
  
    const getCurrentLanguage = () => {
        const language = location.pathname.split('/')[1];  
        return language || 'en'; 
      };
      
      const currentLanguage = getCurrentLanguage();
      
    const textareaRefs = useRef([]);
    const textAreaInputRef = useRef(null);

    const decodeHTML = (text) => {
        const parser = new DOMParser();
        const decodedString = parser.parseFromString(text, 'text/html').body.textContent;
        return decodedString;
      };
  
    const handleAutoResize = (index) => {
      const textarea = textareaRefs.current[index];
      if (textarea) {
        textarea.style.height = 'auto'; // Сбрасываем высоту перед пересчетом
        textarea.style.height = `${textarea.scrollHeight}px`; // Устанавливаем новую высоту
      }
    };
  
    const handleTextChange = (e) => {
      setText(e.target.value);
  
      // Если язык не определен, запускаем определение языка
      if (sourceLanguage.value === 'auto' && e.target.value.trim()) {
        detectLanguage(e.target.value);
      }
    };
  
    const handleSourceLanguageChange = (selectedOption) => {
      setSourceLanguage(selectedOption);
    };
  
    const handleTargetLanguageChange = (index, selectedOption) => {
      const newBlocks = [...blocks];
      newBlocks[index].targetLanguage = selectedOption;
      setBlocks(newBlocks);
    };
  
    const detectLanguage = async (textToDetect) => {
      const apiKey = 'AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc';
      const url = `https://translation.googleapis.com/language/translate/v2/detect?key=${apiKey}`;
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ q: textToDetect }),
        });
  
        const result = await response.json();
        const detectedLanguage = result.data.detections[0][0].language;
  
        const selectedOption = languageOptions.find((option) => option.value === detectedLanguage);
        if (selectedOption) {
          setSourceLanguage(selectedOption);
        }
      } catch (error) {
        console.error('Ошибка определения языка:', error);
      }
    };
  
    const addBlock = () => {
      if (blocks.length < 10) {
        setBlocks([
          ...blocks,
          {
            id: blocks.length + 1,
            targetLanguage: languageOptions.find((lang) => lang.value === 'en'), // По умолчанию английский
            translation: '',
          },
        ]);
      }
    };
    
  
    const translateText = async () => {
      if (!sourceLanguage || !text.trim()) {
        alert('Пожалуйста, выберите исходный язык и введите текст.');
        return;
      }
  
      const apiKey = 'AIzaSyCiConrcZiaumOPZRNOxbryaUH-3udEODc';
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
  
      // Разбиваем текст на строки
      const lines = text.split('\n');
  
      // Для каждого блока отправляем перевод каждой строки
      const newBlocks = await Promise.all(
        blocks.map(async (block) => {
          if (block.targetLanguage) {
            const translations = await Promise.all(
              lines.map(async (line) => {
                const body = {
                  q: line.trim(),
                  source: sourceLanguage.value,
                  target: block.targetLanguage.value,
                };
  
                try {
                  const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                  });
                  const result = await response.json();
                  const translatedText = decodeHTML(result.data.translations[0].translatedText);
                  return translatedText;
                } catch (error) {
                  console.error('Ошибка перевода строки:', error);
                  return text;
                }
              })
            );
  
            // Объединяем переведенные строки обратно в один текст (если нужно)
            const translatedText = translations.join('\n');
            return { ...block, translation: translatedText };
          }
          return block;
        })
      );
  
      // Обновляем состояние с новыми переведенными блоками
      setBlocks(newBlocks);
    };
  
    const handleCopy = (text) => {
      console.log('Текст скопирован:', text);
    };
  
    const handleSpeech = (text, lang, languageType) => {
        // Проверяем, идет ли озвучка для этого языка
        if (speakingState[languageType]) {
          window.speechSynthesis.cancel(); 
          setSpeakingState(prevState => ({
            ...prevState,
            [languageType]: false,
          })); // Обновляем состояние для конкретного языка
        } else {
          const speech = new SpeechSynthesisUtterance(text);
          speech.lang = lang;
          
          speech.onend = () => {
            setSpeakingState(prevState => ({
              ...prevState,
              [languageType]: false,
            })); // Когда озвучка заканчивается, сбрасываем флаг
          };
      
          window.speechSynthesis.speak(speech);
          setSpeakingState(prevState => ({
            ...prevState,
            [languageType]: true,
          })); // Устанавливаем флаг для конкретного языка
        }
      };
  
    useEffect(() => {
      // Делаем авто-растягивание для каждого текстового блока после первого рендера
      blocks.forEach((_, index) => handleAutoResize(index));
      // Авто-растягивание для первого textarea
      if (textAreaInputRef.current) {
        textAreaInputRef.current.style.height = 'auto';
        textAreaInputRef.current.style.height = `${textAreaInputRef.current.scrollHeight}px`;
      }
    }, [blocks, text]);

    const getCharacterCount = (text) => {
        // Считаем количество символов в тексте
        const textWithoutSpaces = text.replace(/\s+/g, '');
        return textWithoutSpaces.length;
      };
  
    return (
      <div>
            <div className={cn.title}>
                <div className={cn.title_content}>
                    <h3>{t('free_online_translator')}</h3>
                    <LanguageSwitcher/>
                </div>

                <ul>
                    <li><a href="/file">
                        <i className="fa fa-file-text-o"></i>
                        <p>{t('translate_file')} <span>.pdf, .docx, .txt</span> </p>
                    </a></li>
                </ul>
            </div>

        <div className={cn.language_box}>
            <div className={cn.microphone}>
                <Select
                    value={sourceLanguage}
                    onChange={handleSourceLanguageChange}
                    options={languageOptions}
                    className={cn.languageSelector}
                />
                <div className={cn.text_box}>
                    <textarea
                        ref={textAreaInputRef} // Ссылка на первый textarea
                        value={text}
                        onChange={handleTextChange}
                        onInput={() => handleAutoResize(0)} // Динамически растягиваем первое поле ввода
                        rows="1" // Начальная высота
                        cols="50"
                        placeholder={t('placeholder_enter_text')}
                        style={{ resize: 'none', overflow: 'hidden', width: '100%' }} // Отключаем изменение размера вручную
                    />
                    <div className={cn.equipments}>
                        <p>
                        {t('char_count')}
                        {getCharacterCount(text)} {/* Просто считаем длину текста */}
                        </p>
                        <div className={cn.eq_leftside}>
                            <CopyToClipboard text={text} onCopy={() => handleCopy(text)}>
                                <button>
                                    <FaCopy />
                                </button>
                            </CopyToClipboard>
                            <button onClick={() => handleSpeech(text,  sourceLanguage.value , 'sourceLanguage')}>
                                <FaVolumeUp /> {isSpeaking}
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div>

            {blocks.map((block, index) => (
                <div key={block.id} className={cn.microphone}>
                    <Select
                        value={block.targetLanguage}
                        onChange={(selectedOption) =>
                        handleTargetLanguageChange(index, selectedOption)
                        }
                        options={languageOptions}
                        className={cn.languageSelector}
                    />
                    <div className={cn.text_box}>
                        <textarea
                        ref={(el) => (textareaRefs.current[index] = el)} // Устанавливаем ссылку на каждый textarea
                        value={block.translation}
                        onChange={(e) => {
                            const updatedBlocks = [...blocks];
                            updatedBlocks[index].translation = e.target.value;
                            setBlocks(updatedBlocks);
                        }}
                        onInput={() => handleAutoResize(index)} // Динамически растягиваем каждый блок
                        rows="4"
                        cols="50"
                        placeholder={t('translated_text')}
                        style={{ resize: 'none', width: '100%' }} // Запрещаем изменять размер
                        />

                        <div className={cn.equipments}>
                            <p>
                            {t('char_count')}
                            {getCharacterCount(block.translation)} {/* Просто считаем длину текста */}
                            </p>
                            <div className={cn.eq_leftside}>
                                <CopyToClipboard text={block.translation} onCopy={() => handleCopy(block.translation)}>
                                    <button>
                                    <FaCopy />
                                    </button>
                                </CopyToClipboard>
                                <button onClick={() => handleSpeech(block.translation, block.targetLanguage.value, 'targetLanguage')}>
                                    <FaVolumeUp /> {isSpeaking}
                                </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            ))}
        </div>
  
        <div class="d-flex gap-3 mb-3">
            <button onClick={addBlock} className={cn.uploadButton2}>{t('add_language')}</button>
            <button onClick={translateText} className={cn.uploadButton}>{t('translate')}</button>
        </div>

        <Suspense fallback={null}>
            <Description 
            title="multilingual_translator" 
            description="multilingual_description" 
            />
        </Suspense>

        <Suspense fallback={null}>
            <Helmet>
                <html lang={currentLanguage} />
                <title>{t('multilingual_translator')}</title>
                <meta name="description" content={t('multilingual_description')} />
                <meta name="keywords" content={t('multilingual_page_keywords')} />

                <link rel="alternate" href="https://sneptool.com/en/" hrefLang="en" />
                <link rel="alternate" href="https://sneptool.com/ru/" hrefLang="ru" />
                <link rel="alternate" href="https://sneptool.com/uz/" hrefLang="uz" />
                <link rel="alternate" href="https://sneptool.com/tr/" hrefLang="tr" />
                <link rel="alternate" href="https://sneptool.com/ky/" hrefLang="ky" />
                <link rel="alternate" href="https://sneptool.com/fr/" hrefLang="fr" />
                <link rel="alternate" href="https://sneptool.com/es/" hrefLang="es" />
                <link rel="alternate" href="https://sneptool.com/de/" hrefLang="de" />
                <link rel="alternate" href="https://sneptool.com/zh/" hrefLang="zh" />
                <link rel="alternate" href="https://sneptool.com/ar/" hrefLang="ar" />
                <link rel="alternate" href="https://sneptool.com/cs/" hrefLang="cs" />
            </Helmet>
        </Suspense>

      </div>
    );
  };
  
  export default Translate;
  
  
