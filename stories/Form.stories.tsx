import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryFn } from '@storybook/react';

import { Form, useForm } from '../src/form';

const meta = {
  title: 'Form',
  component: Form,
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
} satisfies Meta<typeof Form>;

export default meta;

export const Rows: StoryFn<typeof meta> = (args) => {
  const form = useForm({
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
    values: {
      row2field1: 'row2field1 value',
    },
  });

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
      <Form {...args} form={form} />
      <button onClick={onCancel}>Cancel</button>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
};

export const Columns: StoryFn<typeof meta> = (args) => {
  const form = useForm({
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
  });

  return <Form {...args} form={form} />;
};

export const Tabs: StoryFn<typeof meta> = (args) => {
  const form = useForm({
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
  });

  return <Form {...args} form={form} />;
};
