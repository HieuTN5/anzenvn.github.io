import React from 'react';
import { Row, Col } from 'antd';

import styles from './index.less';

const FeatureCard = (props) => {
  const { icon, title, description } = props;
  return (
    <Row justify="center" className={styles.marginM}>
      <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 8 }} xxl={{ span: 6 }}>
        <div className={styles.featureImage}>
          <img src={icon} alt="" />
        </div>
      </Col>
      <Col md={{ span: 24 }} lg={{ span: 12 }} xl={{ span: 16 }} xxl={{ span: 18 }}>
        <div className={styles.featureContent}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </Col>
    </Row>
  );
};

export default FeatureCard;
