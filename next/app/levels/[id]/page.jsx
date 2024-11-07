"use client";
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import NivelTemplate from '@/components/templates/levels/nivelStructure'; // Ajusta la ruta según la ubicación de tu componente
import { nivelesData } from '@/data/nivelesData'; // Importa los datos

const LevelPage = () => {
    const pathname = usePathname();
    const [id, setId] = useState(null);
    const [levelData, setLevelData] = useState(null);

    useEffect(() => {
        const idFromPathname = pathname.split('/').pop(); // Obtén el ID desde el pathname
        if (idFromPathname) {
            setId(idFromPathname);
            setLevelData(nivelesData[idFromPathname]);
        }
    }, [pathname]);

    if (!id) {
        return <div>Cargando...</div>;
    }

    if (!levelData) {
        return <div>Nivel no encontrado</div>;
    }

    return (
        <NivelTemplate
            fullText={levelData.fullText}
            images={levelData.images}
            planetName={levelData.planetName}
            planetNumber={levelData.planetNumber}
            buttonLinks={levelData.buttonLinks}
            planetImg={levelData.planetImg}
            fondoImg={levelData.fondoImg}
        />
    );
};

export default LevelPage;
