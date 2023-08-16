import Footer from '@/components/Footer';
import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormText,} from '@ant-design/pro-components';
import {useEmotionCss} from '@ant-design/use-emotion-css';
import {Helmet, history, useModel} from '@umijs/max';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';

import Settings from '../../../../config/defaultSettings';
import {Link} from "@@/exports";
import {userRegisterUsingPOST} from "@/services/xcbi/userController";


const Register: React.FC = () => {
  const [type, setType] = useState<string>('account');
  const {initialState, setInitialState} = useModel('@@initialState');
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });
  /**
   * 用户注册
   * @param values
   */
  const handleSubmit = async (values: API.UserRegisterRequest) => {
    const {userPassword, checkPassword} = values;
    // 校验
    if (userPassword !== checkPassword) {
      message.error('两次输入的密码不一致');
      return;
    }

    try {
      const res = await userRegisterUsingPOST(values);
      if (res.code === 0) {
        message.success('注册成功！');
        /** 此方法会跳转到 redirect 参数所在的位置 */
        if (!history) return;
        history.push({
          pathname: '/user/login',
        });
        return;

      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.log(error);
      message.error('注册失败，请重试！');
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>
      <div
        style={{
          flex: '1',
          padding: '32px 0',
        }}
      >
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          submitter={{
            searchConfig: {
              submitText: '注册'
            }
          }}

          logo={<img alt="logo" src="/logo.svg"/>}
          title="星辰智能分析平台"
          subTitle={'星辰智能分析平台是基于AI的傻瓜式的数据分析平台'}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '用户注册',
              },
            ]}
          />

          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入用户名'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请再次输入密码'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Link
              to="/user/login"
            >
              返回登录
            </Link>
          </div>
        </LoginForm>
      </div>
      <Footer/>
    </div>
  );
};
export default Register;
