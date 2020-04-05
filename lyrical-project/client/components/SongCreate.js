import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import fetchSongs from '../queries/fetchSongs';

const SongCreate = (props) => {
  const [title, setTitle] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    await props
      .mutate({
        variables: {
          title,
        },
        refetchQueries: [{ query: fetchSongs }],
      })
      .then(() => props.history.push('/'));
  };

  return (
    <div>
      <Link to="/">Back</Link>
      <h3>Create a new song</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Song Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </div>
  );
};

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

SongCreate.defaultProps = {
  history: {},
};

SongCreate.propTypes = {
  mutate: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};

export default graphql(mutation)(SongCreate);
