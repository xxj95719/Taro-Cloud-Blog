import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';
import { isLogin } from '@/utils';
import './index.scss';

// import { dbGet } from '@/utils/CRUD';
interface Props {
	userInfo: {
		avatarUrl: string;
		nickName: string;
	};
}

const User: FC<Props> = ({ userInfo }) => {
	const login = async () => {
		let bool = await isLogin();
		if (!bool) {
			Taro.navigateTo({ url: `/pages/login/index` });
		}
	};
	return (
		<View className='user-box' onClick={login}>
			<AtAvatar circle text='Blog' size='large' image={userInfo.avatarUrl} />
			<Text className='user-box--text'>{userInfo.nickName}</Text>
			<AtIcon prefixClass='icon' value='chevronright' size='20' color='#FFF' />
		</View>
	);
};

User.defaultProps = {
	userInfo: {
		avatarUrl: '',
		nickName: '登录'
	}
};
export default User;
