import AnimatedContent from './bits/AnimatedContent';
import SectionHeading from './SectionHeading';
import { travel } from '../config/site';

const { lat, lon } = travel.map;
const BBOX = [lon - 0.022, lat - 0.015, lon + 0.022, lat + 0.015].join(',');
const EMBED_URL = `https://www.openstreetmap.org/export/embed.html?bbox=${BBOX}&layer=mapnik&marker=${lat},${lon}`;

/** Chapter V — venue, map and the practical notes guests ask about. */
export default function Travel() {
  return (
    <section id="travel" className="section-pad relative bg-cream scroll-mt-20">
      <SectionHeading
        chapter={travel.chapter}
        eyebrow="Finding us"
        title={travel.title}
        intro={travel.intro}
      />

      <div className="mx-auto mt-14 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-14">
        <AnimatedContent direction="left" distance={40}>
          <div className="relative overflow-hidden border border-gold/40">
            <iframe
              title="Map showing Utawala, Nairobi — the area around PCEA St Luke"
              src={EMBED_URL}
              className="block h-[19rem] w-full border-0 sm:h-[24rem]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-field-deep/90 px-4 py-3">
              <p className="font-serif text-[1.05rem] text-cream">
                PCEA St Luke · Utawala, Nairobi
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={travel.map.directionsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-gold btn-gold--solid"
            >
              Get directions
            </a>
            <a
              href={travel.map.googleMapsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-gold"
            >
              Open in Google Maps
            </a>
          </div>

          <p className="mt-4 text-sm italic text-ink/55">
            The map is centred on Utawala. The directions link resolves the exact
            church.
          </p>
        </AnimatedContent>

        <div className="space-y-8">
          {travel.blocks.map((block, index) => (
            <AnimatedContent
              key={block.heading}
              direction="right"
              distance={34}
              delay={index * 90}
            >
              <div className="border-l-2 border-gold/50 pl-5">
                <h3 className="font-serif text-[1.3rem] text-field-deep">
                  {block.heading}
                </h3>
                <p className="mt-2 text-[1.02rem] leading-relaxed text-ink/72">
                  {block.detail}
                </p>
              </div>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
