import Taro, { FC, memo } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import filters from '@/utils/filters';
import './index.scss';
type Props = {
	item: {
		title: string;
		desc: string;
		fileID: string;
		sortType: number;
		sortTypeName?: string;
		creatTime: Date;
		updateTime: Date;
	};
	isHome?: boolean;
	onGoToDetail: any;
};
const XCard: FC<Props> = ({ item, isHome, onGoToDetail }) => {
	return (
		<View className='x-cart' onClick={onGoToDetail}>
			{isHome && (
				<View className='x-cart-user'>
					<View className='x-cart-user--head'>
						<Image
							className='x-cart-user--head__avatar'
							src={'http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'}
						/>
						<Text className='x-cart-user--head__name'>🐔哥·{filters.beautifyDate(item.updateTime)}</Text>
					</View>
					<Text className='x-cart-tag'>{item.sortTypeName}</Text>
				</View>
			)}

			<View className='x-cart-box'>
				<View>
					<View>
						<Text className='x-cart-box--title'>{item.title}</Text>
					</View>
					{isHome && (
						<View>
							<Text className='x-cart-box--desc'>{item.desc}</Text>
						</View>
					)}
					{!isHome && (
						<View>
							<Text className='x-cart-box--desc'>{`🐔哥·${filters.beautifyDate(
								item.updateTime
							)}·${item.sortTypeName}`}</Text>
						</View>
					)}
				</View>
				{item.fileID && <Image src={item.fileID} className='x-cart-box--img' mode='widthFix' />}
			</View>
		</View>
	);
};

// 提高渲染表现
XCard.defaultProps = {
	item: {
		title: '',
		desc: '',
		fileID: '',
		sortType: 0,
		sortTypeName: '',
		creatTime: new Date(),
		updateTime: new Date()
	},
	isHome: true
};

// 返回false本次则会渲染，反之则不会渲染
export default memo(XCard, (prevProps, nextProps) => {
	return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item);
});
