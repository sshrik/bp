import React from 'react';
import styled from 'styled-components';
import stopLogo from 'assets/app-logo.png';
import MoveLogo from 'assets/app-move.svg';

interface MovingLogoInterface {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}
const MovingLogo: React.FC<MovingLogoInterface> = (
  props: MovingLogoInterface
) => (
  <div>
    {props.clicked ? (
      <MoveLogo className="w-[512px] h-[512px]" />
    ) : (
      <img
        className="w-[512px] h-[512px] cursor-pointer"
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
