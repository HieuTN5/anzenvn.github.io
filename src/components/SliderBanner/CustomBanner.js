import React from 'react';
import { Button } from 'antd';
import styles from './index.less';

const CustomBanner = (props) => {
  const { buttonBanner, descriptionBanner, titleBanner, imageBanner } = props;
  const { onClick } = props;

  return (
    <div className={styles.wrapBanner}>
      <div className={styles.contentBanner}>
        <div className={styles.wrapContent}>
          <div className={styles.titleBanner}>{titleBanner || ''}</div>
          <div className={styles.descriptionBanner}>{descriptionBanner || ''}</div>
        </div>
        <Button type="primary" onClick={onClick}>
          {buttonBanner}
        </Button>
      </div>
      <img src={imageBanner} className={styles.customImage} alt="" />
    </div>
  );
};

export default CustomBanner;
