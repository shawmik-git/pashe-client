"use client";

// Each entry: [image link or file name in /public/gallery, caption]
const shots = [
  ["https://images.unsplash.com/photo-1774281810297-99e02f6efa29?w=800&q=70&auto=format&fit=crop", "Helping hands for those in need"],
  ["https://images.unsplash.com/photo-1780461159717-04ebb5eb3293?w=800&q=70&auto=format&fit=crop", "Caring for the community"],
  ["https://images.unsplash.com/photo-1598335624134-5bceb5de202d?w=800&q=70&auto=format&fit=crop", "Tree planting with family volunteers"],
  ["https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=70&auto=format&fit=crop", "Growing a greener neighbourhood"],
  ["https://images.unsplash.com/photo-1615461065624-21b562ee5566?w=800&q=70&auto=format&fit=crop", "Free health camp for families"],
  ["https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=800&q=70&auto=format&fit=crop", "Blood donation day"],
];

const srcOf = (file) => (file.startsWith("http") ? file : `/gallery/${file}`);

export default function Gallery() {
  return (
    <section className="section wrap">
      <h2 className="section-title">Neighbours at work</h2>
      <p className="section-sub">A few moments from community service events like the ones you’ll find here.</p>
      <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {shots.map(([file, caption]) => (
          <figure key={caption} className="relative aspect-[4/3] overflow-hidden rounded-box bg-neutral">
            <img src={srcOf(file)} alt={caption} loading="lazy" className="absolute inset-0 size-full object-cover" onError={(e) => (e.currentTarget.style.display = "none")} />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 text-sm font-medium text-white">{caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}