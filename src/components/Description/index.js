import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles.less';

const Description = (props) => {
  const {
    className,
    children,
    value,
  } = props;

  return (
    <p className={classnames(styles.description, className)}>
      {children || value}
    </p>
  );
}

Description.Label = (props) => {
  const {
    className,
    children,
  } = props;

  return (
    <p className={classnames(styles.label, className)}>
      {children}
    </p>
  );
}

Description.Wrapper = (props) => {
  const {
    className,
    children,
  } = props;

  return (
    <div className={classnames(styles.wrapper, className)}>
      {children}
    </div>
  );
}

Description.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
};
Description.defaultProps = {
  className: '',
  children: null,
};

export default Description;
