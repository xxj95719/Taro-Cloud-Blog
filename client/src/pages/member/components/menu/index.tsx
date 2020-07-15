import Taro, { FC, useEffect } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import { AtList, AtListItem } from "taro-ui";
import "./index.scss";

const Menu: FC = () => {
  useEffect(() => {}, []);

  return (
    <View className="menu-box">
      <AtList hasBorder={false}>
        <AtListItem
          title="写博客"
          arrow="right"
          iconInfo={{
            size: 25,
            color: "#78A4FA",
            prefixClass: "icon",
            value: "markdown"
          }}
          hasBorder={false}
        />
      </AtList>
    </View>
  );
};

export default Menu;
