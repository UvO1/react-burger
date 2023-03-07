import ModalOverlayStyles from "./modal-overlay.module.css";

type TModalOverlay = {
	onClick: () => void;
};

function ModalOverlay(props: TModalOverlay) {
	return (
		<div className={ModalOverlayStyles.overlay} onClick={props.onClick}></div>
	);
}

export default ModalOverlay;
