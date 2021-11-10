import SurferCover from "../../../../assets/surfer.jpeg";
import CoachCover from "../../../../assets/tablas.jpeg";

export const PROFILES = {
  SURFER: "surfer",
  COACH: "coach",
};

export const PROFILE_CARDS = [
  {
    profile: PROFILES.SURFER,
    cover: SurferCover,
    title: "Surfer",
    description:
      "Necesito una tabla, traje o alguien que me enseñe. Me gustaria ponerme en contacto con alguien que pueda brindarme alguno de estos elementos.",
    table: "Alquilar tabla",
    classnames: "profile-card-cover",
  },
  {
    profile: PROFILES.COACH,
    cover: CoachCover,
    title: "Coach",
    description:
      "Tengo para alquilar tablas, trajes o enseño a surfear. Estoy a disposicion para aquellos que esten buscando alguno de estos elementos.",
    table: "Ofrecer tabla",
    classnames: "profile-card-cover",
  },
];
