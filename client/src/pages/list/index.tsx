import Taro, { FC, useState, useEffect, useScope } from "@tarojs/taro";
import { ScrollView } from "@tarojs/components";
import { AtLoadMore } from "taro-ui";
import "./index.scss";

import XCard from "@/components/XCard/index";

import XEmpty from "@/components/XEmpty/index";

import { dbGet } from "@/utils/CRUD";

type ArticleList = Array<{
  _id: string;
  articleId: string;
  artInfo: {
    _id: string;
    title: string;
    desc: string;
    fileID: string;
    content: string;
    sortType: number;
    sortTypeName?: string;
    creatTime: Date;
    updateTime: Date;
  };
}>;

interface SortTypeList {
  _id: string;
  sortType: number;
  sortTypeName: string;
}

const List: FC = () => {
  const [skip, setSkip] = useState<number>(0); // 数据位置标识

  const [articleList, setArticleList] = useState<ArticleList>([]); // 博客列表

  const [status, setStatus] = useState<string>("more"); // 状态

  const [title, setTitle] = useState<string>("more"); // 状态

  const scope = useScope();

  useEffect(() => {
    if (scope) {
      Taro.setNavigationBarTitle({
        title: scope.options.title || "BLOG"
      });
      setTitle(scope.options.title);
    }
  }, [scope]);

  useEffect(() => {
    getArticleList();
  }, [skip]);
  // 联表查询(收藏集/浏览记录)
  const getArticleList = async () => {
    console.log(scope.options.title);
    let res: Array<SortTypeList> =
      (await Taro.getStorageSync("sortTypeList")) || [];
    if (!res.length) {
      res = await getArticleSortTypeList();
      Taro.setStorageSync("sortTypeList", res);
    }
    const { result } = (await Taro.cloud.callFunction({
      name:
        scope.options.title === "收藏集"
          ? "getCollectArtList"
          : "getBrowseArtList"
    })) as any;
    if (result && result.list.length) {
      let mapData = result.list.map(item => {
        item.artInfo = item.artInfo.map(jtem => {
          let fObj: {
            _id?: string;
            sortType?: number;
            sortTypeName: string;
          } = res.find(ktem => ktem.sortType === jtem.sortType) || {
            sortTypeName: ""
          };
          jtem.sortTypeName = fObj.sortTypeName;

          return jtem;
        });
        return item;
      });

      if (mapData.length) {
        setStatus("more");

        mapData = articleList.concat(mapData);
      } else {
        setStatus("noMore");

        mapData = articleList;
      }

      setArticleList(mapData);
    }
  };

  const getArticleSortTypeList = async () => {
    const data = await dbGet({
      collection: "article_sort_type",
      skip,
      limit: 10
    });
    return data as Array<SortTypeList>;
  };

  const onClickLoadMore = async () => {
    setStatus("loading");
    setSkip(articleList.length || 0);
  };

  const onGoToDetail = item => {
    Taro.navigateTo({
      url: `/pages/detail/index?_id=${item.articleId}`
    });
  };
  console.log(articleList);
  if (!articleList.length) return <XEmpty />;
  return (
    <ScrollView className="scrollview" scrollY enableBackToTop scrollAnchoring>
      {articleList.map(item => (
        <XCard
          item={item.artInfo[0]}
          key={item._id}
          onGoToDetail={onGoToDetail.bind(this, item)}
          isHome={false}
        />
      ))}
      {articleList.length > 10 && (
        <AtLoadMore onClick={onClickLoadMore} status={status} />
      )}
    </ScrollView>
  );
};

export default List;
