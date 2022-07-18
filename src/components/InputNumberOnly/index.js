/* eslint-disable no-plusplus */
import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber, Form } from 'antd';
import { REGEX } from '@/utils/constants';
import styles from './styles.less';

const InputNumberOnly = (props) => {
  const {
    className,
    inputClassName,
    label,
    rules,
    required,
    noStyle,
    formProps,
    inputProps,
    onBlur,
    hasFeedback,
    validateStatus,
    help,
    onChange,
    validateTrigger,
  } = props;
  const { name } = props;

  const handleKeyDown = (event) => {
    const { shiftKey, ctrlKey, key } = event;
    const keyCode = event.keyCode || event.which;
    const isNumber =
      (keyCode >= 48 && keyCode <= 57) ||
      (keyCode >= 96 && keyCode <= 105) ||
      REGEX.NUMBER.test(key);
    const backSpace = 8;
    const deleteKeyCode = 46;
    const tab = 9;
    const isUpRightDownLeftDirection = keyCode >= 37 && keyCode <= 40;
    const home = 35;
    const end = 36;
    const isDot = keyCode === 190 || keyCode === 110;
    if (
      [backSpace, deleteKeyCode, tab, home, end].includes(keyCode) ||
      ctrlKey ||
      isUpRightDownLeftDirection ||
      isDot
    ) {
      // skip
    } else if (!isNumber || (shiftKey && isNumber)) {
      event.preventDefault();
    }
  };

  const onFocus = (event) => event.target.select();

  return (
    <Form.Item
      name={name}
      label={label}
      rules={rules}
      required={required}
      noStyle={noStyle}
      className={className}
      hasFeedback={hasFeedback}
      validateStatus={validateStatus}
      help={help}
      {...formProps}
    >
      <InputNumber
        className={styles['full-width-input']}
        autoComplete="off"
        min={0}
        step={0.1}
        onKeyDown={handleKeyDown}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        {...inputProps}
      />
    </Form.Item>
  );
};

InputNumberOnly.propTypes = {
  name: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]).isRequired,
  label: PropTypes.string,
  rules: PropTypes.arrayOf(
    PropTypes.shape({
      enum: PropTypes.arrayOf(PropTypes.any),
      len: PropTypes.number,
      max: PropTypes.number,
      message: PropTypes.string,
      min: PropTypes.number,
      pattern: PropTypes.instanceOf(RegExp),
      required: PropTypes.bool,
      transform: PropTypes.func,
      type: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
      validator: PropTypes.func,
      whitespace: PropTypes.bool,
      validateTrigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    }),
  ),
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  required: PropTypes.bool,
  noStyle: PropTypes.bool,
  formProps: PropTypes.object,
  inputProps: PropTypes.object,
  onBlur: PropTypes.func,
};
InputNumberOnly.defaultProps = {
  label: '',
  rules: [],
  className: '',
  inputClassName: '',
  required: false,
  noStyle: false,
  formProps: {},
  inputProps: {},
  onBlur: () => null,
};

export default InputNumberOnly;
