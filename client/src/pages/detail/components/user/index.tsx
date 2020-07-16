import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { AtAvatar, AtIcon } from 'taro-ui';
import './index.scss';

// import { dbGet } from '@/utils/CRUD';

const User: FC = () => {
	return (
		<View className='user-box'>
			<AtAvatar circle text='Blog' size='large' />
			<Text className='user-box--text'>登录</Text>
			<AtIcon prefixClass='icon' value='chevronright' size='20' color='#FFF' />
		</View>
	);
};

export default User;
