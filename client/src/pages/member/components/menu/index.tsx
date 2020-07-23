import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
import { isLogin } from '@/utils';
import './index.scss';

interface Props {
	list: {
		title: string;
		iconInfo: {
			size: number;
			color: string;
			prefixClass: string;
			value: string;
		};
		linkUrl: string;
		needLogin: boolean;
	}[];
}
const Menu: FC<Props> = ({ list }) => {
	const onGoToLink = async (linkUrl, needLogin) => {
		let bool = await isLogin();
		if (!needLogin || bool) {
			Taro.navigateTo({ url: linkUrl });
		} else {
			Taro.navigateTo({ url: `/pages/login/index` });
		}
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
						onClick={onGoToLink.bind(this, item.linkUrl, item.needLogin)}
					/>
				))}
			</AtList>
		</View>
	);
};

Menu.defaultProps = {
	list: []
};
export default Menu;
