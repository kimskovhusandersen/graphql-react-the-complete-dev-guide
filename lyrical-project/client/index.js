import './style/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import SongList from './components/SongList';
import SongCreate from './components/SongCreate';
import SongDetail from './components/SongDetail';

const cache = new InMemoryCache({ dataIdFromObject: (o) => o.id });
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  cache,
  link,
});

const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <Route exact path="/">
        <App>
          <SongList />
        </App>
      </Route>
      <Route path="/songs/new" component={SongCreate} />
      <Route path="/songs/:id" component={SongDetail} />
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
