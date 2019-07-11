import React,{Component} from 'react';
import {Text,View,Button,Image,ScrollView} from 'react-native';



export default class DetailComponent extends Component{
  constructor(){
    super();
    this.state={wid:'',pics:[],detail:[],picIndex:0,timer:null}
  }
  componentDidMount(){
    var wid=this.props.navigation.getParam('wid');
    console.log(wid)
    this.setState({wid:wid});
    var url="http://172.242.19.29:8080/detail?wid="+wid;
    fetch(url).then(response=>{
      return response.json();
    }).then(result=>{
      //console.log(result);
      var {detail,detailpic,pics}=result.data;
      this.setState({detail:detail[0],pics:pics});
      //console.log(this.state.detail,this.state.pics);
      //启动一个定时器，每隔1s来修改picIndex
      var myTimer =  setInterval(()=>{
        //console.log('正在切换图片...')
        var nowIndex = this.state.picIndex
        nowIndex++
        if(nowIndex>=this.state.pics.length){
          nowIndex = 0
        }
        this.setState({picIndex:nowIndex})


      },1000)
     this.setState({timer:myTimer})
    })
  }
  componentWillUnmount(){
    clearInterval(this.state.timer)
  }
  render(){
    return (
      <View style={{flex:1}}>
        <ScrollView>
        {
            this.state.pics.length>0
            &&
            <Image source={{uri:"http://172.242.19.29:8080/"+this.state.pics[this.state.picIndex].md}} style={{height:500}}></Image>
          }
          <Text style={{color:"#cc3341",fontSize:30,margin:10}}>{this.state.detail.pname}</Text>
          <Text style={{color:"#666",fontSize:15,margin:10}}>{this.state.detail.promise}</Text>
        </ScrollView>
        <Button title="编辑产品" color="red"></Button>
      </View>
    )
  }
}
