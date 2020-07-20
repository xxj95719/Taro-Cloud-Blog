import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import './index.scss';

import XCard from '@/components/XCard/index';

import XEmpty from '@/components/XEmpty/index';

import TabsPane from './components/tabsPane/index';

import { dbGet } from '@/utils/CRUD';

type ArticleList = Array<{
	_id: string;
	title: string;
	desc: string;
	fileID: string;
	content: string;
	sortType: number;
	sortTypeName?: string;
	creatTime: Date;
	updateTime: Date;
}>;

interface SortTypeList {
	_id: string;
	sortType: number;
	sortTypeName: string;
}

const Home: FC = () => {
	const [ skip, setSkip ] = useState<number>(0); // 数据位置标识

	const [ sortType, setSortType ] = useState<number>(); // 数据位置标识

	const [ articleList, setArticleList ] = useState<ArticleList>([]); // 博客列表

	const [ sortTypeList, setSortTypeList ] = useState<any>([]); // 标签分类

	const [ status, setStatus ] = useState<string>('more'); // 状态

	useEffect(
		() => {
			getArticleList();
		},
		[ skip ]
	);
	useEffect(
		() => {
			getArticleList();
		},
		[ sortType ]
	);
	const getArticleList = async () => {
		let res: SortTypeList[] = (await Taro.getStorageSync('sortTypeList')) || [ {} ];
		if (!res.length) {
			res = await getArticleSortTypeList();
			Taro.setStorageSync('sortTypeList', res);
			setSortTypeList(res);
		} else {
			setSortTypeList(Taro.getStorageSync('sortTypeList'));
		}
		const data = await dbGet({
			collection: 'article',
			skip,
			limit: 10,
			where: {
				sortType
			}
		});

		let mapData = data as ArticleList;

		mapData = mapData.map((item) => {
			let fObj: {
				_id?: string;
				sortType?: number;
				sortTypeName: string;
			} = res.find((jtem) => jtem.sortType === item.sortType) || {
				sortTypeName: ''
			};
			item.sortTypeName = fObj.sortTypeName;

			return item;
		});
		if (mapData.length) {
			setStatus('more');

			mapData = articleList.concat(mapData);
		} else {
			setStatus('noMore');

			mapData = articleList;
		}

		setArticleList(mapData);
	};

	const getArticleSortTypeList = async () => {
		const data = await dbGet({
			collection: 'article_sort_type',
			skip,
			limit: 10
		});
		return data as Array<SortTypeList>;
	};
	const onClickTabsPane = async (sortType) => {
		setSortType(sortType);
		setSkip(0);
		setArticleList([]);
		setStatus('more');
	};
	const onClickLoadMore = async () => {
		setStatus('loading');
		setSkip(articleList.length || 0);
	};

	const onGoToDetail = (item) => {
		Taro.navigateTo({
			url: `/pages/detail/index?_id=${item._id}`
		});
	};
	console.log(!articleList.length, 123);

	if (!articleList.length) return <XEmpty />;
	return (
		<ScrollView className='scrollview' scrollY enableBackToTop scrollAnchoring>
			<TabsPane tabList={sortTypeList} onClickTabsPane={onClickTabsPane} />
			{articleList.map((item) => (
				<XCard item={item} key={item._id} onGoToDetail={onGoToDetail.bind(this, item)} />
			))}
			{articleList.length > 10 && <AtLoadMore onClick={onClickLoadMore} status={status} />}
		</ScrollView>
	);
};

Home.config = {
	navigationBarTitleText: 'BLOG'
};
export default Home;
