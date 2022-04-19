# 이 프로젝트는 
이 프로젝트는 @sshrik/bp에 의해서 만들어졌습니다. 기본적으로 이 프로젝트는 yarn으로 사용합니다.

```
yarn
yarn run:dev # localhost:8000 으로 시작하기
yarn build # build
yarn lint:fix # lint 고치기
```

## Code Rule
이 프로젝트는 AirBnB Codestyle을 따릅니다. 그러나 개발 편의상 다른점이 있습니다.

#### ImportNamespaceSpecifier

일반적으로 아래와 같은 코드는 Anit-Pattern입니다. 필요하지 않은 모든 컴포넌트들을 로딩하는 것은 더 많은 시간이 걸릴 것 입니다.

```
import * as S from 'components/typo.styles';
```

그러나 이 프로젝트는 `~.style.ts` 같이 `style.[ext]`로 끝나는 파일에 대해서 `import *` 하는것을 막지 않습니다.
그 외의 `import *` / `export *` 은 ESLint 규칙 중 `no-restricted-syntax` 에 의해 금지됩니다.

