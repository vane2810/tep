// ./utils/gameTypeComponent.js
import JuegoOpciones from "@/components/minigame/juegoOpciones";
import JuegoArrastrar from "@/components/minigame/juegoArrastrar";
import JuegoOrdenar from "@/components/minigame/juegoOrdenar";

const gameTypeComponent = {
    1: {
        component: JuegoOpciones,
        name: "Selecciona la Opción Correcta"
    },
    2: {
        component: JuegoArrastrar,
        name: "Arrastra los Elementos"
    },
    3: {
        component: JuegoOrdenar,
        name: "Ordena los Elementos"
    },
};

export { gameTypeComponent };
