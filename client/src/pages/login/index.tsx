import Taro, { FC, useEffect } from '@tarojs/taro';
import { View, Image, Text } from '@tarojs/components';
import { AtButton } from 'taro-ui';
import './index.scss';

const Login: FC = () => {
	useEffect(() => {
		Taro.clearStorageSync();
	}, []);
	const onLogin = async (info) => {
		Taro.showLoading({
			title: '加载中'
		});
		Taro.cloud
			.callFunction({
				// 要调用的云函数名称
				name: 'login',
				data: {
					userInfo: info.detail.userInfo
				}
			})
			.then((res) => {
				Taro.hideLoading();
				let userInfo = res.result;
				userInfo = Object.assign(userInfo, info.detail.userInfo);

				Taro.setStorageSync('userInfo', userInfo);

				onBack();
			})
			.catch((err) => {
				Taro.hideLoading();
				Taro.showToast({
					title: '登录失败，请稍后重试',
					icon: 'none',
					mask: true
				});
				Taro.clearStorageSync();
				console.log(err);
			});
	};
	const onBack = () => {
		Taro.navigateBack({
			fail: () => {
				Taro.switchTab({
					url: '/pages/home/index'
				});
			}
		});
	};
	return (
		<View className='login'>
			<View className='login-box'>
				<Image className='login-box--logo' src='../../assets/img/login/kebogigi.jpg' mode='widthFix' />
				<AtButton circle full className='login-box--btn' openType='getUserInfo' onGetUserInfo={onLogin}>
					微信一键登录
				</AtButton>
				<Text className='login-box--back' onClick={onBack}>
					返回
				</Text>
			</View>
		</View>
	);
};

Login.config = {
	navigationBarTitleText: '一键登录',
	navigationBarTextStyle: 'black',
	navigationBarBackgroundColor: '#f8f8f8'
};
export default Login;
