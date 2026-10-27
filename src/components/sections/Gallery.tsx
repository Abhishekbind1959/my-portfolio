import SectionHeading from '@/components/SectionHeading';
import PortraitFrame from '@/components/PortraitFrame';

export default function Gallery() {
  return (
    <section id="gallery" className="relative pt-24 pb-12 sm:pt-32 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="GALLERY // 05"
          title="THE PERSON BEHIND THE CODE"
          subtitle="A few moments beyond the screen."
        />

        <div className="reveal mx-auto mt-14 w-full max-w-3xl">
          <PortraitFrame
            src="/images/abhishek-photo-3.jpg"
            alt="Abhishek Bind"
            variant="gallery"
          />
        </div>
      </div>
    </section>
  );
}
