import { Col, notification, Row } from 'antd';
import React from 'react';
import { useIntl, formatMessage } from 'umi';
import { CheckCircleFilled, ExclamationCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const icons = {
  info: <ExclamationCircleFilled />,
  success: <CheckCircleFilled style={{ color: '#01aa26' }} />,
  warning: <ExclamationCircleFilled style={{ color: '#f59208' }} />,
  error: <CloseCircleFilled style={{ color: '#eb436b' }} />,
};

const colors = {
  info: '#c2c2c2',
  success: '#01aa26',
  warning: '#f59208',
  error: '#eb436b',
};

export const buildMessage = (message) =>
  message &&
  formatMessage(
    { id: `common.message.${message.code}`, defaultMessage: message.pattern },
    message.data || [],
  );

export function batchNotification(
  messages,
  hideNotify,
  keepOldNotifications,
  tempDuration,
  className,
) {
  let duration = tempDuration;
  if (hideNotify) {
    return;
  }
  if (messages.length) {
    if (messages.length === 1 && (messages[0].level === 'info' || messages[0].level === 'error')) {
      duration = 5;
    } else if (duration === undefined) {
      duration = 4;
    }

    const description = messages.map((item, i) => (
      <Row
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        wrap={false}
        gutter={16}
        style={{ marginBottom: 8, color: colors[item.level], flexWrap: 'nowrap' }}
      >
        <Col flex="none">{icons[item.level]}</Col>
        <Col flex="auto" style={{ paddingRight: 16 }}>
          {item.message || item.pattern}
        </Col>
      </Row>
    ));
    if (!keepOldNotifications) {
      notification.destroy();
    }
    notification.open({ message: ' ', description, duration, className });
  }
}

export const notifyInstant = {
  error(pattern, ...params) {
    batchNotification([{ level: 'error', pattern }], ...params);
  },
  success(pattern, ...params) {
    batchNotification([{ level: 'success', pattern }], ...params);
  },
  info(pattern, ...params) {
    batchNotification([{ level: 'info', pattern }], ...params);
  },
  warning(pattern, ...params) {
    batchNotification([{ level: 'warning', pattern }], ...params);
  },
  clear() {
    notification.destroy();
  },
};
