import React, { useState } from 'react';
import { compose } from 'react-apollo';

import { loginUser, registerUser } from '../../graphql/mutations/user';
import { Input, ErrorMessage } from '../../components/globals';
import { Button } from '../../components/Button';
import { ModalType } from './AuthModal';
import { Form } from './style';

interface Props {
  type: ModalType;
  onSuccess: () => void;
  loginUser: any;
  registerUser: any;
}

function AuthForm({ type, onSuccess, loginUser, registerUser }: Props) {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState('');

  let handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    let mutate = type === ModalType.Login ? loginUser : registerUser;
    mutate({ username, password })
      .then((data: any) => {
        setIsLoading(false);
        setError('');
        onSuccess();
        // TODO: get rid of this
        window.location.reload();
      })
      .catch((e: any) => {
        if (e.graphQLErrors) {
          setError(e.graphQLErrors[0].message);
        } else {
          setError('uknown error');
        }
        setIsLoading(false);
      });
  };

  let handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    if (e.target.name === 'password') {
      setPassword(e.target.value);
    } else if (e.target.name === 'username') {
      setUsername(e.target.value);
    }
  };

  return (
    <Form onSubmit={handleSubmit} onChange={handleChange}>
      <Input
        type="text"
        placeholder="Username"
        spellCheck={false}
        name="username"
        disabled={isLoading}
        autoComplete="off"
      />
      <Input
        placeholder="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        disabled={isLoading}
      />
      <ErrorMessage>{error}</ErrorMessage>
      <Button type="primary" disabled={isLoading || !username || !password}>
        {type === ModalType.Login ? 'Log In' : 'Sign Up'}
      </Button>
    </Form>
  );
}

export default compose(
  loginUser,
  registerUser
)(AuthForm);
