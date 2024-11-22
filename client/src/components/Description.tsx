import { useTranslation } from 'react-i18next';
import cn from "./mainCss.module.css"

interface DescriptionProps {
  title: string; 
  description: string; 
}
const Description: React.FC<DescriptionProps> = ({ title, description }) => {
  const { t } = useTranslation();

  return (
    <div className={cn.description}>
      <h2>{t(title)}</h2>
      <p>{t(description)}</p>
    </div>
  );
};

export default Description;
