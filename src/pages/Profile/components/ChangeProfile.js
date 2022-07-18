import React, { memo, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { REGEX } from '@/utils/constants';
// import InputDecimal from '@/components/InputNumberOnly';

const ChangeProfile = (props) => {
  const { currentUser } = props;
  const [form] = Form.useForm();
  console.log('init change profile');

  useEffect(() => {
    form.setFieldsValue({
      userName: currentUser.userName,
      email: currentUser.email,
    });
  }, [currentUser, form]);
  return (
    <Form name="ChangeProfile" size="large" layout="vertical" requiredMark={false} form={form}>
      <Form.Item
        label="Username"
        name="userName"
        rules={[
          {
            required: true,
            message: 'Please input your userName!',
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your userName!',
          },
        ]}
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="Phone"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please input your phone',
          },
          {
            pattern: REGEX.NUMBER,
            message: 'Please enter a valid number.',
          },
        ]}
      >
        <Input placeholder="Your phone" />
      </Form.Item>
      <Form.Item>
        <Button type="primary">Save profile</Button>
      </Form.Item>
    </Form>
  );
};

export default memo(ChangeProfile);
