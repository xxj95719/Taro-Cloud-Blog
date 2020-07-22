import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import './index.scss';

type SortType = {
	_id: string;
	sortType: number;
	sortTypeName: string;
	title?: string;
};

interface Props {
	tabList: [SortType];
	onClickTabsPane: Function;
}

const TabsPane: FC<Props> = ({ tabList, onClickTabsPane }) => {
	const [ current, setCurrent ] = useState<number>();

	const [ mapTabList, setMapTabList ] = useState<SortType[]>();

	useEffect(
		() => {
			let mapTabList: SortType[] =
				tabList.map((item) => {
					item.title = item.sortTypeName;
					return item;
				}) || [];
			mapTabList.unshift({
				title: '全部',
				_id: '',
				sortType: 0,
				sortTypeName: ''
			});
			setMapTabList(mapTabList);
		},
		[ mapTabList ]
	);

	const handleClick = async (value) => {
		setCurrent(value);
		if (mapTabList) {
			onClickTabsPane(mapTabList[value].sortType);
		}
	};
	return (
		<AtTabs current={current} tabList={mapTabList} onClick={handleClick} scroll>
			{tabList.map((item, index) => <AtTabsPane current={current} index={index} key={item._id} />)}
		</AtTabs>
	);
};

TabsPane.defaultProps = {
	tabList: [
		{
			title: '全部',
			_id: '',
			sortType: 0,
			sortTypeName: ''
		}
	],
	onClickTabsPane: () => {}
};
export default TabsPane;
