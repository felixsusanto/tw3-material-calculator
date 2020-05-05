import React from 'react';
import CraftingMaterial from 'components/CraftingMaterial';
import { render, fireEvent } from '@testing-library/react';

jest.mock("data/craftingComponentData", () => ([
  {
    name: 'DARK_STEEL_INGOT',
    img: 'img',
    req: [
      {
        name: 'OTHER',
        qty: 2
      }
    ]
  },
  {
    name: 'DARK_STEEL_INGOT',
    img: 'img',
    req: [
      {
        name: 'OTHER_MATERIAL',
        qty: 2
      }
    ]
  },
  {
    name: 'OTHER',
    img: 'img',
    req: [
      {
        name: 'OTHER MATERIAL',
        qty: 2
      }
    ]
  },
]));

test('<CraftingMaterial />',  () => {
  const { rerender } = render(<CraftingMaterial name="TEST" isRoot qty={1} />);
  rerender(<CraftingMaterial name="DARK_STEEL_INGOT" isRoot qty={2}/>);
  rerender(<CraftingMaterial name="OTHER" isRoot={false} qty={2}/>); 
  rerender(<CraftingMaterial name="DARK_STEEL_INGOT" isRoot={false} qty={2}/>); 
})

test('Clicking', async () => {
  const { findByText } = render(<CraftingMaterial name="DARK_STEEL_INGOT" isRoot qty={1} />);
  const other = await findByText('Other');
  fireEvent.click(other);
  fireEvent.click(other);
});