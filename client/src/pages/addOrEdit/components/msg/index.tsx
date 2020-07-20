import Taro, { FC, useState, useEffect } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { AtTextarea } from 'taro-ui';
import './index.scss';

const LeaveMsg: FC = () => {
	const [ leaveMsg, setLeaveMsg ] = useState<string>('');

	useEffect(() => {}, []);
	const handleChange = async (value) => {
		value = value.replace(/<\/?[^>]*>/g, ''); //去除HTML tag
		value = value.replace(/[ | ]*\n/g, '\n');
		console.log(value);
		setLeaveMsg(value);
	};
	return (
		<View className='msg-box'>
			<AtTextarea
				value={leaveMsg}
				onChange={handleChange}
				maxLength={200}
				placeholder='你的留言是...'
				className='blog-msg'
			/>
		</View>
	);
};

export default LeaveMsg;
