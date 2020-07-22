import Taro, { FC } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtList, AtListItem } from 'taro-ui';
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
	}[];
}
const Menu: FC<Props> = ({ list }) => {
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

Menu.defaultProps = {
	list: []
};
export default Menu;
