import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBezierCurve,
  faDonate,
  faHistory,
  faAddressCard,
  faMoneyBill,
  faSortAmountDownAlt,
  faPlayCircle,
  faGamepad,
  faExchangeAlt,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles.less';

export default function index(props) {
  const { iconName, collapsed } = props;
  let src = '';
  switch (iconName) {
    case 'home':
      src = faHome;
      break;
    case 'donate':
      src = faDonate;
      break;
    case 'bezierCurve':
      src = faBezierCurve;
      break;
    case 'history':
      src = faHistory;
      break;
    case 'addressCard':
      src = faAddressCard;
      break;
    case 'faMoneyBill':
      src = faMoneyBill;
      break;
    case 'faSortAmountDownAlt':
      src = faSortAmountDownAlt;
      break;
    case 'faPlayCircle':
      src = faPlayCircle;
    case 'game':
      src = faGamepad;
      break;
    case 'transfer':
      src = faExchangeAlt;
      break;
    default:
      src = faHome;
      break;
  }
  return (
    <div className={styles.iconWrap}>
      <FontAwesomeIcon icon={src} />
    </div>
  );
}
