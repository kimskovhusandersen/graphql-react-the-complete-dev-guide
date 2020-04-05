import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LyricList = (props) => {
  const { lyrics } = props;

  const onLike = (id, likes) => {
    props.mutate({
      variables: {
        id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        likeLyric: {
          id,
          likes: likes + 1,
          __typename: 'LyricType',
        },
      },
    });
  };

  let lyricList = null;

  if (lyrics && lyrics.length) {
    lyricList = (
      <ul className="collection">
        {lyrics.map(({ id, content, likes }) => (
          <li key={id} className="collection-item">
            {content}
            <div className="vote-box">
              <i className="material-icons" onClick={() => onLike(id, likes)}>
                thumb_up
              </i>
              <span style={{ marginLeft: '1em' }}>{likes}</span>
            </div>
          </li>
        ))}
      </ul>
    );
  }
  return <div>{lyricList}</div>;
};

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

LyricList.defaultProps = {
  lyrics: [],
};
LyricList.propTypes = {
  lyrics: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  mutate: PropTypes.func.isRequired,
};

export default graphql(mutation)(LyricList);
