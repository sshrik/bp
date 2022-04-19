import React from 'react';
import styled from 'styled-components';
import stopLogo from 'assets/app-logo.png';
import MoveLogo from 'assets/app-move.svg';

interface MovingLogoInterface {
  clicked: boolean;
  setClicked: (clicked: boolean) => void;
}

const Container = styled.div`
  .imgSize {
    width: 512px;
    height: 512px;
  }

  .cursor {
    cursor: pointer;
  }
`;

const MovingLogo: React.FC<MovingLogoInterface> = (
  props: MovingLogoInterface
) => (
  <Container>
    {props.clicked ? (
      <MoveLogo className="imgSize" />
    ) : (
      <img
        className="cursor imgSize"
        src={stopLogo}
        onClick={() => {
          props.setClicked(true);
          setTimeout(() => {
            props.setClicked(false);
          }, 3000);
        }}
      />
    )}
  </Container>
);

export default MovingLogo;
