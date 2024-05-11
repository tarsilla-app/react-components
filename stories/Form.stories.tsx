import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';

import { Form, useForm } from '../src/form';
import { Contract } from '../src/form/types';

function FormStory({ contract }: { contract: Contract }): JSX.Element {
  const form = useForm({ contract });

  //console.log('dirty', form.methods.formState.isDirty, form.methods.formState.dirtyFields);

  function onSubmit() {
    const data = form.methods.getValues();
    console.log(data);
  }

  function onCancel() {
    form.methods.reset();
  }

  return (
    <div>
      <Form form={form} />
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

const meta = {
  title: 'Form',
  component: FormStory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
  decorators: [
    (Story, ctx) => {
      const [, setArgs] = useArgs<typeof ctx.args>();

      setArgs(ctx.args);

      return <Story args={{ ...ctx.args }} />;
    },
  ],
} satisfies Meta<typeof FormStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rows: Story = {
  args: {
    contract: {
      rows: [
        {
          id: 'row1',
          fields: [
            {
              id: 'row1field1',
              type: 'input',
              title: 'Row 1 Field 1',
              fieldProps: {
                placeholder: 'Row 1 Field 1',
              },
            },
            {
              id: 'row1field2',
              type: 'input',
            },
            {
              id: 'row1field3',
              type: 'input',
            },
          ],
        },
        {
          id: 'row2',
          fields: [
            {
              id: 'row2field1',
              type: 'textarea',
              fieldProps: {
                width: '200px',
              },
            },
          ],
        },
        {
          id: 'row3',
          fields: [
            {
              id: 'row3field1',
              type: 'select',
              fieldProps: {
                placeholder: 'test',
                options: [
                  {
                    label: 'option 1',
                    value: 'value 1',
                  },
                ],
                width: '200px',
              },
            },
            {
              id: 'row3field2',
              type: 'select',
            },
            {
              id: 'row3field3',
              type: 'select',
            },
          ],
        },
      ],
    },
  },
};

export const Columns: Story = {
  args: {
    contract: {
      columns: [
        {
          id: 'row1',
          fields: [
            {
              id: 'row1field1',
              type: 'input',
            },
            {
              id: 'row1field2',
              type: 'input',
            },
            {
              id: 'row1field3',
              type: 'input',
            },
          ],
        },
        {
          id: 'row2',
          fields: [
            {
              id: 'row2field1',
              type: 'textarea',
            },
          ],
        },
        {
          id: 'row3',
          fields: [
            {
              id: 'row3field1',
              type: 'select',
            },
            {
              id: 'row3field2',
              type: 'select',
            },
            {
              id: 'row3field3',
              type: 'select',
            },
          ],
        },
      ],
    },
  },
};

export const Tabs: Story = {
  args: {
    contract: {
      tabs: [
        {
          id: 'tab1',
          title: 'Tab 1',
          columns: [
            {
              id: 'row1',
              fields: [
                {
                  id: 'row1field1',
                  type: 'input',
                },
                {
                  id: 'row1field2',
                  type: 'input',
                },
                {
                  id: 'row1field3',
                  type: 'input',
                },
              ],
            },
            {
              id: 'row2',
              fields: [
                {
                  id: 'row2field1',
                  type: 'input',
                },
                {
                  id: 'row2field2',
                  type: 'input',
                },
                {
                  id: 'row2field3',
                  type: 'input',
                },
              ],
            },
            {
              id: 'row3',
              fields: [
                {
                  id: 'row3field1',
                  type: 'input',
                },
                {
                  id: 'row3field2',
                  type: 'input',
                },
                {
                  id: 'row3field3',
                  type: 'input',
                },
              ],
            },
          ],
        },
        {
          id: 'tab2',
          title: 'Tab 2',
          rows: [
            {
              id: 'row1',
              fields: [
                {
                  id: 'row1field1',
                  type: 'input',
                },
                {
                  id: 'row1field2',
                  type: 'input',
                },
                {
                  id: 'row1field3',
                  type: 'input',
                },
              ],
            },
            {
              id: 'row2',
              fields: [
                {
                  id: 'row2field1',
                  type: 'input',
                },
                {
                  id: 'row2field2',
                  type: 'input',
                },
                {
                  id: 'row2field3',
                  type: 'input',
                },
              ],
            },
            {
              id: 'row3',
              fields: [
                {
                  id: 'row3field1',
                  type: 'input',
                },
                {
                  id: 'row3field2',
                  type: 'input',
                },
                {
                  id: 'row3field3',
                  type: 'input',
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
