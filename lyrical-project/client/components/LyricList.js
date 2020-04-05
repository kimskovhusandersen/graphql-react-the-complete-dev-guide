import React from 'react';
import PropTypes from 'prop-types';

const LyricList = (props) => {
  const { lyrics } = props;

  const onLike = (id) => {
    console.log(id);
  };

  let lyricList = null;

  if (lyrics && lyrics.length) {
    lyricList = (
      <ul className="collection">
        {lyrics.map(({ id, content }) => (
          <li key={id} className="collection-item">
            {content}
            <i className="material-icons" onClick={() => onLike(id)}>
              thumb_up
            </i>
          </li>
        ))}
      </ul>
    );
  }
  return <div>{lyricList}</div>;
};

LyricList.defaultProps = {
  lyrics: [],
};
LyricList.propTypes = {
  lyrics: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};

export default LyricList;
