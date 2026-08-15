const FIT = 0.7;
const MIN_ZOOM = 1.1;

const close = () => {
  document
    .querySelectorAll(".img-clicked")
    .forEach((image) => image.classList.remove("img-clicked"));
};

const open = (image: HTMLImageElement) => {
  const rect = image.getBoundingClientRect();

  const scale = Math.min(
    (window.innerWidth * FIT) / rect.width,
    (window.innerHeight * FIT) / rect.height,
  );

  if (scale < MIN_ZOOM) {
    return;
  }

  image.style.setProperty(
    "--dx",
    `${window.innerWidth / 2 - (rect.left + rect.width / 2)}px`,
  );
  image.style.setProperty(
    "--dy",
    `${window.innerHeight / 2 - (rect.top + rect.height / 2)}px`,
  );
  image.style.setProperty("--k", `${scale}`);

  image.classList.add("img-clicked");
};

export const addImageClickListener = () => {
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = image.classList.contains("img-clicked");
      close();

      if (!isOpen) {
        open(image);
      }
    });
  });

  window.addEventListener("click", close);
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  window.addEventListener("resize", close);
};

(() => void addImageClickListener())();
