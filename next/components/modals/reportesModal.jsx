// Modal de reporte
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaEnvelope, FaClipboardList, FaAlignLeft } from 'react-icons/fa';

const ReportCreationModal = ({ show, handleClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    type: '',
    description: '',
    status: 'pendiente',
  });
  const [showMessage, setShowMessage] = useState(false);
  const [messageContent, setMessageContent] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al crear el reporte');
      }

      setMessageContent({ type: 'success', text: 'Reporte enviado con éxito.' });
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        handleClose();
      }, 5000);
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      setMessageContent({ type: 'error', text: 'Hubo un error al enviar el reporte' });
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    }
  };

  return (
    show && (
      <div className="z-50 fixed inset-0 flex justify-center items-center modal yagora">
        <div className="absolute inset-0 bg-black opacity-50 modal-overlay"></div>
        <div className="relative z-50 bg-white shadow-lg mx-auto p-8 rounded-lg w-11/12 md:max-w-lg overflow-y-auto modal-content">
          <div className="mb-6 modal-header">
            <h5 className="font-bold text-2xl text-center text-purple-800 modal-title">Comentarios</h5>
            <button type="button" className="top-4 right-4 absolute font-bold text-2xl text-gray-800" onClick={handleClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-6 form-group">
                <FaUser className="mr-2 text-purple-800" />
                <label htmlFor="formName" className="block font-medium text-md">Nombre Apellido</label>
                <input
                  type="text"
                  id="formName"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="block border-gray-400 focus:ring-opacity-50 shadow-sm form-control mt-2 px-4 py-2 focus:border-blue-400 rounded-lg focus:ring focus:ring-blue-300 w-full text-lg"
                />
              </div>

              <div className="flex items-center mb-6 form-group">
                <FaEnvelope className="mr-2 text-purple-800" />
                <label htmlFor="formTitle" className="block mr-10 font-medium text-md">Asunto</label>
                <input
                  type="text"
                  id="formTitle"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="block border-gray-400 focus:ring-opacity-50 shadow-sm form-control mt-2 px-4 py-2 focus:border-blue-400 rounded-lg focus:ring focus:ring-blue-300 w-full text-lg"
                />
              </div>

              <div className="flex items-center mb-6 form-group">
                <FaClipboardList className="mr-2 text-purple-800" />
                <label htmlFor="formType" className="block mr-16 font-medium text-md">Tipo</label>
                <select
                  id="formType"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="block border-gray-400 focus:ring-opacity-50 shadow-sm form-control mt-2 px-4 py-2 focus:border-blue-400 rounded-lg focus:ring focus:ring-blue-300 w-full text-lg"
                >
                  <option value="">Seleccionar</option>
                  <option value="problema">Problema</option>
                  <option value="sugerencia">Sugerencia</option>
                </select>
              </div>

              <div className="flex items-center mb-2 form-group">
                <FaAlignLeft className="mr-2 text-purple-800" />
                <label htmlFor="formDescription" className="block mr-10 font-medium text-md">Descripción</label>
                <textarea
                  id="formDescription"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describa el problema o sugerencia"
                  required
                  maxLength="300" // Limitar la descripción a 300 caracteres
                  className="block border-gray-400 focus:ring-opacity-50 shadow-sm form-control mt-2 px-4 py-2 focus:border-blue-400 rounded-lg focus:ring focus:ring-blue-300 w-full text-lg"
                />
                
              </div>
              <p className="mb-6 text-end text-gray-500 text-sm">{formData.description.length} / 300 caracteres</p>

              <div className="flex justify-end">
                <button type="submit" className="bg-green-500 hover:bg-green-700 px-6 py-2 rounded-full font-bold text-lg text-white transition duration-200">
                  Enviar
                </button>
              </div>
            </form>
          </div>
          {showMessage && (
            <div className={`fixed inset-0 flex items-center justify-center z-60`}>
              <div className="flex items-center space-x-4 border-gray-300 bg-white shadow-lg p-6 border rounded-lg">
                <div className="message-icon">
                  {messageContent.type === 'success' ? (
                    <img src="/img/personajes/starly/starly2.webp" alt="Éxito" className="w-12 h-12" />
                  ) : (
                    <img src="/img/personajes/starly/starly_triste.webp" alt="Error" className="w-12 h-12" />
                  )}
                </div>
                <p className={messageContent.type === 'success' ? 'text-green-600 font-semibold text-lg' : 'text-red-600 font-semibold text-lg'}>
                  {messageContent.text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

ReportCreationModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default ReportCreationModal;
