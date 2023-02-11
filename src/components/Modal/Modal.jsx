import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Modal extends Component {
  componentDidMount() {
    console.log('listen');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, image, alt } = this.props;
    const portal = document.getElementById('modal');

    return ReactDOM.createPortal(
      <div className="Overlay" onClick={onClose}>
        <div className="Modal">
          <img src={image} alt={alt} />
        </div>
      </div>,
      portal
    );
  }
}

export default Modal;
