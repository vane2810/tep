// Proteger rutas (No tocar)
import React, { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SessionContext } from '@/context/session';
import GuestModal from '@/components/modals/guestModal';

const ProtectedPage = ({ children }) => {
  const { session } = useContext(SessionContext);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!session) {
      setShowModal(true);
    }
  }, [session]);

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/'); 
  };

  if (!session) {
    return (
      <>
        <GuestModal show={showModal} onClose={handleCloseModal} />
        <div className="mt-10 text-center">Acceso restringido. Necesitas iniciar sesión para continuar.</div>
      </>
    );
  }

  return (
    <>
      {children}
    </>
  );
};

export default ProtectedPage;
