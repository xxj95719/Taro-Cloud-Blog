import Taro, { FC, useState, useEffect, useScope, useDidShow, useDidHide, useReachBottom } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import './index.scss';

import XCard from '@/components/XCard/index';

import XEmpty from '@/components/XEmpty/index';

import { dbGet } from '@/utils/CRUD';

type ArticleList = Array<{
	_id: string;
	articleId: string;
	artInfo: {
		_id: string;
		title: string;
		desc: string;
		fileID: string;
		content: string;
		sortType: number;
		sortTypeName?: string;
		creatTime: Date;
		updateTime: Date;
	};
}>;

interface SortTypeList {
	_id: string;
	sortType: number;
	sortTypeName: string;
}

const List: FC = () => {
	const [isFetchDone, setIsFetchDone] = useState<boolean>(false);

	const [articleList, setArticleList] = useState<ArticleList>([]); // 博客列表

	const scope = useScope();

	useEffect(() => {
		if (scope) {
			Taro.setNavigationBarTitle({
				title: scope.options.title || 'BLOG'
			});
		}
	}, []);

	useDidShow(() => {
		getArticleList();
	});

	useDidHide(() => {
		setArticleList([]);
	});

	// 联表查询(收藏集/浏览记录)
	const getArticleList = async () => {
		Taro.showLoading({
			title: '加载中'
		});
		let res: Array<SortTypeList> = (await Taro.getStorageSync('sortTypeList')) || [];
		if (!res.length) {
			res = await getArticleSortTypeList();
			Taro.setStorageSync('sortTypeList', res);
		}
		const { result } = (await Taro.cloud.callFunction({
			name: scope.options.title === '收藏集' ? 'getCollectArtList' : 'getBrowseArtList'
		})) as any;
		setIsFetchDone(true);
		if (result && result.list.length) {
			let mapData = result.list.map((item) => {
				item.artInfo = item.artInfo.map((jtem) => {
					let fObj: {
						_id?: string;
						sortType?: number;
						sortTypeName: string;
					} = res.find((ktem) => ktem.sortType === jtem.sortType) || {
						sortTypeName: ''
					};
					jtem.sortTypeName = fObj.sortTypeName;

					return jtem;
				});
				return item;
			});
			setArticleList(mapData);
			Taro.hideLoading();
		}
	};

	const getArticleSortTypeList = async () => {
		const data = await dbGet({
			collection: 'article_sort_type',
			skip: 0,
			limit: 10
		});
		return data as Array<SortTypeList>;
	};

	const onGoToDetail = (item) => {
		Taro.navigateTo({
			url: `/pages/detail/index?_id=${item.articleId}`
		});
	};

	if (!articleList.length && isFetchDone) return <XEmpty />;
	return (
		<ScrollView className='scrollview' scrollY enableBackToTop scrollAnchoring>
			{articleList.map((item) => (
				<XCard
					item={item.artInfo[0]}
					key={item._id}
					onGoToDetail={onGoToDetail.bind(this, item)}
					isHome={false}
				/>
			))}
		</ScrollView>
	);
};

export default List;
