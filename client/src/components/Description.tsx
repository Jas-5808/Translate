import React from 'react';
import { useTranslation } from 'react-i18next';
import cn from "./mainCss.module.css"

const Description = ({ title, description }) => {
  const { t } = useTranslation();

  return (
    <div className={cn.description}>
      <h2>{t(title)}</h2>
      <p>{t(description)}</p>
    </div>
  );
};

export default Description;
