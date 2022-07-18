import React from 'react';
import { Row, Col } from 'antd';

import FeatureCard from '@/components/FeatureCard';
import featurePay from '@/assets/images/banner/feature-pay.png';
import featureDeposit from '@/assets/images/banner/feature-depoist.png';
import featurePlay from '@/assets/images/banner/featuer-play.png';

import styles from '../index.less';

const SectionFeature = () => {
  return (
    <Row className={styles.wrapFeature} gutter={24}>
      <Col md={{ span: 8 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 2 }}>
        <FeatureCard
          icon={featurePay}
          title="ANZEN vận tải"
          description="Giao hàng nhanh"
        />
      </Col>
      <Col md={{ span: 8 }} lg={{ span: 6, offset: 2 }} xl={{ span: 6, offset: 1 }}>
        <FeatureCard
          icon={featureDeposit}
          title="ANZEN vận tải"
          description="Tiết kiệm"
        />
      </Col>
      <Col md={{ span: 8 }} lg={{ span: 6, offset: 1 }} xl={{ span: 6, offset: 1 }}>
        <FeatureCard
          icon={featurePlay}
          title="ANZEN vận tải"
          description="An toàn"
        />
      </Col>
    </Row>
  );
};

export default SectionFeature;
