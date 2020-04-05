import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import fetchSongs from '../queries/fetchSongs';

const areEqual = (prevProps, nextProps) => prevProps === nextProps;

const SongList = (props) => {
  const { data } = props;

  const onSongDelete = (id) => {
    data.songs.pop();
    props
      .mutate({
        variables: { id },
      })
      .then(() => props.data.refetch());
    // props.result.client.resetStore();
  };

  let songList = <div>Loading...</div>;
  if (data.songs && data.songs.length) {
    songList = (
      <ul className="collection">
        {data.songs.map(({ id, title }) => (
          <li key={id} className="collection-item">
            <Link to={`/songs/${id}`}>{title}</Link>
            <i className="material-icons" onClick={() => onSongDelete(id)}>
              delete
            </i>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {songList}

      <Link to="/songs/new" className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
      </Link>
    </>
  );
};

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

SongList.defaultProps = {
  data: { songs: [] },
};
SongList.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
};

export default graphql(mutation)(graphql(fetchSongs)(React.memo(SongList, areEqual)));
