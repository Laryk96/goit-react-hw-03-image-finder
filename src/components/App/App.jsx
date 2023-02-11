import { Component } from 'react';

import { Container } from './App.styled';
import { NotificationContainer, notify } from '../helpers/notification';
import * as API from 'components/services/FetchAPI.js';
import Searchbar from '../Searchbar';
import Title from '../Title';
import ImageGallery from '../ImageGallery';
import Button from '../Button';
import Loader from '../helpers/Loader';

class App extends Component {
  state = {
    items: [],
    query: '',
    page: 1,
    status: 'pending',
  };

  async componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ status: 'load' });

        const images = await API.getImages(this.state);
        if (images.length !== 0) {
          return this.setState(({ items }) => ({
            items: [...items, ...images],
            status: 'done',
          }));
        }

        this.setState({ status: 'not found' });
        notify(`Sorry, nothing was found on request "${query}"`);
      } catch (error) {
        console.log(error);
      }
    }
  }

  handelSabmitForm = value => {
    this.setState({ query: value, page: 1, items: [] });
  };

  increasePage = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { status } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.handelSabmitForm} />
        <ImageGallery items={this.state.items} />

        {(status === 'pending' && (
          <Title>Let's find whatever you want !</Title>
        )) ||
          (status === 'not found' && <Title>Try again !</Title>)}

        {status === 'load' && <Loader />}
        {status === 'done' && <Button onClick={this.increasePage} />}

        <NotificationContainer />
      </Container>
    );
  }
}

export default App;
