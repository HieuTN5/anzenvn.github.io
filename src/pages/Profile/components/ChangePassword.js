import React, { memo, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { getCookie } from '@/utils/utils';
import { COOKIE_NAMES } from '@/utils/constants';

const ChangePassword = (props) => {
  const [form] = Form.useForm();
  const { activeKey, isLoading } = props;
  const { onChangePassword } = props;
  console.log('init change password');

  useEffect(() => {
    form.resetFields();
  }, [activeKey, form]);

  const onSubmitChangePassword = (data) => {
    const callback = () => form.resetFields();

    const userName = getCookie(COOKIE_NAMES.USERNAME);
    const values = {
      ...data,
      userName,
    };
    const payload = { callback, values };
    onChangePassword(payload);
  };

  return (
    <Form
      name="ChangePassword"
      onFinish={onSubmitChangePassword}
      size="large"
      layout="vertical"
      requiredMark={false}
      form={form}
    >
      <Form.Item
        label="Current password"
        name="token"
        rules={[
          {
            required: true,
            message: 'Please input your current password!',
          },
        ]}
      >
        <Input.Password placeholder="Input your current password" />
      </Form.Item>
      <Form.Item
        label="New password"
        name="password"
        rules={[
          { required: true, message: 'Please input your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('token') !== value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('New password cannot be same as current password!'));
              q;
            },
          }),
        ]}
      >
        <Input.Password placeholder="Input new password" />
      </Form.Item>
      <Form.Item
        label="Confirm new password"
        name="confirmPassword"
        rules={[
          { required: true, message: 'Please input your confirm password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
              q;
            },
          }),
        ]}
      >
        <Input.Password placeholder="Input confirm new password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" loading={isLoading}>
          Update password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(ChangePassword);
