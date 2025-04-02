export type ChaiGoogleFont = {
  name: string;
  url: string;
  family: string;
};

export type ChaiCustomFont = {
  name: string;
  src: { url: string; format: string }[];
  family: string;
  fontWeight?: string;
  fontStyle?: string;
  fontDisplay?: string;
};

export type ChaiFont = ChaiGoogleFont | ChaiCustomFont;

const REGISTERED_FONTS: ChaiFont[] = [
  {
    name: "Roboto",
    url: "https://fonts.googleapis.com/css2?family=Roboto:ital,wdth,wght@0,75..100,100..900;1,75..100,100..900&display=swap",
    family: `"Roboto", sans-serif`,
  },
  {
    name: "Inter",
    url: "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap",
    family: `"Inter", sans-serif`,
  },
  {
    name: "DM Sans",
    url: "https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap",
    family: `"DM Sans", sans-serif`,
  },
  {
    name: "Open Sans",
    url: "https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap",
    family: `"Open Sans", sans-serif`,
  },
  {
    name: "Lato",
    url: "https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap",
    family: `"Lato", sans-serif`,
  },
  {
    name: "Montserrat",
    url: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
    family: `"Montserrat", sans-serif`,
  },
  {
    name: "Poppins",
    url: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
    family: `"Poppins", sans-serif`,
  },
  {
    name: "Source Sans 3",
    url: "https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap",
    family: `"Source Sans 3", sans-serif`,
  },
  {
    name: "Nunito Sans",
    url: "https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap",
    family: `"Nunito Sans", sans-serif`,
  },
  {
    name: "Oswald",
    url: "https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap",
    family: `"Oswald", sans-serif`,
  },
  {
    name: "Raleway",
    url: "https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap",
    family: `"Raleway", sans-serif`,
  },
  {
    name: "Merriweather",
    url: "https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap",
    family: `"Merriweather", serif`,
  },
  {
    name: "Playfair Display",
    url: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap",
    family: `"Playfair Display", serif`,
  },
];

export const registerChaiFont = <T extends ChaiFont>(fontName: string, font: T) => {
  REGISTERED_FONTS.unshift({
    name: fontName,
    ...font,
  });
};

export const useRegisteredFonts = () => {
  return REGISTERED_FONTS;
};
