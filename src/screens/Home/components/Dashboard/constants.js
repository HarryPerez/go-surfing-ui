import surferCover from "../../../../assets/surfer.jpeg";
import coachCover from "../../../../assets/coach.jpeg";

export const PROFILES = {
  SURFER: "surfer",
  COACH: "coach",
};

export const DASHBOARD_CARDS = [
  {
    type: PROFILES.SURFER,
    cover: surferCover,
    title: "Surfer",
    description:
      "Necesito una tabla, traje o alguien que me enseñe. Me gustaria ponerme en contacto con alguien que pueda brindarme alguno de estos elementos.",
  },
  {
    type: PROFILES.COACH,
    cover: coachCover,
    title: "Coach",
    description:
      "Tengo para alquilar tablas, trajes o enseño a surfear. Estoy a disposicion para aquellos que esten buscando alguno de estos elementos.",
  },
];
