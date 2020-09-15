import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function useQueryParam(name: string): string | undefined {
  const query = useRouter().query;
  if (query[name]) {
    return String(query[name]);
  } else return undefined;
}

export function useNavHash(
  page: string,
  init?: string
): [string, (s: string) => void] {
  let initialHash = init || "#";
  if (typeof window !== "undefined") {
    if (window.location.hash) initialHash = window.location.hash;
  }
  const [navHash, setStateHash] = useState<string>(initialHash);
  const router = useRouter();

  console.log(router.asPath);

  useEffect(() => {
    function hashChangeStart(url: string) {
      console.log("Hash changed", window.location);
      if (url.indexOf("#") >= 0) {
        const newHash = url.substring(url.indexOf("#"));
        setStateHash(newHash);
      } else {
        setStateHash("#");
      }
    }
    router.events.on("hashChangeStart", hashChangeStart);
    return () => {
      router.events.off("hashChangeStart", hashChangeStart);
    };
  }, []);
  function setNavHash(newHash: string) {
    if (navHash !== newHash) {
      const path = window.location.pathname + newHash;
      router.push(page, path);
    }
  }
  return [navHash, setNavHash];
}