import Taro, { FC } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';
import { isLogin } from '@/utils';
import './index.scss';
import { ITouchEvent } from '@tarojs/components/types/common';

// import { dbGet } from '@/utils/CRUD';
interface Props {
	userInfo: {
		avatarUrl: string;
		nickName: string;
	};
	onDebug: (event: ITouchEvent) => any
}

const User: FC<Props> = ({ userInfo, onDebug }) => {

	const login = async () => {
		let bool = await isLogin();
		if (!bool) {
			Taro.navigateTo({ url: `/pages/login/index` });
		}
	};

	return (
		<View className='user-box' onClick={login}>
			<View onClick={onDebug} >
				<AtAvatar circle text='Blog' size='large' image={userInfo.avatarUrl} />
			</View>
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
