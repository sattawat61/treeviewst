import React from 'react';
import logo from './logo.svg';
import './App.css';
import Data_Set from './Data_setting';
import Candle from './Candle_Chart';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import darkTheme from '@ant-design/dark-theme';
const { Header, Content, Footer, Sider } = Layout;
class App extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = 
    {
      project : "GRAPH"
    }
  }
  handleclick=(temp)=>
  {
    this.setState({project:temp});
  }
  render()
  {
    if(this.state.project == "100GB")
    {
      return(
        <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1" onClick={() => this.handleclick("100GB")}>100GB</Menu.Item>
          <Menu.Item key="2" onClick={() => this.handleclick("GRAPH")}>GRAPH</Menu.Item>
        </Menu>
        </Header>
        <Data_Set/>
        </Layout>
      )
  }
  else
  {
    return(
      <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1"onClick={() => this.handleclick("100GB")}>100GB</Menu.Item>
          <Menu.Item key="2"onClick={() => this.handleclick("GRAPH")}>GRAPH</Menu.Item>
        </Menu>
      </Header>
        <Candle/>
      </Layout>
      )
    }
  }
}
export default App;
