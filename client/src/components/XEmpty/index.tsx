import Taro, { FC, memo } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import './index.scss';

const XEmpty: FC = () => {
	return (
		<View className='x-empty'>
			<Image
				className='x-empty-img'
				src='cloud://taro-cloud-blog-xxj95719.7461-taro-cloud-blog-xxj95719-1255350831/static/nothing.png'
			/>
			<Text className='x-empty-desc'>暂无数据</Text>
		</View>
	);
};

// 返回false本次则会渲染，反之则不会渲染
export default memo(XEmpty);
