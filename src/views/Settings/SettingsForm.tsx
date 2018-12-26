import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Label } from '../../components/globals';
import theme from '../../styles/theme';
import { CTAButton } from '../../components/Button';

type Props = {
  username: string;
  bio: string;
};

const SettingsForm: React.FunctionComponent<Props> = props => {
  const [username, setUsername] = useState(props.username);
  const [bio, setBio] = useState(props.bio);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          spellCheck={false}
        />
      </Row>
      <Row>
        <Label htmlFor="bio">Bio</Label>
        <Input
          type="text"
          id="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
      </Row>
      <CTAButton type="submit">Save</CTAButton>
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
