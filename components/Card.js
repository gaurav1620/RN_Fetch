import React from 'react';
import {Dimensions, TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';

class Card extends React.Component{
        
    constructor(props){
        super(props);
        this.state={
            isCollapsed:true,
        }
    }

    //Does not make unnecessary component updates 
    //and thus increases performance
    shouldComponentUpdate(nextProps, nextState){
        if(this.props.data != nextProps.data){return true;}
        if(this.state.isCollapsed != nextState.isCollapsed){return true;}
        return false;
    }

    //Using regex to replace all newlines with spaces
    title = (this.props.data.title).toString().replace(/\n/g,' ')
    body = (this.props.data.body).toString().replace(/\n/g,' ')

    flipButton(){
        this.setState({
            isCollapsed : !this.state.isCollapsed,
        })
    }

    render(){
    
        if(!this.props.data){return(null)}
        return (
            
            <View style={styles.container}>
                <View style={styles.titleStyle}>
                    <View style={styles.titleFlex}>
                        <Text style={styles.titleText}>{this.props.data.id+") " +this.title}
                        </Text>
                    </View>
                    <View style={styles.buttonstyle}>
                        {  this.state.isCollapsed ?
                           <TouchableOpacity onPress={()=>this.flipButton()} style={{with:30,height:30}}> 
                               <Image source={require('../assets/down.png') } style={{width:30,height:30}}/>
                           </TouchableOpacity>
                           :<TouchableOpacity onPress={()=>this.flipButton()} style={{with:30,height:30}}> 
                               <Image source={require('../assets/up.png') } style={{width:30,height:30}}/>
                           </TouchableOpacity>
                        }
                    </View>
                </View>
                { !this.state.isCollapsed ? 
                    <View style={styles.bodyStyle}>
                        <Text style={styles.bodyText}>
                            {this.body}
                        </Text>
                    </View>
                    :null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height:'auto',
        width:Dimensions.get('window').width*0.9,
        flexDirection:'column',
        backgroundColor: '#7d3cff',
        color:'#fff',
        padding:10,
        borderRadius:8,
        flexWrap:'wrap',
        overflow:'hidden',
        marginTop:20,
        marginLeft:Dimensions.get('window').width*0.05,
        marginRight:Dimensions.get('window').width*0.05,
        //Shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.38,
        shadowRadius: 6.84,
        elevation: 11,
    },

    buttonstyle:{
        flex:1,
        alignItems:'center',
    },
    titleStyle:{
        flex:1,
        flexDirection:'row',
        padding:10,
        height:'auto',
    },

    bodyStyle:{
        padding:10,
        height:'auto',
    },

    titleFlex:{
        flex:6,
    },
    titleText:{
        fontWeight:'bold',
        fontSize:15,
        color:'#fff',
    },
    bodyText:{
        fontSize:13,
        color:'#fff',

    }

});

export default Card;
