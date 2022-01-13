import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from 'components/Container.style';
import MovingLogo from 'components/MovingLogo';

const MainPage: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const { t } = useTranslation();

  return (
    <S.Container>
      <MovingLogo clicked={clicked} setClicked={setClicked} />
      <S.ProjectInforContainer>
        <S.ProjectHeader>{t('header')}</S.ProjectHeader>
        <div className="project-detail">
          <p>{t('info.0')}</p>
          <a href="https://www.npmjs.com/package/@sshrik/bp">{t('info.1')}</a>
        </div>
      </S.ProjectInforContainer>
    </S.Container>
  );
};

export default MainPage;
