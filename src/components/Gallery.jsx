import { photos } from "../wedding.js";

export default function Gallery() {
  const list = photos.gallery;
  if (!list.length) return null;
  return (
    <section className="block gallery" aria-labelledby="gallery-h">
      <div className="block-body reveal">
        <h2 className="h" id="gallery-h">
          Photo Gallery
        </h2>
        <div className={`gallery-grid count-${Math.min(list.length, 3)}`}>
          {list.map((src, i) => (
            <img key={src} src={`${import.meta.env.BASE_URL}${src}`} alt={`Photo ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </div>
    </section>
  );
}
