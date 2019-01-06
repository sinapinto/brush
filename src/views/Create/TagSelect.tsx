import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';

type TagSelectProps = {
  onChange: (tags: string[]) => void;
};

export const TagSelect = ({ onChange }: TagSelectProps) => {
  const handleChange = (newValue: any) => {
    if (Array.isArray(newValue)) {
      const tags = newValue.map(({ value }) => String(value));
      onChange(tags);
    }
  };
  return <CreatableSelect isMulti onChange={handleChange} options={[]} />;
};
