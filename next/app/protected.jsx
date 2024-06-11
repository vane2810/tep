// app/protected/page.js
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';
import Modal from '@/components/modals/guestModal';

const ProtectedPage = () => {
  const { session } = useSession(); // Hook para obtener el estado de sesión
  const router = useRouter(); // Hook para manejar la navegación
  const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

  useEffect(() => {
    if (!session) {
      
      setShowModal(true);
    }
  }, [session]);

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Función para redirigir a la página de inicio de sesión
  const handleNavigateToLogin = () => {
    router.push('/adm/login'); // Redirige a la página de inicio de sesión
  };

  if (!session) {
    return (
      <>
        {showModal && (
          <Modal
            title="Acceso Restringido"
            message="Necesitas iniciar sesión para acceder a esta página."
            onClose={handleCloseModal} // Prop para cerrar el modal
            onNavigateToLogin={handleNavigateToLogin} // Prop para redirigir a la página de inicio de sesión
          />
        )}
        <div className="text-center mt-10">Acceso restringido. Necesitas iniciar sesión para continuar.</div>
      </>
    );
  }

  return (
    <div>
      <h1>Página Protegida</h1>
      <p>Solo puedes ver este contenido si has iniciado sesión.</p>
    </div>
  );
};

export default ProtectedPage;
