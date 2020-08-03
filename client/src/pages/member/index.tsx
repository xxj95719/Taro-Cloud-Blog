import Taro, { FC, useState, useDidShow } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';

import './index.scss';

import User from './components/user';

import Menu from './components/menu';

import Exit from './components/exit';

interface UserInfo {
	avatarUrl: string;
	nickName: string;
}

let list = [
	{
		title: '收藏集',
		iconInfo: {
			size: 25,
			color: '#f70',
			prefixClass: 'icon',
			value: 'start'
		},
		linkUrl: `/pages/list/index?title=收藏集`,
		needLogin: true
	},
	{
		title: '阅读过的文章',
		iconInfo: {
			size: 25,
			color: '#78A4FA',
			prefixClass: 'icon',
			value: 'eye'
		},
		linkUrl: `/pages/list/index?title=阅读过的文章`,
		needLogin: false
	}
];
const Member: FC = () => {
	const [ userInfo, setUserInfo ] = useState<UserInfo>({ avatarUrl: '', nickName: '登录' });

	useDidShow(() => {
		(async () => {
			const userInfo = await Taro.getStorageSync('userInfo');
			if (userInfo) {
				setUserInfo(userInfo);
				if (!list.find((item) => item.title === '写博客') && userInfo.openid === 'odRoE0Z_qNd_GMH-Z4O_Awr1E3GM') {
					list.push({
						title: '写博客',
						iconInfo: {
							size: 25,
							color: '#78A4FA',
							prefixClass: 'icon',
							value: 'markdown'
						},
						linkUrl: `/pages/addOrEdit/index?title=写博客`,
						needLogin: true
					});
				}
			}
		})();
	});
	const onExit = () => {
		Taro.clearStorageSync();

		setUserInfo({ avatarUrl: '', nickName: '登录' });
		if (list.find((item) => item.title === '写博客')) {
			list = list.filter((jtem) => jtem.title !== '写博客');
		}
	};
	return (
		<ScrollView className='scrollview' scrollY enableBackToTop scrollAnchoring>
			<User userInfo={userInfo} />
			<Menu list={list} />
			<Exit onExit={onExit} />
		</ScrollView>
	);
};

Member.config = {
	navigationBarTitleText: '我的',
	navigationStyle: 'custom'
};
export default Member;
