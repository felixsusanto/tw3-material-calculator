import React from 'react';
import SelectComponents from 'components/SelectComponents';
import { render } from '@testing-library/react';

describe('<SelectComponents />', () => {
  it('should render', () => {
    const { debug, rerender } = render(<SelectComponents />);
    rerender(
      <SelectComponents
        placeholder="placeholder"
        value="value"
        options={[
          [
            "Group",
            ["A", "B", "C"] 
          ]
        ]}
      />
    );
  });
});