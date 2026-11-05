"use client";

// Add your own photos to /public/gallery using these file names.
const shots = [
  ["g1.jpg", "Winter clothes distribution, Mirpur 10"],
  ["g2.jpg", "Blanket distribution, Mohammadpur"],
  ["g3.jpg", "Tree planting along the riverbank"],
  ["g4.jpg", "Neighbourhood clean-up drive"],
  ["g5.jpg", "Free health camp for families"],
  ["g6.jpg", "Blood donation day"],
];

export default function Gallery() {
  return (
    <section className="section wrap">
      <h2 className="section-title">Neighbours at work</h2>
      <p className="section-sub">A few moments from community service events like the ones you’ll find here.</p>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {shots.map(([file, caption]) => (
          <figure key={file} className="relative aspect-[4/3] overflow-hidden rounded-box bg-neutral">
            <img src={`/gallery/${file}`} alt={caption} loading="lazy" className="absolute inset-0 size-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 text-sm font-medium text-white">{caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
