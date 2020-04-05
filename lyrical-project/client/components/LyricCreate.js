import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LyricCreate = (props) => {
  const [content, setContent] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    props.mutate({
      variables: {
        songId: props.songId,
        content,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        addLyricToSong: {
          id: props.songId,
          lyrics: [
            ...props.lyrics,
            {
              id: 'somerandomid',
              content,
              likes: 0,
              __typename: 'LyricType',
            },
          ],
          __typename: 'SongType',
        },
      },
    });
    setContent('');
  };

  return (
    <>
      <h6 style={{ marginTop: '5em' }}>Add lyric</h6>
      <form onSubmit={onSubmit}>
        <label htmlFor="lyric">
          <input
            type="text"
            id="lyric"
            name="lyric"
            onChange={(event) => setContent(event.target.value)}
            value={content}
          />
        </label>
      </form>
    </>
  );
};

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

LyricCreate.propTypes = {
  mutate: PropTypes.func.isRequired,
  songId: PropTypes.string.isRequired,
};

export default graphql(mutation)(LyricCreate);
