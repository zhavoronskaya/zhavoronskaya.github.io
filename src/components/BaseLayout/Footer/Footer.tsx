"use client";

import { usePathname } from "next/navigation";
import { SocialLinks, NAV_LINKS } from "@/constants";
import TransitionLink from "@/components/TransitionLink";
import AnimatedSwapTitle from "@/components/AnimatedSwapTitle";
import { cn } from "@/helpers/ClassName";

type Props = {
  bgRight?: string;
};

const DESKTOP_BP = {
  contact: "xl",
  default: "md",
} as const;

const Footer = ({ bgRight }: Props) => {
  const pathname = usePathname();
  const isContact = pathname?.startsWith("/contact");
  const bp = isContact ? DESKTOP_BP.contact : DESKTOP_BP.default;

  return (
    <footer
      className="relative bg-background-color pt-4 pb-8 px-4 sm:px-8 mt-0 overflow-x-hidden"
      style={bgRight != null ? { marginRight: bgRight } : undefined}
    >
      <div className="absolute top-0 left-4 sm:left-8 w-2 h-2" aria-hidden>
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
      <div className="absolute top-0 right-4 sm:right-8 w-2 h-2" aria-hidden>
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

      <div
        className={cn(
          "grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-x-0 gap-y-6 items-start",
          bp === "xl"
            ? "xl:grid-cols-12 xl:gap-x-4 xl:gap-y-4"
            : "md:grid-cols-12 md:gap-x-4 md:gap-y-4"
        )}
      >
        <div
          className={cn(
            "min-w-0 h-full self-start col-span-full flex flex-col order-4 mt-0",
            bp === "xl"
              ? "xl:col-span-6 xl:justify-between xl:order-1"
              : "md:col-span-6 md:justify-between md:order-1"
          )}
        >
          <AnimatedSwapTitle
            topText="Work // play"
            bottomText="code // jam"
            className={cn(
              "uppercase text-primary-color font-semibold text-bodym mb-3",
              bp === "xl" ? "xl:text-bodys xl:mb-0" : "md:text-bodys md:mb-0"
            )}
          />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="mailto:zhavoronskaya.public@gmail.com"
            className={cn(
              "uppercase font-semibold !text-[var(--accent-color)] hover:!text-[var(--accent-color-active)] text-captionm transition-colors duration-200 w-fit break-all",
              bp === "xl" ? "xl:text-link" : "md:text-link"
            )}
          >
            zhavoronskaya.public@gmail.com
          </a>
        </div>
        <nav
          className={cn(
            "min-w-0 self-start order-1",
            bp === "xl"
              ? "xl:col-span-2 xl:order-2"
              : "md:col-span-2 md:order-2"
          )}
          aria-label="Site navigation"
        >
          <div
            className={cn(
              "!text-[var(--dissolve-color)] text-remarkm",
              bp === "xl"
                ? "xl:text-caption xl:mb-1"
                : "md:text-caption md:mb-1"
            )}
          >
            navigation
          </div>
          <ul
            className={cn(
              "list-none p-0 m-0 flex flex-col gap-0.5 [&_li]:block [&_li]:leading-none [&_li_a]:inline-block",
              bp === "xl" ? "xl:gap-1" : "md:gap-1"
            )}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <TransitionLink
                  href={href}
                  className={cn(
                    "uppercase font-semibold !text-[var(--accent-color)] hover:!text-[var(--accent-color-active)] text-hintm",
                    bp === "xl" ? "xl:text-link" : "md:text-link"
                  )}
                >
                  {label}
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>
        <div
          className={cn(
            "min-w-0 self-start order-2",
            bp === "xl"
              ? "xl:col-span-2 xl:order-3"
              : "md:col-span-2 md:order-3"
          )}
        >
          <div
            className={cn(
              "!text-[var(--dissolve-color)] text-remarkm",
              bp === "xl"
                ? "xl:text-caption xl:mb-1"
                : "md:text-caption md:mb-1"
            )}
          >
            social
          </div>
          <ul
            className={cn(
              "list-none p-0 m-0 flex flex-col gap-0.5 [&_li]:block [&_li]:leading-none [&_li_a]:inline-block",
              bp === "xl" ? "xl:gap-1" : "md:gap-1"
            )}
          >
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.TWITTER}
                className={cn(
                  "uppercase font-semibold !text-[var(--accent-color)] hover:!text-[var(--accent-color-active)] text-hintm",
                  bp === "xl" ? "xl:text-link" : "md:text-link"
                )}
              >
                twitter
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.INSTAGRAM}
                className={cn(
                  "uppercase font-semibold !text-[var(--accent-color)] hover:!text-[var(--accent-color-active)] text-hintm",
                  bp === "xl" ? "xl:text-link" : "md:text-link"
                )}
              >
                instagram
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.TELEGRAM}
                className={cn(
                  "uppercase font-semibold !text-[var(--accent-color)] hover:!text-[var(--accent-color-active)] text-hintm",
                  bp === "xl" ? "xl:text-link" : "md:text-link"
                )}
              >
                telegram
              </a>
            </li>
          </ul>
        </div>
        <div
          className={cn(
            "min-w-0 self-start order-3",
            bp === "xl"
              ? "xl:col-span-2 xl:order-4"
              : "md:col-span-2 md:order-4"
          )}
        >
          <div
            className={cn(
              "!text-[var(--dissolve-color)] text-remarkm",
              bp === "xl"
                ? "xl:text-caption xl:mb-1"
                : "md:text-caption md:mb-1"
            )}
          >
            music
          </div>
          <ul
            className={cn(
              "list-none p-0 m-0 flex flex-col gap-0.5 [&_li]:block [&_li]:leading-none [&_li_a]:inline-block",
              bp === "xl" ? "xl:gap-1" : "md:gap-1"
            )}
          >
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.BANDCAMP}
                className={cn(
                  "uppercase font-semibold !text-[var(--accent-color)] hover:!text-[var(--accent-color-active)] text-hintm",
                  bp === "xl" ? "xl:text-link" : "md:text-link"
                )}
              >
                bandcamp
              </a>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={SocialLinks.SOUNDCLOUD}
                className={cn(
                  "uppercase font-semibold !text-[var(--accent-color)] hover:!text-[var(--accent-color-active)] text-hintm",
                  bp === "xl" ? "xl:text-link" : "md:text-link"
                )}
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
