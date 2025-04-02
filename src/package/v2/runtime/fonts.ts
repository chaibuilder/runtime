export type ChaiGoogleFont = {
  family: string;
  url: string;
  fallback: string;
};

export type ChaiCustomFont = {
  family: string;
  src: {
    url: string;
    format: string;
    fontWeight?: string;
    fontStyle?: string;
    fontDisplay?: string;
    fontStretch?: string;
  }[];
  fallback: string;
};

export type ChaiFont = ChaiGoogleFont | ChaiCustomFont;

const REGISTERED_FONTS: ChaiFont[] = [
  {
    family: "Roboto",
    url: "https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap",
    fallback: `"Roboto", sans-serif`,
  },
  {
    family: "Inter",
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
    fallback: `"Inter", sans-serif`,
  },
  {
    family: "DM Sans",
    url: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
    fallback: `"DM Sans", sans-serif`,
  },
  {
    family: "Open Sans",
    url: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
    fallback: `"Open Sans", sans-serif`,
  },
  {
    family: "Lato",
    url: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
    fallback: `sans-serif`,
  },
  {
    family: "Montserrat",
    url: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
    fallback: `sans-serif`,
  },
  {
    family: "Poppins",
    url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    fallback: `sans-serif`,
  },
  {
    family: "Source Sans 3",
    url: "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap",
    fallback: `sans-serif`,
  },
  {
    family: "Nunito Sans",
    url: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
    fallback: `sans-serif`,
  },
  {
    family: "Oswald",
    url: "https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap",
    fallback: `sans-serif`,
  },
  {
    family: "Raleway",
    url: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
    fallback: `sans-serif`,
  },
  {
    family: "Merriweather",
    url: "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap",
    fallback: `serif`,
  },
  {
    family: "Playfair Display",
    url: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
    fallback: `serif`,
  },
];

export const registerChaiFont = (family: string, font: Omit<ChaiFont, "family">) => {
  REGISTERED_FONTS.unshift({
    family,
    ...font,
  } as ChaiFont);
};

export const useRegisteredFonts = () => {
  return REGISTERED_FONTS;
};

export const getRegisteredFont = (family: string) => {
  return REGISTERED_FONTS.find((font) => font.family === family);
};

export const getAllRegisteredFonts = () => {
  return REGISTERED_FONTS;
};
