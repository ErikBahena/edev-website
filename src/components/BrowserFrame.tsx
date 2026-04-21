import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  appName: string;
  sizes?: string;
  quality?: number;
  className?: string;
  /**
   * Optional CSS aspect-ratio for the screenshot (e.g. "2 / 1").
   * When set, the image is forced to that ratio with the top of the
   * screenshot pinned (excess cropped from the bottom). Useful for
   * taller screenshots that would otherwise dominate the layout.
   */
  aspectRatio?: string;
};

/**
 * macOS-style window chrome wrapping a screenshot.
 * Used in the hero and case studies sections.
 */
export default function BrowserFrame({
  src,
  alt,
  width,
  height,
  appName,
  sizes = "(max-width: 768px) 100vw, 640px",
  quality = 90,
  className = "",
  aspectRatio,
}: Props) {
  return (
    <div
      className={`rounded-xl overflow-hidden bg-white ${className}`}
      style={{
        border: "1px solid #DDD8CF",
        boxShadow:
          "0 4px 6px -1px rgba(0,0,0,0.04), 0 12px 40px -8px rgba(0,0,0,0.1)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "#F6F6F6", borderBottom: "1px solid #E5E5E5" }}
      >
        <div className="flex gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#FF5F57" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#FEBC2E" }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#28C840" }}
          />
        </div>
        <div className="flex-1 mx-4">
          <div
            className="bg-white rounded px-3 py-1 text-center max-w-[160px] mx-auto font-display font-medium"
            style={{
              fontSize: "11px",
              border: "1px solid #E0E0E0",
              color: "#999",
            }}
          >
            {appName}
          </div>
        </div>
        <div className="w-[42px]" />
      </div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`w-full h-auto block ${aspectRatio ? "object-cover object-top" : ""}`}
        style={aspectRatio ? { aspectRatio } : undefined}
        sizes={sizes}
        quality={quality}
      />
    </div>
  );
}
