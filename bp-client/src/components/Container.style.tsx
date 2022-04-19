import styled from 'styled-components';

export const Container = styled.div`
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
`;

export const ProjectInforContainer = styled.div`
  width: 361px;
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

export const ProjectHeader = styled.p`
  font-size: 24px;
  font-weight: 500;
`;
