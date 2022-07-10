import { useEffect, useState, useCallback, Fragment, useRef } from 'react';
import './App.css';
import { addMoviesList, readMovies } from './services/firestore';

// see src/services/firebase.js file


function App() {

  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const titleRef = useRef();
  const openingcrawlRef = useRef();
  const directorRef = useRef();
  const producerRef = useRef();
  const releasedateRef = useRef();


  const fetchdata = useCallback(async()=>{ 
    setLoading(true);
  /*  const moviedatafeatch = await fetch('https://swapi.dev/api/films');
    const movid2 = await moviedatafeatch.json();
  
    const datainobject = movid2.results.map(objdata => {
            return {
              episode_id: objdata.episode_id,
              title: objdata.title,
              opening_crawl: objdata.opening_crawl,
              director: objdata.director,
              producer: objdata.producer,
              release_date: objdata.release_date
            } 
          
          });
        */
          const movid2 = await readMovies();

        const datainobject = JSON.parse(movid2).map(objdata => {
            return {
              episode_id: objdata.episode_id,
              title: objdata.title,
              opening_crawl: objdata.opening_crawl,
              director: objdata.director,
              producer: objdata.producer,
              release_date: objdata.release_date
            } 
          
          });

   setMovie(datainobject);
    setLoading(false);

  },[]);

  useEffect(()=>{

    fetchdata();

  },[fetchdata]);
 

  const loadingtext = loading ? <div className='loading'>Loading ...</div>: '';

  const movielist = movie.map(movies => {
    return <li className='wrap setleftanswerlies' key={movies.episode_id}>
      <div className='title_answer setleftanswer'>{movies.title}</div>
      <div className='description_answer setleftanswer'>{movies.opening_crawl}</div>
      <div className='director_answer setleftanswer'>{movies.director}</div>
      <div className='producer_answer setleftanswer'>{movies.producer}</div>
      <div className='release_date_answer setleftanswer'>{movies.release_date}</div>
      </li>
});

const submiteform = async(e) =>{
  e.preventDefault();
   const titleinput = titleRef.current.value;
   const openingcrawlinput = openingcrawlRef.current.value;
   const directorinput = directorRef.current.value;
   const producerinput = producerRef.current.value;
   const releasedateinput = releasedateRef.current.value;

   addMoviesList(titleinput, openingcrawlinput, directorinput, producerinput, releasedateinput);
   /*
   const postdata = {
    title: titleinput,
    opening_crawl: openingcrawlinput,
    director: directorinput,
    producer: producerinput,
    release_date: releasedateinput
   } 
   const moviedatafeatch = await fetch('https://xxx-1500689700394-default-rtdb.firebaseio.com/test.json',{
    method: 'POST',
    body: JSON.stringify(postdata)
   });
    const movid2 = await moviedatafeatch.json();
console.log(movid2);
*/

   titleRef.current.value ='';
   openingcrawlRef.current.value='';
   directorRef.current.value='';
   producerRef.current.value='';
   releasedateRef.current.value='';

}

  return (
    <Fragment>
  <div className="App">
  <div className="headbox">
     <div className="title setleft">
     title 
     </div>
     <div className="opening_crawl setleft">
      description
     </div>
     <div className="director setleft">
     director
     </div>
     <div className="producer setleft">
     producer
     </div>
     <div className="release_date setleft">
     release date
     </div>
     
  </div>
{loadingtext}
<ul>
  {movielist}
  </ul>
  <div className="buttonfetach">
      <button id="featchdata" onClick={fetchdata}>Get Result</button>
  </div>
</div>

<div className='addmoviedtawrap'>

<div className='wrapbetwn'>
  <div className='warplabinput'>
    <label>title</label>
    <input type="text" name="title" id='title' ref={titleRef} />
  </div>


  <div className='warplabinput'>
    <label>opening_crawl</label>
    <input type="textarea" name="opening_crawl" id='opening_crawl' ref={openingcrawlRef} />
  </div>

  <div className='warplabinput'>
    <label>director</label>
    <input type="text" name="director" id='director' ref={directorRef} />
  </div>

  <div className='warplabinput'>
    <label>producer</label>
    <input type="text" name="producer" id='producer' ref={producerRef}/>
  </div>

  <div className='warplabinput'>
    <label>release_date</label>
    <input type="text" name="release_date" id='release_date' ref={releasedateRef} />
  </div>

  <div className="submitbuton">
    <button name="submitemovie" id="submitemovie" onClick={submiteform}>Submite Movie</button>
    </div>

</div>

</div>
</Fragment>

  );
}

export default App;
