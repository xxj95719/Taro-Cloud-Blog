import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { ScrollView } from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import './index.scss';

import XCard from '@/components/XCard/index';
import { dbGet } from '@/utils/CRUD';

type ArticleList = Array<{
	_id: string;
	title: string;
	desc: string;
	imgUrl: string;
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

	const [ articleList, setArticleList ] = useState<ArticleList>([]); // 博客列表

	const [ sortTypeList, setSortTypeList ] = useState<Array<SortTypeList>>([]); // 标签分类

	const [ status, setStatus ] = useState<string>('more'); // 状态

	useEffect(
		() => {
			getArticleList();
		},
		[ skip ]
	);
	const getArticleList = async () => {
		let res: Array<SortTypeList> = [];
		if (!sortTypeList.length) {
			res = await getArticleSortTypeList();
			setSortTypeList(res);
		}

		const data = await dbGet({ collection: 'article', skip, limit: 10 });

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

	const onClickLoadMore = async () => {
		setStatus('loading');
		setSkip(articleList.length || 0);
	};

	const onGoToDetail = (item) => {
		console.log(item);
		Taro.navigateTo({ url: `/pages/detail/index?info=${JSON.stringify(item)}` });
	};
	return (
		<ScrollView className='scrollview' scrollY enableBackToTop scrollAnchoring>
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
