import Taro, { FC, memo } from '@tarojs/taro';
import { AtCard } from 'taro-ui';
// import TaroParser from "taro-parse";
import filters from '@/utils/filters';

type Props = {
	item: {
		title: string;
		desc: string;
		sortType: number;
		sortTypeName?: string;
		creatTime: Date;
		updateTime: Date;
	};
};
const XCard: FC<Props> = ({ item }) => {
	const x_card__extra = {
		maxWidth: Taro.pxTransform(600),
		fontSize: '12px',
		color: 'rgb(97, 144, 232)'
	};

	return (
		<AtCard
			extraStyle={x_card__extra}
			note={`更新时间：${filters.formateDate(item.updateTime, '/')}`}
			extra={item.sortTypeName}
			title={item.title}
			thumb='http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG'>
			{item.desc}
			{/* <TaroParser type="markdown" theme="dark" content={item.content} /> */}
		</AtCard>
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
