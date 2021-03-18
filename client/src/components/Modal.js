import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ action, header, content, buttons }) => {
	return ReactDOM.createPortal(
		<div onClick={action} className="ui dimmer modals visible active">
			<div
				onClick={(e) => e.stopPropagation()}
				className="ui standard modal visible active"
			>
				<div className="header">{header}</div>
				<div className="content">{content}</div>
				<div className="actions">{buttons}</div>
			</div>
		</div>,
		document.querySelector('#modal')
	);
};

export default Modal;
