import Taro, { FC, useState, useEffect, useShareAppMessage, useReachBottom } from '@tarojs/taro';
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
	const [isFetchDone, setIsFetchDone] = useState<boolean>(false);

	const [isInit, setInit] = useState<boolean>(true);

	const [skip, setSkip] = useState<number>(0); // 数据位置标识

	const [sortType, setSortType] = useState<number | undefined>(); // 数据位置标识

	const [articleList, setArticleList] = useState<ArticleList>([]); // 博客列表

	const [sortTypeList, setSortTypeList] = useState<any>([]); // 标签分类

	const [status, setStatus] = useState<string>(''); // 状态

	useShareAppMessage(() => {
		return {
			title: '快来看我吧～',
			path: '/pages/home/index'
		};
	});

	useEffect(
		() => {
			getArticleList();
		},
		[skip]
	);

	useEffect(
		() => {
			if (isInit) {
				setInit(false);
			} else {
				getArticleList();
			}
		},
		[sortType]
	);

	const getArticleList = async () => {
		Taro.showLoading({
			title: '加载中'
		});
		let res: SortTypeList[] = (await Taro.getStorageSync('sortTypeList')) || [];
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
			key: 'updateTime',
			sort: 'desc',
			where: {
				sortType
			}
		});
		Taro.hideLoading();
		setIsFetchDone(true);

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
		if (mapData.length < 10) {
			setStatus('noMore');
		}

		if (mapData.length) {
			mapData = articleList.concat(mapData);
			setArticleList(mapData);
		}
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
		setSortType(!sortType ? undefined : sortType);
		setSkip(0);
		setArticleList([]);
	};

	const onGoToDetail = (item) => {
		Taro.navigateTo({
			url: `/pages/detail/index?_id=${item._id}`
		});
	};

	useReachBottom(() => {
		if (status === 'noMore') return;
		setStatus('loading')
		setSkip(articleList.length || 0);
		console.log('useReachBottom')
	})
	return (
		<ScrollView className='scrollview' scrollY enableBackToTop scrollAnchoring >
			<TabsPane tabList={sortTypeList} onClickTabsPane={onClickTabsPane} />

			{articleList.length &&
				articleList.map((item) => (
					<XCard item={item} key={item._id} onGoToDetail={onGoToDetail.bind(this, item)} />
				))}
			{articleList.length >= 10 && <AtLoadMore status={status} />}

			{!articleList.length && isFetchDone && <XEmpty />}
		</ScrollView>
	);
};

Home.config = {
	navigationBarTitleText: 'BLOG'
};
export default Home;
