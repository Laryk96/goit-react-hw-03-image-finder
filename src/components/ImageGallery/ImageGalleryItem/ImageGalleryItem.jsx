import { Component } from 'react';

import Modal from 'components/Modal';

class ImageGalleryItem extends Component {
  state = {
    openModal: false,
  };

  openModal = () => {
    this.setState({ openModal: true });
  };

  closeModal = () => {
    this.setState({ openModal: false });
  };

  render() {
    const { tags, webformatURL, largeImageURL } = this.props.item;
    const { openModal } = this.state;

    return (
      <li className="ImageGalleryItem">
        <img
          src={webformatURL}
          alt={tags}
          className="ImageGalleryItem-image "
          onClick={this.openModal}
        />
        {openModal && (
          <Modal onClose={this.closeModal} alt={tags} image={largeImageURL} />
        )}
      </li>
    );
  }
}

export default ImageGalleryItem;
