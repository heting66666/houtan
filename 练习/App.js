import React, { Component } from 'react'
import {Table,Button,Modal,Input} from 'antd'
import './App.less'
import axios from 'axios'

export default class App extends Component {
    constructor(props){
        super(props)
        this.state={
            tableData:[],
            visible:false,
            textVal:'',
            passwordVal:''
        }
      this.chgText=this.chgText.bind(this)
      this.chgPwd = this.chgPwd.bind(this)
      this.handleAdd = this.handleAdd.bind(this)
      this.del=this.del.bind(this)
    }
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount(){
        fetch('http://localhost:9090/user')
        .then(response=>{
          return  response.json()
        })
        .then(res=>{
            console.log(res)
            this.setState({
                tableData:res
            })
        })
    }
    
    chgText(e){
     console.log(e.target.value)
     this.setState({
         textVal:e.target.value
     })
    }
    chgPwd(e){
        console.log(e.target.value)
        this.setState({
            passwordVal:e.target.value
        })
       }
    handleAdd(){
        axios.post(' http://localhost:9090/user',{name:this.state.textVal,address:this.state.passwordVal,date:new Date().getTime()})
        .then(()=>{
            fetch('http://localhost:9090/user')
            .then(response=>{
              return  response.json()
            })
            .then(res=>{
                console.log(res)
                this.setState({
                    tableData:res,
                    visible: false,
                    textVal:'',
                    passwordVal:''
                })
            })
        })
    
    }
    del(id){
        axios.delete(`http://localhost:9090/user/${id}`)
        .then(()=>{
            fetch('http://localhost:9090/user')
            .then(response=>{
              return  response.json()
            })
            .then(res=>{
                console.log(res)
                this.setState({
                    tableData:res,
                    visible: false,
                    textVal:'',
                    passwordVal:''
                })
            })
        })
    }
    render() {
        const dataSource = this.state.tableData
          const columns = [
            {
              title: '日期',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: '姓名',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: '住址',
              dataIndex: 'address',
              key: 'address',
            },
            {
                title: '操作',
                key: 'action',
                render:(text,record)=>{
                    return <Button type="primary" onClick={this.del.bind(null,record.id)}>删除</Button>
                }
              },
          ];
          
          
        return (
           
            <div className="tableList">
              <div className="table">  
                  <Table rowkey={dataSource.title} dataSource={dataSource} columns={columns} bordered={true} pagination={false} footer={()=>{
                      return  <Button type="primary" onClick={this.showModal}>添加</Button>
                  }}/>              
              </div>
              <div>
                     <Modal
                        title="Basic Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确定"
                        cancelText="取消"
                        title="录入信息"
                        onOk={this.handleAdd}
                    >
                         <h3>姓名</h3>
                        <Input value={this.state.textVal} onChange={this.chgText} />
                        <h3>地址</h3>
                        <Input value={this.state.passwordVal} onChange={this.chgPwd} />

                    </Modal>
              </div>
            </div>
        )
    }
}

