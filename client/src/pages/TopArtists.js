import { useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';


const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);
    };

    catchErrors(fetchData());
  }, []);

  console.log(topArtists, "should see top artists here");

  return(
  <h1>Top Artists Component</h1>
  )
}

export default TopArtists;