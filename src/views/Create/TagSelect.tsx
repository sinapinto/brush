import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

type Props = {
  onChange: (tags: string[]) => void;
};

const TagSelect: React.FunctionComponent<Props> = ({ onChange }) => {
  const handleChange = (newValue: any) => {
    if (Array.isArray(newValue)) {
      const tags = newValue.map(({ value }) => String(value));
      onChange(tags);
    }
  };
  return <CreatableSelect isMulti onChange={handleChange} options={[]} />;
};

export default TagSelect;
