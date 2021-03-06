import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import AuthForm from './AuthForm';
import mutation from '../mutations/login';
import query from '../queries/me';

const LoginForm = (props) => {
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (props.data && props.data.me) {
      props.history.push('/dashboard');
    }
  }, [props.data]);

  const handleSubmit = async (args) => {
    try {
      await props.mutate({
        variables: { ...args },
        refetchQueries: [{ query }],
      });
      setErrors([]);
    } catch (res) {
      const errs = res.graphQLErrors.map((err) => err.message);
      setErrors([errs]);
    }
  };

  return (
    <>
      <h3>Login</h3>
      <AuthForm errors={errors} handleSubmit={handleSubmit} />
    </>
  );
};

export default graphql(mutation)(graphql(query)(LoginForm));
