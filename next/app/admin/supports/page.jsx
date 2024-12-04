// Página de soporte admin
"use client";
import React, { useState, useEffect } from "react";
import { MdEdit, MdWarning, MdAccessTime, MdCheckCircle, MdLightbulb} from 'react-icons/md';
import Volver from "@/components/elements/botonVolver";
import useSession from '@/hooks/useSession';
import MensajePermiso from '@/components/menssages/mensajePermiso';

export default function AdminSupportPage() {
  // Obtener la sesión del contexto
  const { session } = useSession();

  // Datos de reportes
  const [reportes, setReportes] = useState({ problemas: { pendientes: [], enProceso: [], resueltos: [] }, sugerencias: [] });
  const [mensaje, setMensaje] = useState('');
  const [activeTab, setActiveTab] = useState('problemas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  // Obtener los reportes del servidor
  useEffect(() => {
    
    const fetchReportes = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reports');
        if (!response.ok) {
          throw new Error('Error al obtener los reportes');
        }
        const data = await response.json();
        const problemasPendientes = data.filter(report => report.type === 'problema' && report.status === 'pendiente');
        const problemasEnProceso = data.filter(report => report.type === 'problema' && report.status === 'en proceso');
        const problemasResueltos = data.filter(report => report.type === 'problema' && report.status === 'resuelto');
        const sugerencias = data.filter(report => report.type === 'sugerencia');
        setReportes({ problemas: { pendientes: problemasPendientes, enProceso: problemasEnProceso, resueltos: problemasResueltos }, sugerencias });
      } catch (error) {
        console.error('Error al obtener los reportes:', error);
      }
    };
    fetchReportes();
  }, []);

  // Abrir modal para editar estado
  const handleOpenModal = (reporte) => {
    setSelectedReport(reporte);
    setNewStatus(reporte.status);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReport(null);
    setNewStatus('');
  };

  // Cambiar el estado del reporte
  const handleChangeStatus = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/reports/${selectedReport.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar el estado del reporte');
      }
      setMensaje('Estado del reporte actualizado con éxito. Por favor, recargar la página');
      setReportes((prev) => {
        const actualizarProblemas = (problemas) => problemas.map(report => report.id === selectedReport.id ? { ...report, status: newStatus } : report);
        return {
          problemas: {
            pendientes: actualizarProblemas(prev.problemas.pendientes),
            enProceso: actualizarProblemas(prev.problemas.enProceso),
            resueltos: actualizarProblemas(prev.problemas.resueltos),
          },
          sugerencias: prev.sugerencias,
        };
      });
      handleCloseModal();
      setTimeout(() => setMensaje(''), 5000);
    } catch (error) {
      console.error('Error al actualizar el estado del reporte:', error);
      setMensaje('Hubo un error al actualizar el estado del reporte');
      setTimeout(() => setMensaje(''), 5000);
    }
  };

  // Verificar si el usuario tiene permiso para acceder
  if (!session || session.role !== 'admin') {
    return <MensajePermiso />;
  }

  
  return (
    <main className="relative flex flex-col items-center bg-gray-50 p-8 w-full min-h-screen">
      {/* Botón Volver en la esquina superior izquierda */}
      <div className="top-4 left-4 absolute">
        <Volver href='/admin' />
      </div>

      <div className="bg-white shadow-lg mt-12 p-8 rounded-lg w-full max-w-7xl yagora">
        <h2 className="my-8 font-bold text-3xl text-blue-800 text-center">
          Administración de Reportes de Soporte
        </h2>

        {mensaje && (
          <div className="relative border-green-400 bg-green-100 mb-4 px-4 py-3 border rounded text-green-700">
            {mensaje}
          </div>
        )}

        {/* Pestañas para Problemas y Sugerencias */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab('problemas')}
            className={`w-40 py-2.5 text-xl font-medium ${activeTab === 'problemas' ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'} rounded-l-lg`}
          >
            Problemas
          </button>
          <button
            onClick={() => setActiveTab('sugerencias')}
            className={`w-40 py-2.5 text-xl font-medium ${activeTab === 'sugerencias' ? 'bg-blue-800 text-white' : 'bg-blue-100 text-blue-800'} rounded-r-lg`}
          >
            Sugerencias
          </button>
        </div>

        {/* Panel de Problemas */}
        {activeTab === 'problemas' && (
          ['pendientes', 'enProceso', 'resueltos'].map((estado) => (
            <div key={estado} className="mb-6">
              <h3 className={`font-semibold text-2xl mb-4 flex items-center`}>
                {estado === 'pendientes' && <MdWarning className="mr-2 text-red-600" />}
                {estado === 'enProceso' && <MdAccessTime className="mr-2 text-yellow-600" />}
                {estado === 'resueltos' && <MdCheckCircle className="mr-2 text-green-600" />}
                {estado === 'pendientes' ? 'Problemas Pendientes' : estado === 'enProceso' ? 'Problemas en Proceso' : 'Problemas Resueltos'}
              </h3>
              {reportes.problemas[estado].length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="border-collapse bg-white shadow-md mt-4 rounded-md w-full table-auto">
                    <thead className="bg-blue-600 rounded-lg text-white">
                      <tr>
                        <th className="px-6 py-3 text-left">Nombre</th>
                        <th className="px-6 py-3 text-left">Asunto</th>
                        <th className="px-6 py-3 text-left">Descripción</th>
                        <th className="px-6 py-3 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportes.problemas[estado].map((reporte) => (
                        <tr
                          key={reporte.id}
                          className="hover:bg-blue-50 even:bg-gray-100 transition duration-200"
                        >
                          <td className="px-6 py-4 border-t font-semibold">{reporte.name}</td>
                          <td className="px-6 py-4 border-t">{reporte.title}</td>
                          <td className="px-6 py-4 border-t">{reporte.description}</td>
                          <td className="px-6 py-4 border-t text-center">
                            <button
                              onClick={() => handleOpenModal(reporte)}
                              className="text-blue-500 hover:text-blue-700 transition duration-200"
                            >
                              <MdEdit size={24} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 text-gray-600">
                  {estado === 'pendientes' ? 'No hay problemas pendientes' : estado === 'enProceso' ? 'No hay problemas en proceso' : 'No hay problemas resueltos'}
                </p>
              )}
            </div>
          ))
        )}

        {/* Panel de Sugerencias */}
        {activeTab === 'sugerencias' && (
          <div>
            <h3 className="flex items-center mb-4 font-semibold text-2xl text-blue-600">
              <MdLightbulb className="mr-2" /> Sugerencias
            </h3>
            {reportes.sugerencias.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="border-collapse bg-white shadow-md mt-4 rounded-md w-full table-auto">
                  <thead className="bg-blue-600 rounded-lg text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Nombre</th>
                      <th className="px-6 py-3 text-left">Asunto</th>
                      <th className="px-6 py-3 text-left">Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportes.sugerencias.map((reporte) => (
                      <tr
                        key={reporte.id}
                        className="hover:bg-blue-50 even:bg-gray-100 transition duration-200"
                      >
                        <td className="px-6 py-4 border-t font-semibold">{reporte.name}</td>
                        <td className="px-6 py-4 border-t">{reporte.title}</td>
                        <td className="px-6 py-4 border-t">{reporte.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-4 text-gray-600">No hay sugerencias</p>
            )}
          </div>
        )}
      </div>

      {/* Modal para cambiar el estado del reporte */}
      {isModalOpen && (
        <div className="z-50 fixed inset-0 flex justify-center items-center yagora">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative bg-white shadow-lg p-6 rounded-lg w-full max-w-sm">
            <h4 className="mb-4 font-bold text-center text-xl">Cambiar Estado del Reporte</h4>
            <div className="mb-4">
              <label htmlFor="status" className="block font-medium text-md">Nuevo Estado</label>
              <select
                id="status"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="block border-gray-300 focus:ring-opacity-50 shadow-sm form-control mt-2 px-4 py-2 focus:border-blue-400 rounded-md focus:ring focus:ring-blue-200 w-full text-lg"
              >
                <option value="pendiente">Pendiente</option>
                <option value="en proceso">En Proceso</option>
                <option value="resuelto">Resuelto</option>
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-700 px-4 py-2 rounded-full font-bold text-white transition duration-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleChangeStatus}
                className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-full font-bold text-white transition duration-200"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
