/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import type { Meta, StoryObj } from '@storybook/react';
import { toast } from 'react-toastify';

import { Toast } from '../src/toast/index.js';

const meta: Meta<typeof Toast> = {
  title: 'Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
  },
  argTypes: {},
  args: {},
  decorators: [
    (Story: any, { args }: any): JSX.Element => {
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
    },
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
