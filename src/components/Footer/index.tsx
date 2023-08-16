import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear}`}
      links={[
        {
          key: '星辰智能分析平台',
          title: '星辰智能分析平台-后端',
          href: 'https://github.com/ZllenHik/xcbi-backend',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/ZllenHik/',
          blankTarget: true,
        },
        {
          key: '星辰智能分析平台',
          title: '星辰智能分析平台-前端',
          href: 'https://github.com/ZllenHik/xcbi-frontend',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
