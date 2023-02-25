import React from 'react';
import stopLogo from 'assets/app-logo.png';
import MoveLogo from 'assets/app-move.svg';

interface MovingLogoInterface {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}
const MovingLogo: React.FC<MovingLogoInterface> = ({ clicked }) => (
  <div>
    {clicked ? (
      <MoveLogo className="w-[512px] h-[512px]" />
    ) : (
      <img
        className="w-[512px] h-[512px] cursor-pointer"
        alt="로고"
        src={stopLogo}
        onClick={() => {
          props.setClicked(true);

          setTimeout(() => {
            props.setClicked(false);
          }, 3000);
        }}
      />
    )}
  </div>
);

export default MovingLogo;
