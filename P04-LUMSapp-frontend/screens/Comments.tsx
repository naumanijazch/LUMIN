// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { Image,StyleSheet, View, FlatList, TextInput, Button, Text, TouchableOpacity } from "react-native";
// import { IP } from "../constants/ip";
// import { useAppSelector } from "../redux/hooks";
// import Comment from "../components/Comment";





// const findCommentById = (comments:any, commentId:any) => {
//   for (const comment of comments) {
//     if (comment._id === commentId) {
//       return comment;
//     }

//     if (comment.replies && comment.replies.length > 0) {
//       const foundInReplies:any = findCommentById(comment.replies, commentId);
//       if (foundInReplies) {
//         return foundInReplies;
//       }
//     }
//   }

//   return null; // Comment not found
// };



// const Comments = (commentsData:any,handleDataChange:any,handlePress:any) => {
 

// // const commentsData = route.params.commentsData;
//   //   useEffect(() => {
//   //   const fetchComments = async () => {
//   //     try {
//   //       const { data } = await axios.post(`${IP}/comment/get`, {
//   //         postId: postId,
//   //       });
//   //       setCommentsData(data.comments);
//   //       // console.log(data)
//   //     } catch (error) {
//   //       console.error("Error fetching comments:", error);
//   //     }
//   //   };

//   //   fetchComments();
//   // }, [postId]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.topContainer}>
//         <Text style={{ color: "grey", fontSize: 17 }}>Comments</Text>
//         {/* <TouchableOpacity onPress={( ) => { }}>
//           <Text style={{ color: "white", fontSize: 16 }}>Close</Text>
//         </TouchableOpacity> */}
//       </View>
    
//       {/* <FlatList
//       data={commentsData}
//       keyExtractor={(item, _) => item._id.toString()}
//        renderItem={({ item }) => 
    
//       <Comment comment={item} showReplies={false} onPress={handlePress} onDataChange={handleDataChange} />
//   }

//     /> */}
//      {commentsData?.map(item => (
//       // console.log(item),
//         <Comment
//           key={item?._id.toString()} // Ensure each item has a unique key
//           comment={item}
//           showReplies={false}
//           onPress={handlePress}
//           onDataChange={handleDataChange}
//         />
//       ))}
//   {/* {additionalData.name !== 'nan' && (
//      <View style={{...styles.userInfoContainer, marginBottom:0}}>
//      <Text style={{color: "white"}}>Replying to </Text><Text style={{color: "white",fontWeight: "bold" }}>{additionalData.name}</Text>
//     <TouchableOpacity onPress={() => setAdditionalData({ id: "-1", name: "nan" })}>
//       <Text style={{ color: "grey", opacity: 50, paddingLeft: 30 }}>Cancel</Text>
//     </TouchableOpacity>
//      </View>)
//     } */}
 
      
//     </View>
//   );
// };




// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 6,
//     paddingTop: 0,
//     backgroundColor: "black",
//   },
  
//   topContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 8,
//     padding:0
//     // borderColor: "white",
//     // borderWidth: 1,
//   },
  
  
//   userInfoContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     // borderColor: "white",
//     // paddingLeft: 10,
//    borderWidth: 1,
//   //  borderColor: "white",
//     paddingLeft: 0,
//     marginBottom: 8,
//   },
 

//   seeMore: {
//     color: "gray",
//     fontSize: 16,
//     marginBottom: 4,
//   },
 

//   newCommentContainer: {
//     flexDirection: "row",
    
//     alignItems: "center",
  
//     marginTop: 16,
//   },
//   newCommentInput: {
//     flex: 1,
//     height: 40,
//     borderColor: "#ddd",
//     borderWidth: 1,
//     borderRadius: 8,
//     marginRight: 8,
//     paddingHorizontal: 8,
//     color: "white",
//   },
// });

// export default Comments;
