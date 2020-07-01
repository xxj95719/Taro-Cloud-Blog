import Taro, { Component } from "@tarojs/taro";
import { AtCard } from "taro-ui";
import { View, Text, Button } from "@tarojs/components";

export default class Card extends Component {
  state = {
    context: {}
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <AtCard
        note="小Tips"
        extra="额外信息"
        title="这是个标题"
        thumb="http://www.logoquan.com/upload/list/20180421/logoquan15259400209.PNG"
      >
        这也是内容区 可以随意定义功能
      </AtCard>
    );
  }
}
