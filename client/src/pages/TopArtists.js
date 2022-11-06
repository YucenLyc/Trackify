import { useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';
import { ArtistsGrid, SectionWrapper, TimeRangeButtons } from '../components';


const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState('short');

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);
    };

    catchErrors(fetchData());
  }, []);

  // Ifconsole.log(topArtists, "should see top artists here");

  return(
  <main>
    <SectionWrapper title="Top Artists" breadcrumb={true}>
      <TimeRangeButtons 
        activeRange={activeRange}
        setActiveRange={setActiveRange}
      />
      
      {topArtists && topArtists.items &&(
        <ArtistsGrid artists={topArtists.items} />
      )}
    </SectionWrapper>
  </main>
  )
}

export default TopArtists;