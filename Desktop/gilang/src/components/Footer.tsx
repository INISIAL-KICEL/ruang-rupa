import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, MessageCircle, Navigation, ChevronRight } from "lucide-react";
import { getWaLink, siteConfig } from "@/config/site-config";

/** Model shortcuts — pages with a dedicated detail page, plus the lineup anchor. */
const modelLinks: { label: string; href: string }[] = [
  { label: "New Xforce", href: "/model/xforce" },
  { label: "Destinator", href: "/model/destinator" },
  { label: "Pajero Sport", href: "/model/pajero-sport" },
  { label: "Xpander Cross", href: "/model/xpander-cross" },
  { label: "Semua Model", href: "/#lineup" },
];

type IconProps = { className?: string };

function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.08-.14 1.62.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68A6.16 6.16 0 1018.16 12 6.16 6.16 0 0012 5.84zm0 10.16A4 4 0 1116 12a4 4 0 01-4 4zm6.41-10.4a1.44 1.44 0 11-1.44-1.44 1.44 1.44 0 011.44 1.44z" />
    </svg>
  );
}

function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

export default function Footer() {
  const { sales, social, location } = siteConfig;
  const waLink = getWaLink(
    `Halo ${sales.name}, saya ingin bertanya seputar mobil Mitsubishi.`,
  );

  const socials = [
    { icon: InstagramIcon, label: social.instagram.handle, url: social.instagram.url },
    { icon: TikTokIcon, label: social.tiktok.handle, url: social.tiktok.url },
    { icon: FacebookIcon, label: social.facebook.handle, url: social.facebook.url },
  ];

  return (
    <footer id="lokasi" className="bg-mitsu-black text-white/70">
      {/* Map */}
      <div className="relative h-64 w-full sm:h-80">
        <iframe
          title="Lokasi Showroom Mitsubishi Dipo Serang"
          src={location.embedUrl}
          className="h-full w-full grayscale-[0.2]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <a
          href={location.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-mitsu-black shadow-lg transition-transform hover:scale-[1.03]"
        >
          <Navigation className="h-4 w-4 text-mitsu-red" />
          Buka di Google Maps
        </a>
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-14 lg:px-8 lg:pb-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <Image
                src="/logo/mitsubishi-white.svg"
                alt="Mitsubishi"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
              <span className="text-base font-black leading-tight text-white">
                MITSUBISHI DIPO<span className="text-mitsu-red"> SERANG</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              {siteConfig.tagline}. Melayani pembelian mobil Mitsubishi dengan
              harga terbaik & pelayanan personal.
            </p>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.url}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-white/80 ring-1 ring-white/10 transition-colors hover:bg-mitsu-red hover:text-white"
                >
                  <s.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-sm font-semibold text-white">Navigasi</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href.startsWith("#") ? `/${item.href}` : item.href}
                    className="transition-colors hover:text-mitsu-red"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Model shortcuts */}
          <div>
            <h4 className="text-sm font-semibold text-white">Model</h4>
            <ul className="mt-4 space-y-2 text-sm">
              {modelLinks.map((m) => (
                <li key={m.href}>
                  <Link
                    href={m.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-mitsu-red"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-mitsu-red transition-transform group-hover:translate-x-0.5" />
                    {m.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white">Hubungi Kami</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mitsu-red" />{" "}
                {location.label}, {sales.area}
              </li>
              <li>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-mitsu-red"
                >
                  <Phone className="h-4 w-4 text-mitsu-red" /> {sales.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${sales.email}`}
                  className="flex items-center gap-3 break-all transition-colors hover:text-mitsu-red"
                >
                  <Mail className="h-4 w-4 shrink-0 text-mitsu-red" /> {sales.email}
                </a>
              </li>
            </ul>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full gradient-red px-5 py-2.5 text-sm font-semibold text-white"
            >
              <MessageCircle className="h-4 w-4" /> Chat Sekarang
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand}. Bukan situs resmi
            Mitsubishi Motors. Dikelola oleh sales executive independen.
          </p>
          <p>{siteConfig.domain}</p>
        </div>
      </div>
    </footer>
  );
}
