import React from 'react';
import { render} from '@testing-library/react';
import Empty from 'components/Empty';

test('<Empty />', () => {
  const { rerender } = render(<Empty />);
  rerender(<Empty placeholder="placeholder" />);
})