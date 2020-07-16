import Taro, { FC, useState, useEffect, useScope } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import TaroParser from 'taro-parse';
import filters from '@/utils/filters';
import './index.scss';

import { dbGet } from '@/utils/CRUD';

interface ArticleDetail {
	_id: string;
	title: string;
	desc: string;
	content: string;
	sortType: number;
	sortTypeName?: string;
	creatTime: Date;
	updateTime: Date;
}

const BlogDetail: FC = () => {
	const scope = useScope();
	const [ detail, setDetail ] = useState<ArticleDetail>();

	useEffect(
		() => {
			if (scope) {
				console.log(scope.options.info);
				setDetail(JSON.parse(scope.options.info));
			}
		},
		[ scope ]
	);

	if (!detail) return null;
	return (
		<View className='at-article'>
			<View className='at-article__h1'>{detail.title}</View>
			<View className='at-article__info'>
				{`${filters.formateDate(detail.updateTime, '-')}`}
				<Text className='at-article__name'>🐔哥</Text>
			</View>
			<View className='at-article__content'>
				<Image className='at-article__img' src='https://jdc.jd.com/img/400x400' mode='widthFix' />

				<View className='at-article__section'>
					<View className='at-article__p'>
						<TaroParser type='markdown' theme='light' content={detail.content} />
					</View>
				</View>
			</View>
		</View>
	);
};

BlogDetail.config = {
	navigationBarTitleText: '文章详情',
	navigationBarTextStyle: 'white',
	navigationBarBackgroundColor: '#F15E19'
};

export default BlogDetail;
