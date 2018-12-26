import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import styled from 'styled-components';

import { editProfileMutation } from '../../graphql/mutations/user';
import { Input, Label } from '../../components/globals';
import theme from '../../styles/theme';
import { CTAButton } from '../../components/Button';
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from '../../graphql/mutations/__generated__/EditProfileMutation';

type Props = {
  username: string;
  bio: string;
};

const SettingsForm: React.FunctionComponent<Props> = props => {
  const [username, setUsername] = useState(props.username);
  const [bio, setBio] = useState(props.bio);
  const [canSubmit, setCanSubmit] = useState(false);

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
    setCanSubmit(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCanSubmit(false);
    editProfile();
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

export default SettingsForm;
