import { auth, db } from "../config/Firebase";
import { useAuth } from "../appcontext/Authcontext";
import { addDoc, collection, doc, onSnapshot, updateDoc, query, where, getDocs, setDoc, deleteDoc } from "firebase/firestore"
import { toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';



let postsRef = collection(db, "posts")
let likeRef = collection(db, "likes")
let commentRef = collection(db, "comments")
let userRef = collection(db, "users")


export const postStatus = (object) => {

    addDoc(postsRef, object).then(() => {
        toast.success("Posted!")
    }).catch((error) => console.log(error))

}

export const getStatus = (setAllStatus) => {
    onSnapshot(postsRef, (response) => {
        setAllStatus(response.docs.map((docs) => {
            return { ...docs.data(), id: docs.id }
        }))

    })
}

export const getCurrentUser = (setCurrentUser) => {
    const user = auth.currentUser;

    if (user) {
        // User is signed in.
        const userDocRef = doc(db, 'users', user.uid);

        const unsubscribe = onSnapshot(userDocRef, (doc) => {
            if (doc.exists()) {
                const userData = doc.data();
                setCurrentUser(userData);

            } else {
                console.log("No user data found.");
            }
        });

        // To stop listening to document changes when the component unmounts
        return unsubscribe;
    } else {
        // No user is signed in.
        console.log("No user signed in.");
        return null;
    }
}

export const editProfile = (uid, payload) => {
    let userToEdit = doc(db, 'users', uid)

    updateDoc(userToEdit, payload).then(() => {
        toast.success("Profile updated ")
    }).catch((err) => {
        console.log(err)
    })
}

export const getSingleStatus = (setAllStatus, id) => {
    const singlePostQuery = query(postsRef, where("userId", "==", id));
    onSnapshot(singlePostQuery, (response) => {
        setAllStatus(
            response.docs.map((docs) => {
                return { ...docs.data(), id: docs.id };
            })
        );
    }, (error) => {
        console.error('Error fetching single post:', error);
    });
};

export const getSingleUser = (setCurrentUser, email) => {
    const singleUserQuery = query(collection(db, "users"), where("email", "==", email));
    onSnapshot(singleUserQuery, (response) => {
        if (!response.empty) {
            setCurrentUser(
                response.docs.map((docs) => {
                    return { ...docs.data(), id: docs.id };
                })[0]
            );
        } else {
            setCurrentUser(null);
            console.log('No user found with the provided email.');
        }
    }, (error) => {
        console.error('Error fetching single user:', error);
    });
};

export const likePost = (userId, postId, liked) => {

    try {
        let docToLike = doc(likeRef, `${userId}_${postId}`)
        if (liked) {
            deleteDoc(docToLike)


        } else {
            setDoc(docToLike, { userId, postId })

        }

    }
    catch (err) {
        console.log(err)

    }

}

export const getLikesByUser = (userId, postId, setLiked, setLikesCount) => {

    try {

        let likeQuery = query(likeRef, where('postId', '==', postId))

        onSnapshot(likeQuery, (response) => {
            let likes = response.docs.map((doc) => doc.data())
            let likesCount = likes?.length

            const isLiked = likes.some((like) => like.userId === userId)

            setLikesCount(likesCount);
            setLiked(isLiked);
        })
    } catch (err) {
        console.log(err)
    }
}


export const postComment = (postId, comment, timeStamp, firstname, lastname) => {
    try {
        addDoc(commentRef, { postId, comment, timeStamp, firstname, lastname })
    }
    catch (err) {
        console.log(err)
    }
}

export const getComments = (postId, setComments) => {
    try {
        let singlePostQuery = query(commentRef, where('postId', '==', postId))

        onSnapshot(singlePostQuery, (response) => {
            const comments = response.docs.map((doc) => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            })

            setComments(comments)
        })


    } catch (err) {
        console.log(err)
    }
}


export const getAllUsers = (setAllUsers) => {

    onSnapshot(userRef, (response) => {
        setAllUsers(response.docs.map((docs) => {
            return { ...docs.data(), id: docs.id }
        }))

    })

}