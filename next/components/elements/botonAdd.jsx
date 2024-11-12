// components/AddButton.jsx
import React from "react";
import PropTypes from "prop-types";
import { FiPlus } from "react-icons/fi";

const AddButton = ({ text, onClick }) => {
    return (
        <div className="flex justify-start mb-10 ml-8">
            <button
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 shadow-md px-5 py-3 rounded-lg font-bold text-white text-xl transition-transform duration-300 yagora hover:scale-105"
                onClick={onClick}
            >
                <FiPlus className="text-xl" /> {/* Icono de agregar */}
                <span>{text}</span>
            </button>
        </div>
    );
};

// Definición de los tipos de propiedades
AddButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default AddButton;
