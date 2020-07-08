import Taro, { FC, useState, useEffect } from "@tarojs/taro";
import { ScrollView } from "@tarojs/components";
import "./index.scss";

import XCard from "@/components/XCard/index";
import { dbGet } from "@/utils/CRUD";

type ArticleList = Array<{
  title: string;
  desc: string;
  content: string;
  sortType: number;
  creatTime: Date;
  updateTime: Date;
  _id: string;
}>;

const Home: FC = () => {
  const [articleList, setArticleList] = useState<ArticleList>([]);
  useEffect(() => {
    getArticleList();
    getArticleSortTypeList();
  }, []);

  const getArticleList = async () => {
    const data = await dbGet({ collection: "article", skip: 0, limit: 10 });

    console.log(data);
    setArticleList(data as ArticleList);
  };

  const getArticleSortTypeList = async () => {
    const data = await dbGet({
      collection: "article_sort_type",
      skip: 0,
      limit: 10
    });
  };
  const onRefresherRefresh = async () => {};
  return (
    <ScrollView
      className="scrollview"
      scrollY
      enableBackToTop
      scrollAnchoring
      refresherEnabled
      onRefresherRefresh={onRefresherRefresh}
    >
      {articleList.map(item => (
        <XCard item={item} key={item._id} />
      ))}
    </ScrollView>
  );
};

Home.config = {
  navigationBarTitleText: "首页"
};
export default Home;
