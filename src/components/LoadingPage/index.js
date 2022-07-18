import React from 'react';
import loadingSrc from '@/assets/animation/loading.svg';
import logoSrc from '@/assets/images/logo.png';
import styles from './styles.less';

export default function LoadingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loadingWrap}>
        <img
          src="https://vantaianzen.vn/wp-content/uploads/2020/08/logo-chinh@4x-1-300x294.png"
          alt="loading"
          width="164"
        />
      </div>
      <div className={styles.logoWrap}>
        <img src={logoSrc} width="32" alt="" />
        ANZEN
      </div>
    </div>
  );
}
