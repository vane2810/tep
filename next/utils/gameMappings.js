// Componente para mapeo de juegos
import dynamic from "next/dynamic";

export const gameComponents = {
    "1": dynamic(() => import("@/components/minigame/trivia")),
    "2": dynamic(() => import("@/components/minigame/emparejar")),
    "3": dynamic(() => import("@/components/minigame/ordenar")),
    "4": dynamic(() => import("@/components/minigame/arrastrar_soltar")),
};

export const configForms = {
    "1": dynamic(() => import("@/components/minigame/forms/triviaForm")),
    "2": dynamic(() => import("@/components/minigame/forms/emparejarForm")),
    "3": dynamic(() => import("@/components/minigame/forms/ordenarForm")),
    "4": dynamic(() => import("@/components/minigame/forms/arrastrarForm")),
};
