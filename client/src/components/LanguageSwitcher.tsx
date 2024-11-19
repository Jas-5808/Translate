import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const options = [
    { value: 'en', label: 'EN' },
    { value: 'ru', label: 'RU' },
    { value: 'uz', label: 'UZ' },
    { value: 'tr', label: 'TR' },
    { value: 'ky', label: 'KY' },
    { value: 'fr', label: 'FR' },
    { value: 'es', label: 'ES' },
    { value: 'de', label: 'DE' },
    { value: 'zh', label: 'ZH' },
    { value: 'ar', label: 'AR' },
    { value: 'cs', label: 'CS' },
  ];

  const [selectedOption, setSelectedOption] = useState(
    options.find(option => option.value === i18n.language) || options[0]
  );

  useEffect(() => {
    setSelectedOption(options.find(option => option.value === i18n.language) || options[0]);
  }, [i18n.language]);

  const handleChange = (selected) => {
    setSelectedOption(selected);
    i18n.changeLanguage(selected.value);
  };

  return (
    <div style={{ width: '90px' }}>
      <Select
        value={selectedOption} 
        onChange={handleChange} 
        options={options}
        isSearchable={false} 
      />
    </div>
  );
};

export default LanguageSwitcher;
