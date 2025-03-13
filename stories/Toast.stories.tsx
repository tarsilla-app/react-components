import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { toast } from 'react-toastify';

import { Toast } from '../src/toast/index.js';

const StyleDecorator: Decorator = (Story, { args }) => {
  return (
    <div>
      <button
        onClick={() =>
          toast('🦄 Wow so easy!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            //transition: Bounce,
          })
        }
      >
        Show Toast
      </button>
      <Story args={args} />
    </div>
  );
};

const meta: Meta<typeof Toast> = {
  title: 'Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
  decorators: [StyleDecorator],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
