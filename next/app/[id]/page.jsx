// app/[niveles]/page.jsx
"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import NivelTemplate from "@/components/templates/niveles/nivelStructure";
import { nivelesData } from "@/data/nivelesData";

export default function NivelPtepage() {
  const router = useRouter();
  const [nivelData, setNivelData] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setNivelData(nivelesData[id]);
    }
  }, [router.isReady, router.query]);

  if (!nivelData) {
    return <p>Cargando o nivel no encontrado...</p>;
  }

  return (
    <NivelTemplate
    fullText={nivelData.fullText}
    images={nivelData.images}
    planetName={nivelData.planetName}
    planetNumber={nivelData.planetNumber}
    gameIntroLink={nivelData.gameIntroLink}
    buttonLinks={nivelData.buttonLinks}
    separadorColor={nivelData.separadorColor}
  />
  );
}

