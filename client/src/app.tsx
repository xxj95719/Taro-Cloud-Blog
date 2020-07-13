import Taro, { Component, Config } from '@tarojs/taro';
import Index from './pages/home/index';

import './app.scss';
//引入阿里图标库
import './assets/font/iconfont.css';
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {
	/**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
	config: Config = {
		pages: [ 'pages/home/index', 'pages/member/index' ],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: 'WeChat',
			navigationBarTextStyle: 'black'
		},
		tabBar: {
			color: '#65666B',
			selectedColor: '#2F7DD5',
			backgroundColor: '#fff',
			list: [
				{
					iconPath: 'assets/tabs/index_blur.png',
					selectedIconPath: 'assets/tabs/index_focus.png',
					pagePath: 'pages/home/index',
					text: '首页'
				},
				{
					iconPath: 'assets/tabs/my_blur.png',
					selectedIconPath: 'assets/tabs/my_focus.png',
					pagePath: 'pages/member/index',
					text: '我的'
				}
			]
		},
		debug: process.env.NODE_ENV === 'development',
		cloud: true
	};

	componentDidMount() {
		if (process.env.TARO_ENV === 'weapp') {
			Taro.cloud.init();
		}
	}

	componentDidShow() {}

	componentDidHide() {}

	componentDidCatchError() {}

	// 在 App 类中的 render() 函数没有实际作用
	// 请勿修改此函数
	render() {
		return <Index />;
	}
}

Taro.render(<App />, document.getElementById('app'));
