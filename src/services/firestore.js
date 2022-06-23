import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";


//https://www.npmjs.com/package/firebase
//https://firebase.google.com/docs/firestore/quickstart



const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export const addMoviesList = async(titleinput, openingcrawlinput, directorinput, producerinput, releasedateinput) =>{

    try {
        const docRef = await addDoc(collection(db, "movieslist"), {
            title: titleinput,
            opening_crawl: openingcrawlinput,
            director: directorinput,
            producer: producerinput,
            release_date: releasedateinput
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }


}

export const readMovies = async() =>{

    const querySnapshot = await getDocs(collection(db, "movieslist"));
    const listArray = [];
    querySnapshot.forEach((doc) => {
       const dataxxx = {};
       dataxxx['episode_id']= Math.random();
       dataxxx['title']= doc.data().title;
       dataxxx['opening_crawl']= doc.data().opening_crawl;
       dataxxx['director']= doc.data().director;
       dataxxx['producer']= doc.data().producer;
       dataxxx['release_date']= doc.data().release_date;
      
        listArray.push(dataxxx);
     
    });
 //console.log(listArray);
    return JSON.stringify(listArray);

}