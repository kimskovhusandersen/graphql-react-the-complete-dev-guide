import React, { useState } from 'react';

const AuthForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (event) => {
    event.preventDefault();
    props.handleSubmit({ email, password });
  };

  return (
    <div className="row">
      <form className="col s4" onSubmit={onSubmit}>
        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            type="text"
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            placeholder="Password"
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="errors">
          {!!props.errors && props.errors.map((err, i) => <div key={i}>{err}</div>)}
        </div>
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
