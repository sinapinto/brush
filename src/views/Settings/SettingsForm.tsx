import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';
import { CTAButton } from '../../components/Button';
import { ErrorMessage, Input, Label } from '../../components/globals';
import { editProfileMutation } from '../../graphql/mutations/user';
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from '../../graphql/mutations/__generated__/EditProfileMutation';
import { LogoutButton } from './LogoutButton';

type SettingsFormProps = {
  username: string;
  bio: string;
};

export const SettingsForm = (props: SettingsFormProps) => {
  const [username, setUsername] = useState(props.username);
  const [bio, setBio] = useState(props.bio);
  const [canSubmit, setCanSubmit] = useState(false);
  const [error, setError] = useState('');

  const editProfile = useMutation<
    EditProfileMutation,
    EditProfileMutationVariables
  >(editProfileMutation, {
    variables: { input: { bio, username } },
  });

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { id, value } = e.target;
    if (id === 'username') {
      setUsername(value);
    } else if (id === 'bio') {
      setBio(value);
    }
    setError('');
    setCanSubmit(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCanSubmit(false);
    editProfile().catch(e => {
      if (e.graphQLErrors) {
        setError(e.graphQLErrors[0].message);
      } else {
        setError('An unexpected error occured. Try again.');
      }
    });
  };

  return (
    <Form onChange={handleChange} onSubmit={handleSubmit}>
      <Row>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          defaultValue={username}
          spellCheck={false}
        />
      </Row>
      <Row>
        <Label htmlFor="bio">Bio</Label>
        <Input type="text" id="bio" defaultValue={bio} />
      </Row>
      <LogoutButton />
      <ErrorMessage>{error}</ErrorMessage>
      <CTAButton type="submit" disabled={!canSubmit}>
        Save Changes
      </CTAButton>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-flow: column;
  flex-grow: 1;
  ${Input} {
    width: 100%;
  }
`;

const Row = styled.div`
  margin: 16px 0;
`;
