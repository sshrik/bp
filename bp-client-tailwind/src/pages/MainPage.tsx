import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MovingLogo from 'components/MovingLogo';

const MainPage: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <MovingLogo clicked={clicked} setClicked={setClicked} />
      <div className="w-[361px]">
        <p className="text-lg">{t('header')}</p>
        <div className="flex flex-row">
          <p className="text-sm">{t('info.0')}</p>
          <a
            className="text-sm visited:text-sky-500 text-sky-500"
            href="https://www.npmjs.com/package/@sshrik/bp"
          >
            {t('info.1')}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
