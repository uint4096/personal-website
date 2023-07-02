import { useEffect, useState } from "react";

type CallbackMap<T extends string> = {
  [k in T]?: (entries: Array<IntersectionObserverEntry>) => void;
};

export function useObserver<T extends string>(
  initialElement: T,
  stateMap: { [k in T]: T },
  threshold?: number
) {
  const [element, setElement] = useState<T>(initialElement);
  const callback = (element: T, entries?: Array<IntersectionObserverEntry>) =>
    entries?.forEach((entry) => entry.isIntersecting && setElement(element));

  const callbackMap = (Object.keys(stateMap) as Array<T>).reduce<
    CallbackMap<T>
  >(
    (map, element) => (
      (map[element] = (entries: Array<IntersectionObserverEntry>) =>
        callback(stateMap[element], entries)),
      map
    ),
    {}
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: threshold ?? 0.5,
    };

    const observers = (Object.keys(callbackMap) as Array<T>).map((element) => {
      const cb = callbackMap[element];
      if (!cb) {
        throw new Error("No callback specified!");
      }
      const observer = new IntersectionObserver(cb!, options);
      const target = document.querySelector(`#${element}`);
      if (target) {
        observer.observe(target);
      }

      return observer;
    });

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return element;
}
