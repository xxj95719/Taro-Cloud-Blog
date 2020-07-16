import Taro, { FC, memo } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtCard } from 'taro-ui';
import filters from '@/utils/filters';
import './index.scss';
type Props = {
	item: {
		title: string;
		desc: string;
		sortType: number;
		sortTypeName?: string;
		creatTime: Date;
		updateTime: Date;
	};
	onGoToDetail: void;
};
const XCard: FC<Props> = ({ item, onGoToDetail }) => {
	const x_card__extra = {
		maxWidth: Taro.pxTransform(600),
		fontSize: '12px',
		color: 'rgb(97, 144, 232)'
	};

	return (
		<View className='x-cart'>
			<AtCard
				extraStyle={x_card__extra}
				note={`更新时间：${filters.formateDate(item.updateTime, '/')}`}
				extra={item.sortTypeName}
				title={item.title}
				thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'
				onClick={onGoToDetail}>
				{item.desc}
			</AtCard>
		</View>
	);
};

// 提高渲染表现
XCard.defaultProps = {
	item: {
		title: '',
		desc: '',
		sortType: 0,
		sortTypeName: '',
		creatTime: new Date(),
		updateTime: new Date()
	}
};

// 返回false本次则会渲染，反之则不会渲染
export default memo(XCard, (prevProps, nextProps) => {
	return JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item);
});
