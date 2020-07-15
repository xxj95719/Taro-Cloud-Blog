import Taro, { FC, useState, useEffect } from "@tarojs/taro";
import { ScrollView } from "@tarojs/components";
import "./index.scss";

import User from "./components/user";

import Menu from "./components/menu";

import { dbGet } from "@/utils/CRUD";

const Member: FC = () => {
  useEffect(() => {}, []);

  return (
    <ScrollView className="scrollview" scrollY enableBackToTop scrollAnchoring>
      <User />
      <Menu />
    </ScrollView>
  );
};

Member.config = {
  navigationBarTitleText: "我的",
  navigationStyle: "custom"
};
export default Member;
