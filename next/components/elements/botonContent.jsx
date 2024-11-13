// ./components/elements/ViewToggleButtons.js
import React from "react";
import PropTypes from "prop-types";
import { FaListUl, FaBook } from "react-icons/fa";


const BotonContent = ({ onListViewClick, onBookViewClick }) => {
    return (
        <div className="flex justify-center items-center space-x-6 my-10 text-xl yagora">
            <button
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 shadow-md hover:shadow-lg px-6 py-3 rounded-full font-bold text-white transform transition-colors hover:scale-105"
                onClick={onListViewClick}
            >
                <FaListUl/>
                <span>Ver en Modo Lista</span>
            </button>
            <button
                className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 shadow-md hover:shadow-lg px-6 py-3 rounded-full font-bold text-white transform transition-colors hover:scale-105"
                onClick={onBookViewClick}
            >
                <FaBook/>
                <span>Ver en Modo Cuaderno</span>
            </button>
        </div>

    );
};

BotonContent.propTypes = {
    onListViewClick: PropTypes.func.isRequired,
    onBookViewClick: PropTypes.func.isRequired,
};

export default BotonContent;
