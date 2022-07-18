import React from 'react';
import { Carousel } from 'antd';
import { history } from 'umi';
import CustomBanner from './CustomBanner';
import imageBanner1 from '@/assets/images/banner/banner-1.png';
import imageBanner2 from '@/assets/images/banner/banner-2.png';
import imageBanner3 from '@/assets/images/banner/banner-3.png';
import styles from './index.less';

const SliderBanner = () => {
  return (
    <div className={styles.sliderBanner}>
      <Carousel effect="fade" style={{ overflow: 'auto' }} autoplay>
        <div>
          <CustomBanner
            buttonBanner="Play Game"
            descriptionBanner="ANZEN is Asia's largest online gambling company. that provides online gaming
                enthusiasts with Asia's leading sports, casino, slots and games brands. We have a
                team of experts around the world. that strives to create a comprehensive online
                gaming website using modern technology"
            titleBanner="ANZEN CASINO IS A LONG PROFETING"
            imageBanner={imageBanner1}
            onClick={() => history.push('/livegame')}
          />
        </div>
        <div>
          <CustomBanner
            buttonBanner="Sign up"
            descriptionBanner="Raise your horizons and immerse yourself in the crypto world filled with endless fun, excitement, 
                and countless rewards. What's better, you don't have to be a pro to earn a huge amount of money. 
                Curious how you can make money? Place a bet and try your luck by participating with ANZEN!"
            titleBanner="JOIN RIGHT NOW TO BE A MEMBER OF ANZEN"
            imageBanner={imageBanner2}
            onClick={() => history.push('/user/register')}
          />
        </div>
        <div>
          <CustomBanner
            buttonBanner="Sign up"
            descriptionBanner="Even if you don't play a particular game, it is important to know the mechanics of 
                the game along with the different techniques of how to win so that you can create a winning betting strategy. 
                Follow different experts and see how events unfold to get a better understanding of how it works to understand how the world's top bookies are organized"
            titleBanner="HOW TO BET ON BROKERS LIKE A PRO"
            imageBanner={imageBanner3}
            onClick={() => history.push('/user/register')}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default SliderBanner;
