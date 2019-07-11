import React,{Component} from 'react';
import {Text,FlatList,View,Button,TouchableOpacity,Image} from 'react-native';


export default class ListComponent extends Component{
  constructor(){
    super();
    this.state={wines:[],pno:1,num:0};
  }
  componentDidMount(){
    var url="http://172.242.19.29:8080/productmore"
    fetch(url).then(response=>{
      return response.json();
    }).then(result=>{
      //console.log(result);
      var arr=result.data.pics;
      var more=[];
      for(var i=0;i<arr.length-1;i++){
        if(arr[i].wid!=arr[i+1].wid){
          //console.log(arr[i].wid);
          more.push(arr[i].md);
        }
      }
      more.push(arr[arr.length-1].md);
      //console.log(more);
      var wines=result.data.wines;
      for(var j=0;j<wines.length;j++){
        wines[j].md=more[j];
      }
      var num=this.state.num;
      for(var tmp of wines){
        num++;
        tmp.key=num;
      };
      this.setState({num:num});
      //console.log(wines)
      this.setState({wines:wines});
    })
  }
  loadMore=()=>{
    var pno=this.state.pno;
    pno++;
    if(pno>26){return};
    var url="http://172.242.19.29:8080/productmore?pno="+pno;
    fetch(url).then(response=>{
      return response.json();
    }).then(result=>{
      //console.log(result);
      this.setState({pno:pno});
      var arr=result.data.pics;
      var more=[];
      for(var i=0;i<arr.length-1;i++){
        if(arr[i].wid!=arr[i+1].wid){
          //console.log(arr[i].wid);
          more.push(arr[i].md);
        }
      }
      more.push(arr[arr.length-1].md);
      //console.log(more);
      var wines=result.data.wines;
      for(var j=0;j<wines.length;j++){
        wines[j].md=more[j];
      }
      var num=this.state.num;
      for(var tmp of wines){
        num++;
        tmp.key=num;
      };
      this.setState({num:num})
      var nowwines=this.state.wines;
      nowwines= nowwines.concat(wines);
      //console.log(nowwines,pno);
      this.setState({wines:nowwines});
    })
  }
  handlePress=(wid)=>{
    // alert('这个商品买了'+count+'个');
    this.props.navigation.push('detail',{wid:wid});
  }
  showItem=(info)=>{
    return <TouchableOpacity style={{flexDirection:"row",margin:15,alignItems:'center'}} onPress={()=>this.handlePress(info.item.wid)} key={info.index}>
        <Image source={{uri:"http://172.242.19.29:8080/"+info.item.md}} style={{width:100,height:90,borderRadius:50}}></Image>
      <Text style={{marginLeft:10}}>{info.item.pname}</Text>
    </TouchableOpacity>
  }
  handleEndReached=()=>{
    this.loadMore();
  }
  render(){
    return (
      <View>
       <FlatList 
       onEndReached={this.handleEndReached}
       data={this.state.wines} renderItem={this.showItem} extraData={this.state}></FlatList>
       <Button title="加载更多" onPress={this.loadMore}></Button>
      </View>
    )
  }
}
