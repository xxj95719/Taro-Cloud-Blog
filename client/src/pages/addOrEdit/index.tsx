import Taro, { FC, useState, useEffect, useScope } from '@tarojs/taro';
import { View, Picker } from '@tarojs/components';
import { AtForm, AtButton, AtTextarea, AtInput, AtList, AtListItem } from 'taro-ui';

import './index.scss';

import { dbAdd, dbGet, dbUpdate } from '@/utils/CRUD';

const AddOrEdit: FC = () => {
  const scope = useScope();

  const [title, setTitle] = useState<string>('');

  const [desc, setDesc] = useState<string>('');

  const [markdownValue, setMarkdownValue] = useState<string>('');

  const [sortTypeList, setSortTypeList] = useState(Taro.getStorageSync('sortTypeList'));

  const [sortType, setSortType] = useState<number>(1);

  const [sortTypeName, setSortTypeName] = useState<string>('JavaScript');

  const [isAdd, setIsAdd] = useState<boolean>(true);

  useEffect(
    () => {
      Taro.setNavigationBarTitle({
        title: scope.options.title || 'BLOG'
      });
      (async function () {
        if (!sortTypeList) {
          let res = await getArticleSortTypeList();
          setSortTypeList(res);
          Taro.setStorageSync('sortTypeList', res);
        }
      })()
      if (scope.options._id) {
        setIsAdd(false);
        (async function () {
          Taro.showLoading({
            title: '加载中'
          });
          const data = await dbGet({
            collection: 'article',
            skip: 0,
            where: {
              _id: scope.options._id
            }
          });
          Taro.hideLoading();
          setTitle(data[0].title);
          setDesc(data[0].desc);
          setMarkdownValue(data[0].content);
          setSortType(data[0].sortType);
          setSortTypeName(sortTypeList[data[0].sortType - 1].sortTypeName);
        })();
      }
    },
    [scope]
  );

  const getArticleSortTypeList = async () => {
    const data = await dbGet({
      collection: 'article_sort_type',
      skip: 0,
      limit: 10
    });
    return data;
  };
  const onChangeSelector = (e) => {
    let obj = sortTypeList[e.detail.value];
    if (obj) {
      setSortType(obj.sortType);
      setSortTypeName(obj.sortTypeName);
    }
  };
  const handleChange = (value) => {
    setMarkdownValue(value);
  };

  const onSubmit = async () => {
    if (!title || !markdownValue) {
      Taro.showToast({
        title: !title ? '标题不能为空' : !markdownValue ? '内容不能为空' : '必填项不能为空',
        icon: 'none'
      });
    } else {
      let dbRes;

      if (isAdd) {
        dbRes = await dbAdd({
          collection: 'article',
          data: {
            title,
            content: markdownValue,
            desc,
            sortType,
            creatTime: new Date(),
            updateTime: new Date()
          }
        });
      } else {
        dbRes = await dbUpdate({
          collection: 'article',
          where: {
            _id: scope.options._id
          },
          data: {
            title,
            content: markdownValue,
            desc,
            sortType,
            updateTime: new Date()
          }
        });
      }

      if (dbRes) {
        Taro.showToast({
          title: '保存成功',
          icon: 'success',
          success: () => {
            Taro.navigateBack();
          }
        });
      }
    }
  };

  return (
    <View className='form'>
      <View className='panel'>
        <View className='panel__title'>标题</View>
        <AtInput clear required name='value' type='text' placeholder='请输入' value={title} onChange={setTitle} />
      </View>
      <View className='panel'>
        <View className='panel__title'>描述</View>
        <AtInput clear required name='value' type='text' placeholder='请输入' value={desc} onChange={setDesc} />
      </View>
      <View className='panel'>
        <View className='panel__title'>类别</View>
        <Picker
          mode='selector'
          range={sortTypeList}
          rangeKey='sortTypeName'
          value={0}
          onChange={onChangeSelector}>
          <AtList>
            <AtListItem title='请选择' extraText={sortTypeName} />
          </AtList>
        </Picker>
      </View>
      <AtForm onSubmit={onSubmit} className='form__content'>
        <View className='panel'>
          <View className='panel__title'>正文</View>
          <AtTextarea
            count={false}
            value={markdownValue}
            onChange={handleChange}
            placeholder='请输入...'
            height={400}
            maxLength={Infinity}
          />
        </View>
        <AtButton type='primary' formType='submit'>
          提交
				</AtButton>
      </AtForm>
    </View>
  );
};

export default AddOrEdit;
