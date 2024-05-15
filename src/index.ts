import { useEffect } from "react";
import { RecoilValueReadOnly, RecoilState, atom, useRecoilState, useRecoilValueLoadable } from "recoil";

const cacheAtoms: Record<string, RecoilState<any>> = {};

export function useRecoilCachedValue<T>(recoilValue: RecoilValueReadOnly<T>, defaultValue: T, cacheKey?: string): [T, boolean] {
  const key = cacheKey ?? `${recoilValue.key}__CACHE_ATOM__`;

  if (!cacheAtoms[key]) {
    cacheAtoms[key] = atom({ key, default: defaultValue });
  }

  const [cache, setCache] = useRecoilState(cacheAtoms[key]);
  const { state, contents } = useRecoilValueLoadable(recoilValue);

  useEffect(() => {
    if (state === 'hasValue' && contents !== cache) {
      setCache(contents);
    }
  }, [state, contents]);

  return [cache, state === 'loading'];
}