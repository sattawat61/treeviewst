import React from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import * as moment from "moment";
import ApexCharts from 'apexcharts';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Dropdown, Button, message, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
class Candle extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = 
        {
            time:"",
            series: [{
                data:[]
              }],
              options: {
                chart: {
                  type: 'candlestick',
                  height: 500,
                },
                title: {
                  text: 'CandleStick Chart',
                  align: 'left'
                },
                noData:{
                  text: 'Loading...'
                },
                xaxis: {
                  type: 'category',
                  labels: {
                    formatter: function(val) {
                      return moment(val).format("ddd-DD-MM-YYYY HH:mm");
                    },
                    style: {
                      colors: [],
                      fontSize: '12px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      cssClass: 'apexcharts-xaxis-label',
                    }
                  },
                },
                yaxis: {
                  tickAmount: 6,
                  min: 16,
                  max: 30,
                  tooltip: {
                    enabled: true
                  }
                },
                plotOptions: {
                  candlestick: {
                    wick: {
                      useFillColor: true,
                    }
                  }
                }
              },
            };
            //this.get_data();
    }
    handleMenuClick =(e) => {
      console.log(e);
      if(e.key=="1")
      {
        this.get_data_1HR();
        this.setState({time:"1 HOUR"});
      }
      else if(e.key == "2")
      {
        this.get_data_6HR();
        this.setState({time:"6 HOUR"});
      }
      else if(e.key == "3")
      {
        this.get_data_24HR();
        this.setState({time:"24 HOUR"});
      }
      else if(e.key == "4")
      {
        this.get_data_3DAY();
        this.setState({time:"3 DAYS"});
      }
      else if(e.key == "5")
      {
        this.get_data_1W();
        this.setState({time:"1 WEEK"})
      }
    }
    get_data_1HR = async()=>
    {
        await axios(
            {
                method:"get",
                url :"http://localhost:9000/Send_data/candle_data"
            }
        ).then((res)=>
        {
          var data = [];
          for(let i_data of res.data)
          {
            var date_temp = new Date();
            date_temp.setFullYear(parseInt(i_data.x.date[0]));
            date_temp.setMonth(parseInt(i_data.x.date[1])-1);
            date_temp.setHours(parseInt(i_data.x.hr[0]));
            date_temp.setMinutes(parseInt(i_data.x.hr[1]))
            date_temp.setDate(parseInt(i_data.x.date[2]));
            //console.log(date_temp);
            let temp = {
              x: date_temp,
              y: [i_data.y[0],i_data.y[1],i_data.y[2],i_data.y[3]]
            }
            data.push(temp);
          }
          //console.log(data)
          let c_temp = [{
            data: data
          }]
          //console.log(c_temp);
          this.setState({series:c_temp})
        })
    }
    get_data_6HR = async()=>
    {
        await axios(
            {
                method:"get",
                url :"http://localhost:9000/Send_data/candle_data"
            }
        ).then((res)=>
        {
          let data = [];
          let count = 1;
          var open;
          var high;
          var low;
          for(let i_data of res.data)
          {
            if(count == 6)
            {
              count = 0;
              //console.log(i_data.x.hr);
              let date_temp = new Date();
              date_temp.setFullYear(parseInt(i_data.x.date[0]));
              date_temp.setMonth(parseInt(i_data.x.date[1])-1);
              date_temp.setDate(parseInt(i_data.x.date[2]));
              date_temp.setHours(parseInt(i_data.x.hr[0]));
              date_temp.setMinutes(parseInt(i_data.x.hr[1]))
              let temp = {
                x: date_temp,
                y: [open,high,low,i_data.y[3]]
              }
              data.push(temp);
            }
            else if(count == 1)
            {
              open = i_data.y[0];
              low = i_data.y[2];
              high = i_data.y[1];
            }
            else
            {
              if(i_data.y[1]>high)
              {
                high = i_data.y[1];
              }
              if(i_data.y[2]<low)
              {
                low = i_data.y[2];
              }
            }
            count++;
          }
          let c_temp = [{
            data: data
          }]
          this.setState({series:c_temp})
        })
    }
    get_data_24HR = async()=>
    {
        await axios(
            {
                method:"get",
                url :"http://localhost:9000/Send_data/candle_data"
            }
        ).then((res)=>
        {
          let data = [];
          let count = 1;
          var open;
          var high;
          var low;
          for(let i_data of res.data)
          {
            /*if(count == 23)
            {
              count = 0;
              //console.log(i_data.x.hr);
              let date_temp = new Date();
              date_temp.setFullYear(parseInt(i_data.x.date[0]));
              date_temp.setMonth(parseInt(i_data.x.date[1])-1);
              date_temp.setDate(parseInt(i_data.x.date[2]));
              date_temp.setHours(parseInt(i_data.x.hr[0]));
              date_temp.setMinutes(parseInt(i_data.x.hr[1]))
              let temp = {
                x: date_temp,
                y: [open,high,low,i_data.y[3]]
              }
              data.push(temp);
            }
            else if(count == 1)
            {
              open = i_data.y[0];
              low = i_data.y[2];
              high = i_data.y[1];
            }
            else
            {
              if(i_data.y[1]>high)
              {
                high = i_data.y[1];
              }
              if(i_data.y[2]<low)
              {
                low = i_data.y[2];
              }
            }
            count++;*/
            if(i_data.x.hr[0] == "23")
            {
              //console.log(i_data.x.hr ,"day");
              let date_temp = new Date();
              date_temp.setFullYear(parseInt(i_data.x.date[0]));
              date_temp.setMonth(parseInt(i_data.x.date[1])-1);
              date_temp.setDate(parseInt(i_data.x.date[2]));
              date_temp.setHours(parseInt(i_data.x.hr[0]));
              date_temp.setMinutes(parseInt(i_data.x.hr[1]))
              let temp = {
                x: date_temp,
                y: [open,high,low,i_data.y[3]]
              }
              data.push(temp);
            }
            else if(i_data.x.hr[0] == "1")
            {
              open = i_data.y[0];
              low = i_data.y[2];
              high = i_data.y[1];
            }
            else
            {
              if(i_data.y[1]>high)
              {
                high = i_data.y[1];
              }
              if(i_data.y[2]<low)
              {
                low = i_data.y[2];
              }
            }
          }
          let c_temp = [{
            data: data
          }]
          this.setState({series:c_temp})
        })
    }
    get_data_3DAY = async()=>
    {
        await axios(
            {
                method:"get",
                url :"http://localhost:9000/Send_data/candle_data"
            }
        ).then((res)=>
        {
          let data = [];
          var open;
          var high;
          var low;
          let c_day = 0;
          for(let i_data of res.data)
          {
            if(i_data.x.hr[0] == "23")
            {
              //console.log(i_data.x.hr);
              let date_temp = new Date();
              date_temp.setFullYear(parseInt(i_data.x.date[0]));
              date_temp.setMonth(parseInt(i_data.x.date[1])-1);
              date_temp.setDate(parseInt(i_data.x.date[2]));
              date_temp.setHours(parseInt(i_data.x.hr[0]));
              date_temp.setMinutes(parseInt(i_data.x.hr[1]))
              let temp = {
                x: date_temp,
                y: [open,high,low,i_data.y[3]]
              }
              c_day++;
              if(c_day == 3)
              {
                data.push(temp);
                c_day = 0;
              }
            }
            else if(i_data.x.hr[0] == "1"&&c_day==0)
            {
              open = i_data.y[0];
              low = i_data.y[2];
              high = i_data.y[1];
            }
            else
            {
              if(i_data.y[1]>high)
              {
                high = i_data.y[1];
              }
              if(i_data.y[2]<low)
              {
                low = i_data.y[2];
              }
            }
          }
          let c_temp = [{
            data: data
          }]
          this.setState({series:c_temp})
        })
    }
    get_data_1W = async()=>
    {
        await axios(
            {
                method:"get",
                url :"http://localhost:9000/Send_data/candle_data"
            }
        ).then((res)=>
        {
          let data = [];
          var open;
          var high;
          var low;
          let c_day = 0;
          for(let i_data of res.data)
          {
            if(i_data.x.hr[0] == "23")
            {
              //console.log(i_data.x.hr);
              let date_temp = new Date();
              date_temp.setFullYear(parseInt(i_data.x.date[0]));
              date_temp.setMonth(parseInt(i_data.x.date[1])-1);
              date_temp.setDate(parseInt(i_data.x.date[2]));
              date_temp.setHours(parseInt(i_data.x.hr[0]));
              date_temp.setMinutes(parseInt(i_data.x.hr[1]))
              let temp = {
                x: date_temp,
                y: [open,high,low,i_data.y[3]]
              }
              c_day++;
              if(c_day == 5)
              {
                data.push(temp);
                c_day = 0;
              }
            }
            else if(i_data.x.hr[0] == "1"&&c_day==0)
            {
              open = i_data.y[0];
              low = i_data.y[2];
              high = i_data.y[1];
            }
            else
            {
              if(i_data.y[1]>high)
              {
                high = i_data.y[1];
              }
              if(i_data.y[2]<low)
              {
                low = i_data.y[2];
              }
            }
          }
          let c_temp = [{
            data: data
          }]
          this.setState({series:c_temp})
        })
    }
    render()
    {
        const menu = (
        <Menu onClick={this.handleMenuClick}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            1 HOUR
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            6 HOUR
          </Menu.Item>
          <Menu.Item key="3" icon={<UserOutlined />}>
            24 HOUR
          </Menu.Item>
          <Menu.Item key="4"  icon={<UserOutlined/>}>
            3 DAYS
          </Menu.Item>
          <Menu.Item key="5" icon={<UserOutlined/>}>
            1 WEEK
          </Menu.Item>
        </Menu>
         );
        return(
            <div>
                <div style={{display: 'flex',justifyContent:'center', alignItems:'center',flexDirection: "vertical",fontSize: 30 ,backgroundColor:"white", marginTop :'20px'}}>
                  Data: {this.state.time}
                </div>
                <Dropdown overlay={menu}>
                  <Button>
                    Time <DownOutlined />
                  </Button>
                </Dropdown>
                <div id = "Chart" style = {{height:"75vh"}}>
                <Chart options={this.state.options} series={this.state.series} type="candlestick" height={"100%"} />
               </div>
            </div>
        )
    }
}
export default(Candle);