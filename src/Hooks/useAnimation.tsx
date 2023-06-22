import { useSpring } from "@react-spring/core";

interface AnimationArgs {
  delay: number;
}

export function useFadeIn({ delay }: AnimationArgs) {
  return useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    config: {
      duration: 1000,
    },
    delay,
  });
}
