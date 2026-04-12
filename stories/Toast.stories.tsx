import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { toast } from 'react-toastify';

import { Toast } from '../src/toast/index.js';

const StyleDecorator: Decorator = (Story, { args }) => {
  return (
    <div>
      <button
        onClick={() =>
          toast('🦄 Wow so easy!', {
            autoClose: 5000,
            closeOnClick: false,
            draggable: true,
            hideProgressBar: false,
            pauseOnHover: true,
            position: 'top-right',
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
  args: {},
  argTypes: {},
  component: Toast,
  decorators: [StyleDecorator],
  parameters: {
    layout: 'centered',
  },
  title: 'Toast',
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
