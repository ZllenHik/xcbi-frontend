
import { useModel } from '@@/exports';
import { EditOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns } from '@ant-design/pro-components';
import { Avatar, Button, Card, Col, Descriptions, Divider, message, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';
import {userLogoutUsingPOST} from "@/services/xcbi/userController";
import UpdateUserInfoModal from "@/pages/User/My/component/UpdateUserInfoModal";

const tabListNoTitle = [
  {
    key: 'userInfo',
    label: '个人资料',
  },
];

const UserInfoPage: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('userInfo');
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<API.User>({});
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};

  const onTab2Change = (key: string) => {
    setActiveTabKey(key);
  };

  /**
   * 注销账号
   * @param userId
   */
  const doLogoutAccount = async (userId: number) => {
    const hide = message.loading('正在注销');
    if (!userId) return true;
    try {
      await userLogoutUsingPOST({
        userId: userId ?? 0,
      });
      message.success('操作成功');
      // 跳转至登录页
      window.location.href = '/user/login';
    } catch (e: any) {
      message.error('操作失败，' + e.message);
    } finally {
      hide();
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.User>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '用户昵称',
      dataIndex: 'userName',
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
    },
    {
      title: '用户简介',
      dataIndex: 'userProfile',
      valueType: 'text',
    },
    {
      title: '用户头像',
      dataIndex: 'userAvatar',
      valueType: 'avatar',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
    },
  ];

  const contentListNoTitle: Record<string, React.ReactNode> = {
    userInfo: (
      <>
        <div className={'user-detail-card'}>
          <Descriptions
            title={'基本信息'}
            column={1}
            labelStyle={{ color: 'black', marginRight: 20 }}
          >
            <Descriptions.Item label="用户昵称">{currentUser?.userName}</Descriptions.Item>
            <Descriptions.Item label="用户权限">{currentUser?.userRole}</Descriptions.Item>
            <Descriptions.Item label="手机号码">{"无"}</Descriptions.Item>
            <Descriptions.Item label="邮箱">{'无'}</Descriptions.Item>
          </Descriptions>
          <Divider />

          <Descriptions
            title={'其他信息'}
            column={1}
            labelStyle={{ color: 'black', marginRight: 20 }}
          >
            <Descriptions.Item label="用户id">{currentUser?.id}</Descriptions.Item>
            <Descriptions.Item label="注册时间">{currentUser?.createTime}</Descriptions.Item>
          </Descriptions>
        </div>
      </>
    ),
  };

  return (
    <PageContainer title>
      <Card>
        <Row justify={'space-between'}>
          <Meta
            title={<h3>{currentUser?.userName}</h3>}
            description={
              <>
                <div>简介：{currentUser?.userProfile}</div>
              </>
            }
            avatar={
              <Avatar
                style={{ width: 96, height: 96, lineHeight: 96, fontSize: 18 }}
                src={currentUser?.userAvatar}
                onError={() => true}
              />
            }
          />
          <Col span={3}>
            <Button
              type={'primary'}
              ghost
              onClick={() => {
                setUpdateData(currentUser as API.User);
                setUpdateModalVisible(true);
              }}
            >
              编辑个人资料
            </Button>


            {/*<Button*/}
            {/*  danger*/}
            {/*  onClick={() => {*/}
            {/*    doLogoutAccount(currentUser?.id ?? 0);*/}
            {/*  }}*/}
            {/*>*/}
            {/*  注销账号*/}
            {/*</Button>*/}
          </Col>
        </Row>
      </Card>

      <Card tabList={tabListNoTitle} activeTabKey={activeTabKey} onTabChange={onTab2Change}>
        {contentListNoTitle[activeTabKey]}
      </Card>
      <UpdateUserInfoModal
        oldData={updateData}
        modalVisible={updateModalVisible}
        columns={columns}
        onSubmit={() => {}}
        onCancel={() => setUpdateModalVisible(false)}
      />
    </PageContainer>
  );
};
export default UserInfoPage;
