import Taro, { FC } from '@tarojs/taro';
import { Button } from '@tarojs/components';
import './index.scss';

interface Props {
	onExit: Function;
}
const Exit: FC<Props> = ({ onExit }) => {
	const loginOut = () => {
		onExit();
	};
	return (
		<Button onClick={loginOut} className='login-exit-btn'>
			退出登录
		</Button>
	);
};

export default Exit;
