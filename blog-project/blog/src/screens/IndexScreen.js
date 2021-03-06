import React, {useContext, useEffect} from  'react';
import {View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';
import {Feather} from "@expo/vector-icons"


const IndexScreen = ({navigation}) => {
	const {state, addBlogPost, deleteBlogPost, getBlogPosts} = useContext(BlogContext);


	useEffect( ()=>{
		getBlogPosts()
		navigation.addListener("didFocus", () => {
			getBlogPosts();
		})

		return () => {
			listener.remove();
		}

	}, [] )


	return <View>
		{state.length === 0 ? <Text>No posts yet</Text> : null}
		<FlatList 
			data={state} 
			keyExtractor={(blogPost) => blogPost.title}
			renderItem={ ({item}) => {
				return <TouchableOpacity onPress={() => navigation.navigate("Show", {id: item.id})}>
					<View style={styles.row}>
					
						<Text style={styles.title}> {item.title} - {item.id} </Text>
					
						<TouchableOpacity onPress={()=>deleteBlogPost(item.id)}>
							<Feather style={styles.icon} name="trash" />
						</TouchableOpacity>
					</View>
				</TouchableOpacity>
			}}
		/>
	</View>
};


IndexScreen.navigationOptions = ({ navigation }) => {
	return {
		headerRight: <TouchableOpacity onPress={ () =>  navigation.navigate("Create")} >
			<Feather name="plus" style={styles.plus} />
		</TouchableOpacity>
	}

}

const styles = StyleSheet.create({
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 20,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		paddingHorizontal: 10,
		borderColor: "gray"
	},

	title:{
		fontSize: 15
	},

	icon: {
		fontSize: 24,
		paddingRight: 5  

	},

	plus: {
		fontSize: 30,
		marginRight: 10
	}


})

export default IndexScreen;