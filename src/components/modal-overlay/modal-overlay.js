import React from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

function ModalOverlay(props) {
	return (
		<div className={ModalOverlayStyles.overlay} onClick={props.onClick}></div>
	);
}

ModalOverlay.propTypes = {
	onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
