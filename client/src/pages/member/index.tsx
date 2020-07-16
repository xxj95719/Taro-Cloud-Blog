import Taro, { FC, useState, useDidShow } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';

import './index.scss';

import User from './components/user';

import Menu from './components/menu';

import Exit from './components/exit';

import { dbGet } from '@/utils/CRUD';

interface UserInfo {
	avatarUrl: string;
	nickName: string;
}

const Member: FC = () => {
	const [ userInfo, setUserInfo ] = useState<UserInfo>({ avatarUrl: '', nickName: '登录' });

	useDidShow(() => {
		(async () => {
			const userInfo = await Taro.getStorageSync('userInfo');
			console.log(userInfo);
			if (userInfo) setUserInfo(userInfo);
		})();
	});
	const onExit = () => {
		Taro.clearStorageSync();
		setUserInfo({ avatarUrl: '', nickName: '登录' });
	};
	return (
		<ScrollView className='scrollview' scrollY enableBackToTop scrollAnchoring>
			<User userInfo={userInfo} />
			<Menu />
			<Exit onExit={onExit} />
		</ScrollView>
	);
};

Member.config = {
	navigationBarTitleText: '我的',
	navigationStyle: 'custom'
};
export default Member;
