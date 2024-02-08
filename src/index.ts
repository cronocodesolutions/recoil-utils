import { useEffect } from "react";
import { RecoilValueReadOnly, RecoilState, atom, useRecoilState, useRecoilValueLoadable } from "recoil";

type RecoilCachedValue<T> = RecoilValueReadOnly<T> & { [key: string]: RecoilState<T> };

export function useRecoilCachedValue<T>(recoilValue: RecoilValueReadOnly<T>, defaultValue: T, cacheKey?: string): [T, boolean] {
    const recoilObject = recoilValue as RecoilCachedValue<T>;
    const key = cacheKey ?? `${recoilObject.key}__CACHE_ATOM__`;

    if (!recoilObject[key]) {
      recoilObject[key] = atom({ key, default: defaultValue });
    }

    const [cache, setCache] = useRecoilState(recoilObject[key]);
    const { state, contents } = useRecoilValueLoadable(recoilObject);

    useEffect(() => {
      if (state === 'hasValue' && contents !== cache) {
        setCache(contents);
      }
    }, [state, contents]);

    return [cache, state === 'loading'];
  }