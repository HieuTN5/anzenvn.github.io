import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { createStructuredSelector } from 'reselect';
import { Spin } from 'antd';
import { isEmpty } from '@/utils/utils';
import PageContainer from '@/components/PageContainer';

import { NS_LIVE_GAME, CLICK_PLAY_GAME } from '../stores/constants';
import { clickPlayGameAction, saveSrcPlayGameAction } from '../stores/actions';
import { selectorSrcPlayGame } from '../stores/selectors';

import { selectorLoading } from '@/stores/loading/selector';

import styles from './index.less';

const PlayGame = (props) => {
  const {
    clickPlayGameDispatch,
    saveSrcPlayGameDispatch,
    isLoadingSrc,
    srcPlayGame,
    location: { query = {} },
  } = props;

  useEffect(() => {
    if (isEmpty(query?.pageCode)) {
      history.push('/list-games');
    } else {
      clickPlayGameDispatch({ pageCode: query?.pageCode });
    }
    return () => saveSrcPlayGameDispatch('');
  }, [query]);

  return (
    <PageContainer className={styles.containerGame} loading={isLoadingSrc}>
      {/* <Spin spinning={isLoadingSrc}> */}
      {srcPlayGame === 'Redirect error' ? (
        <div className={styles.notFoundUrl}>Not found url</div>
      ) : (
        <embed
          className={styles.gameStyles}
          allowfullscreen="true"
          src={srcPlayGame}
          width="100%"
        />
      )}
      {/* </Spin> */}
    </PageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingSrc: selectorLoading(`${NS_LIVE_GAME}/${CLICK_PLAY_GAME}`),
  srcPlayGame: selectorSrcPlayGame,
});

const mapDispatchToProps = (dispatch) => ({
  clickPlayGameDispatch: (payload) => dispatch(clickPlayGameAction(payload)),
  saveSrcPlayGameDispatch: (payload) => dispatch(saveSrcPlayGameAction(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayGame);
