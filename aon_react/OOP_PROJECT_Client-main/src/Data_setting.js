import React from 'react';
import axios from 'axios';
import DropdownTreeSelect from 'react-dropdown-tree-select'
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import 'antd/dist/antd.css';
import './index.css';
import { Row, Col } from 'antd';
import './index.css';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { AwesomeButton} from 'react-awesome-button';
import "react-awesome-button/dist/styles.css";
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
class Data_Set extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state =
        {
            Tree_name : "",
            result: null,
            nodeClicked : false,
            image: "",
            image_check :false,
            current_path:"landmark-recognition-2020",
            button :null,
            button_check :false
        }
        this.get_data_all();
    }
    click_handle =(node)=>
    {
        this.setState({nodeClicked: node})
    }
    get_data_all = async()=>
    {
        const path = "http://localhost:9000/Send_data/";
        await axios(
            {
                method: "get",
                url: path,  
            }
        ).then((res)=>this.setState({result:res.data}));
    }
    get_button= async(path) =>
    {
        const b_path = "http://localhost:9000/Send_data/D:/Downloads/landmark-recognition-2020"+path;//re
        await axios(
            {
                method: "get",
                url: b_path,  
            }
        ).then((res)=>{this.setState({button:res.data})
        }).then(()=>this.setState({button_check:true}));
    }
    set_button = () =>
    {
        if(this.state.button_check)
        {
            let arr = [];
            for(const b_name of this.state.button)
            {
                if(b_name.indexOf('.')==-1)
                {
                    let temp = <AwesomeButton type="secondary" size="medium" onPress={() =>{
                    this.get_button(this.state.current_path+"/"+b_name).then(()=>{
                        this.setState({current_path:this.state.current_path+"/"+b_name})})
                    }}>{b_name}</AwesomeButton>; 
                    arr.push(temp);
                }
                else if(b_name.indexOf('.')!=-1)
                {
                    let temp = <AwesomeButton type="secondary" size="medium" onPress={() =>{
                            this.setState({current_path:this.state.current_path+"/"+b_name})
                            axios(
                                {
                                    method :'get',
                                    url: "http://localhost:9000/Send_data/image",
                                    params:
                                    {
                                        path :"D:/Downloads/landmark-recognition-2020"+this.state.current_path+"/"+b_name//re
                                    }
                                }).then((res) =>this.setState({image:res.data})).then(()=>this.setState({image_check:true}))
                            console.log("D:/Downloads/landmark-recognition-2020"+this.state.current_path);
                    }}>{b_name}</AwesomeButton>; 
                    arr.push(temp);
                }
            }
            return(arr);
        }
        else
        {
            return(<div>
                
            </div>)
        }
    }
    set_image = ()=>
    {
        if(this.state.image_check)
        {
            return(
                <div>
                     <div style={{display: 'flex',justifyContent:'center', alignItems:'center',height:"90%",flexDirection: "vertical",fontSize: 18 ,backgroundColor:"white", marginTop :'20px'}}>
                       <img src={"data:image/png[jpg];base64,"+this.state.image.toString()} style = {{height:500}}/>
                    </div>
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',height:"70%",flexDirection: "vertical",backgroundColor :"white",marginTop:"50px",border :"30px solid white",marginBottom:"50px",marginTop:"50px"}}>
                       {this.state.current_path}
                    </div>
                </div>
            )
        }
        else
        {
            return(
            <div>
                <div style={{display: 'flex',justifyContent:'center',height:"90%",flexDirection: "vertical",fontSize: 18 ,backgroundColor:"white", marginTop :'20px'}}>
                   
                </div>
                <div style={{display: 'flex',justifyContent:'center',height:"90%",flexDirection: "vertical",fontSize: 18 ,backgroundColor:"white", marginTop :'20px'}}>
                    {this.set_button()}
                </div>
            </div>
            )
        }
    }
    render()
    {
        if(this.state.result!=null)
        {
            return(
            <div>
                <Row>
                    <Col span={8} push={16}> 
                    <div style={{height: "90vh"}}>
                        <SortableTree
                            treeData={this.state.result}
                            onChange={treeData => this.setState({result:treeData })}
                            canDrag={({ node }) => false}
                            canDrop={() => false}
                            generateNodeProps={(rowInfo) => {
                            const { node } = rowInfo;
                            return { 
                                onDoubleClick: () => {
                                    console.log(node.subtitle)
                                    this.click_handle(node)
                                    console.log("D:/Downloads/"+node.subtitle.toString())
                                    axios(
                                    {
                                        method :'get',
                                        url: "http://localhost:9000/Send_data/image",
                                        params:
                                        {
                                            path :"D:/Downloads/"+node.subtitle.toString()
                                        }
                                    }).then((res) =>this.setState({image:res.data})).then(()=>{
                                                if(this.state.image == "Not File!!!")
                                                {
                                                    this.setState({image_check:false})
                                                    this.setState({current_path:node.subtitle.toString()})
                                                    this.get_button(node.subtitle.toString());
                                                }
                                                else
                                                {
                                                    this.setState({image_check:true})
                                                    this.setState({current_path:node.subtitle.toString()})
                                                }
                                            }
                                        );
                                    },
                                        style: node === this.state.nodeClicked && {
                                        color : "red",
                                        border: "5px solid red"}
                                    };
                            }}/>
                    </div>
                    </Col>
                    <Col span={16} pull={8}>
                    {this.set_image()} 
                    </Col>
                </Row>
            </div>
            )
        }
        else
        {
            return(
                <div>
                    <h2>
                        Now Loading
                    </h2>
                </div>
            )
        }
    }
}
export default Data_Set;