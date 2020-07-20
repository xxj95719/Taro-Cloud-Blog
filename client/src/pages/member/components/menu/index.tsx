import Taro, { FC, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import './index.scss';

const Menu: FC = () => {
	const list = [
		{
			title: '收藏集',
			iconInfo: {
				size: 25,
				color: '#f70',
				prefixClass: 'icon',
				value: 'start'
			},
			linkUrl: `/pages/list/index?title=收藏集`
		},
		{
			title: '阅读过的文章',
			iconInfo: {
				size: 25,
				color: '#78A4FA',
				prefixClass: 'icon',
				value: 'eye'
			},
			linkUrl: `/pages/list/index?title=阅读过的文章`
		},
		{
			title: '写博客',
			iconInfo: {
				size: 25,
				color: '#78A4FA',
				prefixClass: 'icon',
				value: 'markdown'
			},
			linkUrl: `/pages/addOrEdit/index?title=写博客`
		}
	];
	useEffect(() => {}, []);

	const onGoToLink = (linkUrl) => {
		Taro.navigateTo({ url: linkUrl });
	};
	return (
		<View className='menu-box'>
			<AtList hasBorder={false}>
				{list.map((item) => (
					<AtListItem
						key={item.title}
						title={item.title}
						arrow='right'
						iconInfo={item.iconInfo}
						hasBorder={false}
						onClick={onGoToLink.bind(this, item.linkUrl)}
					/>
				))}
			</AtList>
		</View>
	);
};

export default Menu;
