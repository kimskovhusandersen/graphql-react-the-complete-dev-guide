import React from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import query from '../queries/me';
import mutations from '../mutations/logout';

const Header = (props) => {
  const onLogoutClick = (event) => {
    event.preventDefault();
    props.mutate({
      refetchQueries: [{ query }],
    });
  };

  const renderButtons = () => {
    const { loading, me } = props.data;
    if (loading) {
      return <div />;
    }
    if (me) {
      return (
        <li>
          <a onClick={(event) => onLogoutClick(event)}>Logout</a>
        </li>
      );
    }
    return (
      <>
        <li>
          <Link to="/signup">Sign up</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </>
    );
  };

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo left">
          Home
        </Link>
        <ul className="right">{renderButtons()}</ul>
      </div>
    </nav>
  );
};

export default graphql(mutations)(graphql(query)(Header));
