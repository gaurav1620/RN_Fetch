import React from 'react';
import {Alert,Image,Linking,Header,TouchableOpacity,Button,StatusBar,FlatList,ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Card from './components/Card.js';
export default class App extends React.Component{

    _isMounted = false;

    constructor(props){
        super(props);
        //Set default state 
        this.state={
            isLoading:false,
            data:[],
            offset:0,
        }
    }

    //Only fetch content after the component is mounted
    componentDidMount() {
        this._isMounted = true;
        this.fetchContent();
        Alert.alert(
            "Info",
            "Tap on black arrow to expand the card.",
        [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
    

    fetchContent = ()=>{
        //If component is not mounted then we cannot fetch data
        if( this.state.isLoading ||this._isMounted == false || (this.state.offset >= 100)){
            return;
        } 
        
        //setting the state to isLoading : true will start the activity indicator
        this.setState({isLoading:true});

        fetch(`https://jsonplaceholder.typicode.com/posts?_start=${this.state.offset}&_limit=${10}`,{
                headers: {
                'Cache-Control': 'no-cache'
            }}
            )
            .then(resp => resp.json())
            .then(json => {
                //If we request data that is not present, then the API sends null as a response
                //so if response is null that means we have reached the limit of the list of posts
                if(! json[0]){
                    this.setState({isLoading:false});
                    return;
                }

                //add the fetched data to existing data
                //increment the offset by 10
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
                <View style={styles.header}>
                    <Text style={styles.textStyle} >{'Total fetched : '+this.state.offset}</Text>
                    <TouchableOpacity style={styles.restartView}  onPress={()=>{
                        this.setState({data:[],offset:0},()=>{
                            this.fetchContent();
                        });
                        }}>

                        <Text style={styles.restartButton}>
                            Restart
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:0.5,alignItems:'center'}} 
                        onPress={()=>Linking.openURL('http://github.com/gaurav1620/RN_Fetch')}>
                        <Image style={styles.githubIcon} source={require('./assets/GitHub-Mark-32px.png')} / >
                    </TouchableOpacity>

                </View>

                <FlatList onEndReachedThreshold={0.01} keyExtractor = { (item, index) => index.toString() }
                    onEndReached={this.fetchContent}  data={this.state.data} 
                    renderItem={({item}) => <Card  key={item.id} data={item} body={item}/>} />
                <View style={styles.footer}> 
                    {this.state.isLoading ? 
                    <ActivityIndicator style={{width:30,height:30}}size='large'/> 
                    :null}
                </View>
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
        width:30,
        height:30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header:{
        marginLeft:20,
        flexDirection:'row',
        justifyContent:'space-around',
    },
    textStyle:{
        fontWeight:'bold',
        fontSize:16,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    restartView:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    restartButton:{
        color:'red',
        fontWeight:'bold',
        fontSize:16,
    },
    githubIcon:{
        height:30,
        width:30,
        
    }

});
