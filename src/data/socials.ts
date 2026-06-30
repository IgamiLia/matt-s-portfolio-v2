export interface Social {
  label: string;
  url: string;
  icon: string;
  hoverClass: string;
}

export const socials: Social[] = [
  {
    label: "WhatsApp",
    url: "https://wa.me/5491166289713",
    icon: "/icons/whatsapp.svg",
    hoverClass: "hover:border-green-400 hover:bg-green-500/10",
  },
  {
    label: "Facebook",
    url: "https://www.facebook.com/profile.php?id=61575451869321",
    icon: "/icons/facebook.svg",
    hoverClass: "hover:border-blue-400 hover:bg-blue-500/10",
  },
  {
    label: "Email",
    url: "mailto:matt.aguirre.dev@gmail.com",
    icon: "/icons/gmail.svg",
    hoverClass: "hover:border-red-400 hover:bg-red-500/10",
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/matt.aguirre.dev",
    icon: "/icons/instagram.svg",
    hoverClass: "hover:border-pink-400 hover:bg-pink-500/10",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/matías-aguirre-75b463400",
    icon: "/icons/linkedin.svg",
    hoverClass: "hover:border-sky-400 hover:bg-sky-500/10",
  },
  {
    label: "GitHub",
    url: "https://github.com/IgamiLia",
    icon: "/icons/github.svg",
    hoverClass: "hover:border-white hover:bg-white/10",
  },
];
