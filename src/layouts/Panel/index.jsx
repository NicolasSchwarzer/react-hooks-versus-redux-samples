import React, { memo, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Icon, Avatar } from 'antd';
import classNames from 'classnames';
import avatar from '@/assets/github-black.png';
import styles from './index.scss';

const { Header, Sider, Content } = Layout;
const pathReg = /^\/([\w-]+)(?:\/.*)?$/;

function Panel({ history: { push }, location: { pathname }, children }) {
  const [collapsed, setCollapsed] = useState(false);
  // Memoize menu selected keys via hook useMemo,
  // what is memoization: https://en.wikipedia.org/wiki/Memoization
  const selectedKeys = useMemo(() => [pathname.replace(pathReg, '$1')], [pathname]);
  // Memoize menu onSelect callback via hook useCallback.
  const onMenuSelect = useCallback(({ key }) => push(`/${key}`), [push]);
  // Memoize collapsed toggle function via hook useCallback.
  const toggleCollapsed = useCallback(
    () => setCollapsed((prevCollapsed) => !prevCollapsed),
    // The dependency setCollapsed will never mutate, and so is toggleCollapsed,
    // thus there's no eslint error reported here.
    [],
  );

  return (
    <Layout className={styles.container}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Link
          className={classNames(styles.logo, { [styles.collapsed]: collapsed })}
          to="/"
        >
          {collapsed ? 'Hooks' : 'React Hooks versus Redux'}
        </Link>
        <Menu
          className={styles.menu}
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          onSelect={onMenuSelect}
        >
          <Menu.Item key="dashboard">
            <Icon type="dashboard" />
            <span>Dashboard</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Icon
            className={styles.trigger}
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggleCollapsed}
          />
          <div className={styles.headerRightContainer}>
            <a
              className={styles.headerMenuItem}
              href="https://github.com/NicolasSchwarzer/react-hooks-versus-redux-samples#readme"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a>
            <a
              className={styles.avatarContainer}
              href="https://github.com/NicolasSchwarzer/react-hooks-versus-redux-samples"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Avatar size={48} src={avatar} />
            </a>
          </div>
        </Header>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

Panel.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.node,
};

Panel.defaultProps = {
  children: undefined,
};

export default withRouter(memo(Panel));
