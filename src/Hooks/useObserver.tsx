import { useEffect, useState } from "react";

type Elements = "work" | "projects";

export function useObserver() {
  const [element, setElement] = useState<Elements>("projects");
  const callback = (
    element: Elements,
    entries?: Array<IntersectionObserverEntry>
  ) => entries?.forEach((entry) => entry.isIntersecting && setElement(element));

  const stateElementMap: {
    [k in Elements]: (entries: Array<IntersectionObserverEntry>) => void;
  } = {
    // header: () => getCallback('work'),
    work: (entries) => callback("projects", entries),
    projects: (entries) => callback("work", entries), //@todo: This should be 'header' for mobile devices.
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observers = (Object.keys(stateElementMap) as Array<Elements>).map(
      (element) => {
        const observer = new IntersectionObserver(
          stateElementMap[element],
          options
        );
        const target = document.querySelector(`#${element}`);
        if (target) {
          observer.observe(target);
        }

        return observer;
      }
    );

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return element;
}
