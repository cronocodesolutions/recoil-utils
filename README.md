# Recoil utils

### Installation

```shell
npm install @cronocode/recoil-utils
```

Or if you're using [yarn](https://classic.yarnpkg.com/en/docs/install/):

```shell
yarn add @cronocode/recoil-utils
```

Or if you're using [bower](https://bower.io/#install-bower):

```shell
bower install --save @cronocode/recoil-utils
```

### Usage

```ts
import { useRecoilCachedValue } from "@cronocode/recoil-utils";
```

```ts
const [stateValue, loading] = useRecoilCachedValue(
  recoilSelector,
  defaultValue
);
```

### License

Recoil is [MIT licensed](./LICENSE).
