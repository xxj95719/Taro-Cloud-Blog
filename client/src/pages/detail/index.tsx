import Taro, { FC, useState, useEffect, useScope } from "@tarojs/taro";
import { View, Text, Image } from "@tarojs/components";
import TaroParser from "taro-parse";
import { AtButton } from "taro-ui";
import { isLogin } from "@/utils";
import filters from "@/utils/filters";

import "./index.scss";

import { dbAdd, dbGet } from "@/utils/CRUD";

interface ArticleDetail {
  _id: string;
  title: string;
  desc: string;
  content: string;
  sortType: number;
  sortTypeName?: string;
  fileID: string;
  creatTime: Date;
  updateTime: Date;
}

const BlogDetail: FC = () => {
  const scope = useScope();
  const [detail, setDetail] = useState<ArticleDetail>();

  const [isAlreadyCollect, setIsAlreadyCollect] = useState<boolean>(false);

  useEffect(() => {
    if (scope) {
      setDetail(JSON.parse(scope.options.info));
    }
  }, [scope]);

  useEffect(() => {
    getIsAlreadyCollect();
  }, [detail]);

  const getIsAlreadyCollect = async () => {
    try {
      const userInfo = await Taro.getStorageSync("userInfo");
      if (detail && userInfo) {
        const list =
          (await dbGet({
            collection: "collect_records",
            skip: 0,
            where: { _openid: userInfo.openId, articleId: detail._id }
          })) || [];
        setIsAlreadyCollect(Boolean(list.length));
      }
    } catch (error) {}
  };
  const collect = async () => {
    let bool = await isLogin();
    if (bool && detail && detail._id) {
      // 收藏博客前判断是否已经收藏过了
      if (!isAlreadyCollect) {
        dbAdd({
          collection: "collect_records",
          data: { articleId: detail._id }
        });
      } else {
        Taro.showToast({
          title: "您已收藏过了",
          icon: "none",
          duration: 2000
        });
      }
    } else {
      Taro.navigateTo({ url: `/pages/login/index` });
    }
  };
  if (!detail) return null;
  return (
    <View className="at-article">
      <View className="at-article__h1">{detail.title}</View>
      <View className="at-article__info">
        {`${filters.formateDate(detail.updateTime, "-")}`}
        <Text className="at-article__name">{`        🐔哥`}</Text>
      </View>
      <AtButton
        full={false}
        className={["sava-btn", { "sava-btn__active": isAlreadyCollect }]}
        onClick={collect}
      >
        {isAlreadyCollect ? "已收藏" : "+ 收藏"}
      </AtButton>
      <View className="at-article__content">
        <Image
          className="at-article__img"
          src={
            "cloud://taro-cloud-blog-xxj95719.7461-taro-cloud-blog-xxj95719-1255350831/images-roomType/AAAAAElFTkSuQmCC"
          }
          mode="widthFix"
        />

        <View className="at-article__section">
          <View className="at-article__p">
            <TaroParser
              type="markdown"
              theme="light"
              content={detail.content}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

BlogDetail.config = {
  navigationBarTitleText: "文章详情"
};

export default BlogDetail;
