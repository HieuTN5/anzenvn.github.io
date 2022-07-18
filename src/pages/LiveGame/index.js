import React, { useEffect } from 'react';
import { connect, history } from 'umi';
import { createStructuredSelector } from 'reselect';
import { Spin, Row, Col, Button, Typography } from 'antd';
import PageContainer from '@/components/PageContainer';
import { NS_LIVE_GAME, GET_LIST_GAME } from './stores/constants';
import { getListGameAction, resetStateAction } from './stores/actions';
import { selectorListGame } from './stores/selectors';

import { selectorLoading } from '@/stores/loading/selector';

import styles from './index.less';

const { Title } = Typography;

const LiveGame = (props) => {
  const { isLoadingGetListGame, listGame } = props;
  const { getListGameDispatch, resetStateDispatch } = props;

  const onClickPlayGame = (pageCode) => {
    history.push(`/live-game?pageCode=${pageCode}`);
  };

  useEffect(() => {
    getListGameDispatch({});
    return () => resetStateDispatch();
  }, []);

  return (
    <PageContainer className={styles.customPageContainer} loading={isLoadingGetListGame}>
      {/* <Spin spinning={isLoadingGetListGame}> */}
      <div className={styles.headingGame} style={isLoadingGetListGame ? { display: 'none' } : {}}>
        <Title level={1}>FUND GOLD Live Games</Title>
        <p>
          FUND GOLD has thousands of free online games for all generation. Play action, sports, and
          other fun games for free
        </p>
      </div>
      <div className={styles.listGame}>
        <Row gutter={24}>
          {listGame.map((item, index) => (
            <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} key={index}>
              <div className={styles.wrapGame}>
                <img src={item?.imageFullPath} alt="" className={styles.imageGame} />
                <div className={styles.wrapInfoGame}>
                  <div className={styles.infoGame}>
                    <div className={styles.detailGame}>
                      <div className={styles.textGame}>
                        <p>{item?.name?.en}</p>
                      </div>
                      <div className={styles.buttonPlayGame}>
                        <Button type="primary" onClick={() => onClickPlayGame(item?.pageCode)}>
                          Play game
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      {/* </Spin> */}
    </PageContainer>
  );
};

const mapStateToProps = createStructuredSelector({
  isLoadingGetListGame: selectorLoading(`${NS_LIVE_GAME}/${GET_LIST_GAME}`),
  listGame: selectorListGame,
});

const mapDispatchToProps = (dispatch) => ({
  getListGameDispatch: (payload) => dispatch(getListGameAction(payload)),
  resetStateDispatch: () => dispatch(resetStateAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LiveGame);
