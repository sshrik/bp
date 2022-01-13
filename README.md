# bp
basic boiler plate project.

## How to use?
시작하기 위해선 다음처럼 진행합니다.

```shell
npx @sshrik/bp APP_NAME
cd APP_NAME
yarn
```

## How to run?
실행하기 위해선 다음처럼 사용합니다. 기본포트는 8000입니다.
[다음 링크](https://bp.sshrik.com)와 같은 화면이 뜨면 성공!

```shell
yarn run:dev # localhost:8000 으로 시작하기
yarn build # build
yarn lint:fix # lint 고치기
```

## 프로젝트에는
이 프로젝트에는 다음과 같은 라이브러리들이 포함되어 있습니다.

* Typescript
* ES Lint + Prettier
* React + React Router
* styled-component
* Webpack


## Code Rule
이 프로젝트는 AirBnB Codestyle을 따릅니다. 그러나 개발 편의상 다른점이 있습니다.

#### ImportNamespaceSpecifier

일반적으로 아래와 같은 코드는 Anit-Pattern입니다. 필요하지 않은 모든 컴포넌트들을 로딩하는 것은 더 많은 시간이 걸릴 것 입니다.

```
import * as S from 'components/typo.styles';
```

그러나 이 프로젝트는 `~.style.ts` 같이 `style.[ext]`로 끝나는 파일에 대해서 `import *` 하는것을 막지 않습니다.
그 외의 `import *` / `export *` 은 ESLint 규칙 중 `no-restricted-syntax` 에 의해 금지됩니다.

