// Componente para mapeo de juegos
import dynamic from "next/dynamic";

export const gameComponents = {
    "1": dynamic(() => import("@/components/minigame/trivia")),
    "2": dynamic(() => import("@/components/minigame/emparejar")),
    "3": dynamic(() => import("@/components/minigame/ordenar")),
    "4": dynamic(() => import("@/components/minigame/arrastrar")),
    "5": dynamic(() => import("@/components/minigame/completar")),
    "7": dynamic(() => import("@/components/minigame/verdadero_falso")),
    "9": dynamic(() => import("@/components/minigame/seleccionRapida")),
    "10": dynamic(() => import("@/components/minigame/elegir")),
    "11": dynamic(() => import("@/components/minigame/parejas")),
    "12": dynamic(() => import("@/components/minigame/sopa")),
};

export const configForms = {
    "1": dynamic(() => import("@/components/minigame/forms/triviaForm")),
    "2": dynamic(() => import("@/components/minigame/forms/emparejarForm")),
    "3": dynamic(() => import("@/components/minigame/forms/ordenarForm")),
    "4": dynamic(() => import("@/components/minigame/forms/arrastrarForm")),
    "5": dynamic(() => import("@/components/minigame/forms/completarForm")),
    "7": dynamic(() => import("@/components/minigame/forms/verdaderoFalsoForm")),
    "9": dynamic(() => import("@/components/minigame/forms/seleccionRapidaForm")),
    "10": dynamic(() => import("@/components/minigame/forms/elegirForm")),
    "11": dynamic(() => import("@/components/minigame/forms/parejasForm")),
    "12": dynamic(() => import("@/components/minigame/forms/sopaForm")),
};
