import React, { useState } from 'react';
import { compose } from 'react-apollo';
import styled from 'styled-components';

import { loginUser, registerUser } from '../../graphql/mutations/user';
import { Input, ErrorMessage } from '../../components/globals';
import { CTAButton } from '../../components/Button';
import { ModalType } from './AuthModal';

interface Props {
  type: ModalType;
  onSuccess: () => void;
  loginUser: any;
  registerUser: any;
}

function AuthForm({ type, onSuccess, loginUser, registerUser }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const mutate = type === ModalType.Login ? loginUser : registerUser;
    mutate({ username, password })
      .then((data: any) => {
        setIsLoading(false);
        setError('');
        onSuccess();
      })
      .catch((e: any) => {
        if (e.graphQLErrors) {
          setError(e.graphQLErrors[0].message);
        } else {
          setError('An unexpected error occured. Try again.');
        }
        setIsLoading(false);
      });
  };

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
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
      <CTAButton type="submit" disabled={isLoading || !username || !password}>
        {type === ModalType.Login ? 'Log In' : 'Sign Up'}
      </CTAButton>
    </Form>
  );
}

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;

  > *:not(:last-child) {
    margin-bottom: 24px;
    width: 300px;
  }
`;

export default compose(
  loginUser,
  registerUser
)(AuthForm);
