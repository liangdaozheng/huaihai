import React,{Component} from 'react';
import {Text,Image,View,StyleSheet,TouchableOpacity,ScrollView} from 'react-native';


export default class MainComponent extends Component{
  jump=()=>{
    this.props.navigation.push('list');
  }
  render(){
    return (
      <ScrollView style={{backgroundColor:'powderblue',flex:1}}>
        {/**实现第一行 */}
        <View style={{flexDirection:'row'}}>
          {/**实现第一列 */}
          <View style={styles.headText}>
            <Text style={styles.colorR}>2000</Text>
            <Text>当日PC端的PV量</Text>
          </View>
          {/**实现第二列 */}
          <View style={styles.headText}>
            <Text style={styles.colorG}>1050</Text>
            <Text>当日移动端的PV量</Text>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          {/**实现第一列 */}
          <View style={styles.headText}>
            <Text style={styles.colorR}>15326</Text>
            <Text>已完成订单总数</Text>
          </View>
          {/**实现第二列 */}
          <View style={styles.headText}>
            <Text style={styles.colorG}>2309</Text>
            <Text >单日APP下载量</Text>
          </View>
        </View>
        {/**第二行 */}
        <View style={{flexDirection:'row'}}> 
          <TouchableOpacity style={styles.myImage}>
            <Image  source={require('../assets/img/order.png')}></Image>
            <Text>订单管理</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.myImage}>
            <Image style={styles.myImage} source={require('../assets/img/user.png')}></Image>
            <Text>用户管理</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row'}}> 
          <TouchableOpacity style={styles.myImage} onPress={this.jump}>
            <Image style={styles.myImage} source={require('../assets/img/product.png')} ></Image>
            <Text>商品管理</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.myImage}>
            <Image style={styles.myImage} source={require('../assets/img/setting.png')}></Image>
            <Text>设置</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  headText: {
    justifyContent:'center',
    alignItems:'center',
    borderColor:'white',
    borderRightWidth:2,
    borderBottomWidth:2,
    flex:1,
    height:100
  },
  colorR:{
    color:'#cc3341',
    fontSize:30
  },
  colorG:{
    color:'green',
    fontSize:30
  },
  myImage:{
    justifyContent:'center',
    alignItems:'center',
    flex:1,
    height:200
  }
});
