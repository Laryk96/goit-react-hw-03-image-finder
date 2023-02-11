import { Component } from 'react';
import * as API from 'components/services/FetchAPI.js';
import Searchbar from './Searchbar';
import Title from './Title';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

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
      <div className="App">
        <Searchbar onSubmit={this.handelSabmitForm} />
        {status === 'pending' && <Title>Let's find whatever you want !</Title>}
        <ImageGallery items={this.state.items} />
        {status === 'load' && <Loader />}
        {status === 'done' && <Button onClick={this.increasePage} />}
      </div>
    );
  }
}

export default App;
