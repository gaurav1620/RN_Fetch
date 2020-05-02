import React from 'react';
import {TouchableOpacity,Button,StatusBar,FlatList,ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Card from './Card.js';
export default class App extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props);
        this.state={
            isLoading:false,
            data:[],
            offset:0,
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.fetchContent();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    

    fetchContent = ()=>{
        if( this.state.isLoading ||this._isMounted == false || (this.state.offset >= 100)){
            return;
        } 
        this.setState({isLoading:true});
        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${this.state.offset}&_limit=${10}`,{
                headers: {
                'Cache-Control': 'no-cache'
            }}
            )
            .then(resp => resp.json())
            .then(json => {

                if(! json[0]){
                    this.setState({isLoading:false});
                    return;
                }

                this.setState({
                    data : this.state.data.concat(json),
                    isLoading : false,
                    offset : this.state.offset+10,
                })
            })
            .catch(e => {console.log(e)})
    }
    render(){
        return (

            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Text>{'Total fetched count: '+this.state.offset}</Text>
                    <TouchableOpacity  onPress={()=>{
                        this.setState({data:[],offset:0},()=>{
                            this.fetchContent();
                        });
                    }}><Text style={{color:'red',paddingLeft:20}}>Restart</Text></TouchableOpacity>
                </View>
                <FlatList onEndReachedThreshold={0.01} keyExtractor = { (item, index) => index.toString() }
                    onEndReached={this.fetchContent}  data={this.state.data} 
                    renderItem={({item}) => <Card  key={item.id} data={item} body={item}/>} />
                <View style={styles.footer} >{this.state.isLoading ? <ActivityIndicator style={{width:20,height:20}}size='small'/> :null}</View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight+10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer:{
        width:20,
        height:20,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
