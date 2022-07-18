import React from 'react';
import PropTypes from 'prop-types';
import { history, Link } from 'umi';
import logoSRC from '@/assets/images/logo.png';
import styles from './styles.less';

const DefaultSub = () => (
  <>
    <p>
      Welcome to{' '}
      <Link to="/">
        <span>ANZEN VẬN TẢI</span>
      </Link>
    </p>
  </>
);
const TitleForm = (props) => {
  const { subContent } = props;

  return (
    <div className={styles.logoBlock}>
      <div className={styles.logo}>
        <img src={logoSRC} alt="logo" onClick={() => history.push('/')} />
      </div>
      {subContent ? subContent : <DefaultSub />}
    </div>
  );
};

TitleForm.propTypes = {
  title: PropTypes.string,
};

export default TitleForm;
