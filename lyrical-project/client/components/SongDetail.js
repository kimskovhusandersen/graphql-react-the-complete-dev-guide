import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import fetchSong from '../queries/fetchSong';
import LyricCreate from './LyricCreate';
import LyricList from './LyricList';

const SongDetail = (props) => {
  const { song } = props.data;

  let songDetails = <div>Loading...</div>;
  let lyrics = [];
  if (song) {
    songDetails = song.title;
    lyrics = song.lyrics || [];
  }

  return (
    <>
      <Link to="/">Back</Link>
      <h3>{songDetails}</h3>
      <LyricList lyrics={lyrics} />
      <LyricCreate lyrics={lyrics} songId={props.match.params.id} />
    </>
  );
};

SongDetail.defaultProps = {
  data: { song: {} },
};
SongDetail.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};

export default graphql(fetchSong, {
  options: (props) => ({ variables: { id: props.match.params.id } }),
})(SongDetail);
