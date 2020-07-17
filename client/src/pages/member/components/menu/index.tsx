import Taro, { FC, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import './index.scss';

const Menu: FC = () => {
	useEffect(() => {}, []);

	return (
		<View className='menu-box'>
			<AtList hasBorder={false}>
				<AtListItem
					title='收藏集'
					arrow='right'
					iconInfo={{
						size: 25,
						color: '#f70',
						prefixClass: 'icon',
						value: 'start'
					}}
					hasBorder={false}
				/>
				<AtListItem
					title='阅读过的文章'
					arrow='right'
					iconInfo={{
						size: 25,
						color: '#78A4FA',
						prefixClass: 'icon',
						value: 'eye'
					}}
					hasBorder={false}
				/>

				<AtListItem
					title='写博客'
					arrow='right'
					iconInfo={{
						size: 25,
						color: '#78A4FA',
						prefixClass: 'icon',
						value: 'markdown'
					}}
					hasBorder={false}
				/>
			</AtList>
		</View>
	);
};

export default Menu;
