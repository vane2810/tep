import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";  // Usamos este hook para redirigir
import useSession from "@/hooks/useSession"; // Hook de sesión
import Modal from "@/components/modals/privateRoute"; // Un modal que mostraría el mensaje de login

const PrivateRoute = ({ children }) => {
  const { session } = useSession(); // Obtener la sesión
  const router = useRouter(); // Hook para redirigir
  const [showModal, setShowModal] = useState(false); // Estado para mostrar el modal

  useEffect(() => {
    if (!session) {
      // Si no hay sesión, mostrar el modal para iniciar sesión
      setShowModal(true);
    }
  }, [session]);

  const handleLoginRedirect = () => {
    // Redirigir al login cuando el usuario haga click en "Iniciar sesión"
    router.push("/auth/login");
  };

  if (!session) {
    // Mientras no haya sesión, mostramos el modal
    return (
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="flex flex-col items-center">
          <button
            onClick={handleLoginRedirect}
            className="bg-purple-600 mt-4 px-4 py-2 rounded-full text-white text-xl wonder"
          >
            Iniciar sesión
          </button>
        </div>
      </Modal>
    );
  }

  return <>{children}</>; // Si hay sesión, renderiza el contenido de la página protegida
};

export default PrivateRoute;
