import React, { useEffect } from 'react';
import { graphql } from 'react-apollo';
import query from '../queries/me';

export default (WrappedComponent) => {
  const RequireAuth = (props) => {
    useEffect(() => {
      if (props.data && !props.data.me) {
        props.history.push('/');
      }
    }, [props.data]);
    return <WrappedComponent {...props} />;
  };

  return graphql(query)(RequireAuth);
};
