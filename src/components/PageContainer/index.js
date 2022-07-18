import React from 'react';
import PropTypes from 'prop-types';
import { connect, } from 'dva';
import { Spin, Affix } from 'antd';
import classnames from 'classnames';


import styles from './styles.less';

const PageContainer = (props) => {
  const {
    collapsed,
    title,
    loading,
    renderAction,
    renderActionDark,
    children,
    className,
    actionClassName,
    spinerClassName,
  } = props;

  const spinClass = classnames({
    [styles.spinnerCollapsed]: collapsed,
    [styles.spinnerExpand]: !collapsed,
  }, styles.spinner, spinerClassName);

  return (
    <div className={classnames(styles.pageContainer, className)}>
      <Spin wrapperClassName={spinClass} className={styles.zindex} spinning={loading} size="large" tip="Loading.....">
        {title &&
          <div className={styles.title}>
            {title}
          </div>
        }
        {/* {renderAction &&
          <Affix top={0} className={styles.affixCustom}>
            <ActionButton className={classnames(actionClassName, styles.actions, { [styles['actions--dark']]: renderActionDark })}>
              {renderAction}
            </ActionButton>
          </Affix>
        } */}
        {children}
      </Spin>
    </div>
  );
};


PageContainer.propTypes = {
  loading: PropTypes.bool,
  title: PropTypes.string,
  renderAction: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  renderActionDark: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  spinerClassName: PropTypes.string,
  actionClassName: PropTypes.string,
};

PageContainer.defaultProps = {
  loading: false,
  title: '',
  renderAction: null,
  renderActionDark: false,
  children: null,
  className: '',
  spinerClassName: '',
  actionClassName: '',
};

const mapStateToProps = ({ global }) => ({
  collapsed: global.collapsed,
});

export default connect(mapStateToProps)(PageContainer);
