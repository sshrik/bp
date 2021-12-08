import React, { useState } from 'react';
import styled from 'styled-components';
import MovingLogo from 'components/MovingLogo';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .app-logo {
    width: 350px;
    object-fit: cover;
    margin-bottom: 20px;
  }

  .project-information {
    width: 361px;
  }

  .project-header {
    font-size: 24px;
    font-weight: 500;
  }

  .project-detail {
    display: flex;
    flex-direction: row;
    p,
    a {
      font-size: 14px;
    }
    p {
      margin-right: 6px;
    }

    a,
    a:link,
    a:visited {
      color: #3988ff;
    }
  }
`;

const App: React.FC = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <Container>
      <MovingLogo clicked={clicked} setClicked={setClicked} />
      <div className="project-information">
        <p className="project-header">이제 프로젝트를 시작할 수 있습니다.</p>
        <div className="project-detail">
          <p>project setted by</p>
          <a href="https://www.npmjs.com/package/@sshrik/bp">@sshrik/bp</a>
        </div>
      </div>
    </Container>
  );
};

export default App;
