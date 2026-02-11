"use client";

import { SocialLinks, NAV_LINKS } from "@/constants";
import TransitionLink from "@/components/TransitionLink";

type Props = {
  bgRight?: string;
};

const Footer = ({ bgRight }: Props) => {
  return (
    <footer
      className="relative bg-background-color pt-4 pb-8 px-8 mt-0"
      style={bgRight != null ? { marginRight: bgRight } : undefined}
    >
      <div className="absolute top-0 left-8 w-2 h-2" aria-hidden>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0h8v8C4.41828 8 0 4.41828 0 0Z"
            fill="var(--background-color)"
          />
        </svg>
      </div>
      <div className="absolute top-0 right-8 w-2 h-2" aria-hidden>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 0H0v8C3.58172 8 8 4.41828 8 0Z"
            fill="var(--background-color)"
          />
        </svg>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-12 gap-4 items-start">
        <div className="min-w-0 h-full self-start col-span-3 sm:col-span-6 flex flex-col sm:justify-between">
          <p className="uppercase text-primary-color text-bodysm sm:text-bodyst lg:text-bodys mb-0">
            for collaborations <br className="hidden sm:block" />
            and inquiries
          </p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:zhavoronskaya.public@gmail.com"
            className="uppercase font-bold text-accent-color hover:text-accent-color-active text-linkm sm:text-link transition-colors duration-200 w-fit"
          >
            zhavoronskaya.public@gmail.com
          </a>
        </div>
        <nav
          className="min-w-0 self-start col-span-1 sm:col-span-2"
          aria-label="Site navigation"
        >
          <div className="text-dissolve-color text-captionm sm:text-captiont lg:text-caption sm:mb-1">
            navigation
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-0.5 sm:gap-1 [&_li]:block [&_li]:leading-none [&_li_a]:inline-block">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <TransitionLink
                  href={href}
                  className="uppercase font-bold text-accent-color hover:text-accent-color-active text-linkm sm:text-link"
                >
                  {label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="min-w-0 self-start col-span-1 sm:col-span-2">
          <div className="text-dissolve-color text-captionm sm:text-captiont lg:text-caption sm:mb-1">
            social
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-0.5 sm:gap-1 [&_li]:block [&_li]:leading-none [&_li_a]:inline-block">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.TWITTER}
                className="uppercase font-bold text-accent-color hover:text-accent-color-active text-linkm sm:text-link"
              >
                twitter
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.INSTAGRAM}
                className="uppercase font-bold text-accent-color hover:text-accent-color-active text-linkm sm:text-link"
              >
                instagram
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.TELEGRAM}
                className="uppercase font-bold text-accent-color hover:text-accent-color-active text-linkm sm:text-link"
              >
                telegram
              </a>
            </li>
          </ul>
        </div>
        <div className="min-w-0 self-start col-span-1 sm:col-span-2">
          <div className="text-dissolve-color text-captionm sm:text-captiont lg:text-caption sm:mb-1">
            music
          </div>
          <ul className="list-none p-0 m-0 flex flex-col gap-0.5 sm:gap-1 [&_li]:block [&_li]:leading-none [&_li_a]:inline-block">
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.BANDCAMP}
                className="uppercase font-bold text-accent-color hover:text-accent-color-active text-linkm sm:text-link"
              >
                bandcamp
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.SOUNDCLOUD}
                className="uppercase font-bold text-accent-color hover:text-accent-color-active text-linkm sm:text-link"
              >
                soundcloud
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
