import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from 'react-apollo';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from './components/App';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/requireAuth';

const cache = new InMemoryCache({ dataIdFromObject: (o) => o.id });
const link = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin',
});

const client = new ApolloClient({
  cache,
  link,
});
const Root = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route path="/">
          <App />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignUpForm} />
          <Route path="/dashboard" component={RequireAuth(Dashboard)} />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(<Root />, document.querySelector('#root'));
