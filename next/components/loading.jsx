// Componente reutilizabl de esperar dadjhsuidh
export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">

      <img
        src="/img/personajes/starly/starly.png"
        className="border-purple-500 border-t-4 border-b-4 rounded-full w-22 h-24 animate-spin"
      />

      <p className="ml-4 font-semibold text-4xl text-purple-600 story">Cargando ...</p>
    </div >
  );
}
