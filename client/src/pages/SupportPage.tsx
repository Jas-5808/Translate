import React from 'react';
import { FaCopy } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SupportPage = () => {
    const { t } = useTranslation();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert(t('card_number_copied'));
      })
      .catch((err) => {
        console.error(t('copy_error'), err);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3>{t('project_support')}</h3>
            </div>
            <div className="card-body">
              <p>
              {t('support_message')}
              </p>

              <div className="card mb-3">
                <div className="card-body">
                  <h4>{t('visa_card')}</h4>
                  <p className="d-flex align-items-center">
                    <strong>{t('card_number_label')}</strong>
                    <span 
                      style={{
                        backgroundColor: '#f0f8ff',
                        padding: '5px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '1.2em',
                        marginLeft: '10px'
                      }}
                    >
                      4278 3200 2383 4194
                    </span>
                    <button 
                      className="btn btn-outline-primary" 
                      onClick={() => copyToClipboard('4278 3200 2383 4194')}
                      style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}
                    >
                      <FaCopy />
                    </button>
                  </p>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  <h4>2. ЮMoney (ранее Яндекс.Деньги)</h4>
                  <p className="d-flex align-items-center">
                    <strong>{t('wallet_number_label')}</strong>
                    <span 
                      style={{
                        backgroundColor: '#f0f8ff',
                        padding: '5px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        fontSize: '1.2em',
                        marginLeft: '10px'
                      }}
                    >
                      4100 1189 0060 7947
                    </span>
                    <button 
                      className="btn btn-outline-primary" 
                      onClick={() => copyToClipboard('4100 1189 0060 7947')}
                      style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '10px' }}
                    >
                      <FaCopy />
                    </button>
                  </p>
                </div>
              </div>

              <p>{t('thank_you_message')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
