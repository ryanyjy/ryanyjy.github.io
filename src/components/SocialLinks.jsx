const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ryanyjy",
    icon: (
      <path
        fill="currentColor"
        d="M8.25 3.5a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM3.5 8.75h3v9h-3v-9Zm5.25 0h2.88v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.74h-3v-5.09c0-1.21-.02-2.77-1.69-2.77-1.69 0-1.95 1.32-1.95 2.68v5.18h-3v-9Z"
      />
    ),
  },
  {
    label: "Behance",
    href: "https://www.behance.net/ryanyjy",
    icon: (
      <path
        fill="currentColor"
        d="M6.5 10.2c.7-1 1.9-1.6 3.4-1.6 2.2 0 3.6 1.2 3.8 3.3H9.8c-.1-.8-.7-1.3-1.7-1.3-1.1 0-1.8.8-2 2.1h5.8c.1.3.1.6.1.9 0 3-1.7 4.9-4.5 4.9-2.8 0-4.6-2.1-4.6-5.2 0-.5.1-1 .2-1.5H6.5Zm2.8 3.5c.2.9.9 1.4 1.9 1.4 1.2 0 2-.8 2.1-2.2H9.1c.1.5.1.6.2.8ZM2.5 8.6h4.1v1.4H2.5V8.6Zm0 3.1h3.9v1.4H2.5v-1.4ZM15.7 7h4.3v1.5h-4.3V7Z"
      />
    ),
  },
  {
    label: "Email",
    href: "mailto:ryanyjy@gmail.com",
    icon: (
      <>
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          d="M3 6.5h14v7H3z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          d="m3 7.5 7 5 7-5"
        />
      </>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/ryanyjy",
    icon: (
      <path
        fill="currentColor"
        d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.3-1.1.6-1.4-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.2 9.2 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.7 5 .4.3.7 1 .7 2v3c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2Z"
      />
    ),
  },
];

export default function SocialLinks({ isTeal }) {
  const linkClass = isTeal
    ? "text-white/80 hover:text-white"
    : "text-black/80 hover:text-black";

  return (
    <nav
      className="absolute top-8 right-8 z-20 flex items-center gap-3"
      aria-label="Social links"
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
          aria-label={link.label}
          className={`transition-colors duration-1000 ${linkClass}`}
        >
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5"
            aria-hidden="true"
          >
            {link.icon}
          </svg>
        </a>
      ))}
    </nav>
  );
}
