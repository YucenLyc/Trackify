import { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUserPlaylists } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, PlaylistsGrid  } from '../components';

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);
  const [playlistsData, setPlaylistsData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getCurrentUserPlaylists();
      setPlaylistsData(data);
    };
    catchErrors(fetchData());
}, []);

// When playlistsData updates, check if there are more playlists 
// then update the state variable
  useEffect(() => {
    if (!playlistsData){
      return;
    }

    //plyalist endpoint only returns 20 playlists at a time.
    // get ALL playlists by fetching the next set of playlists 
    const fetchMoreData = async () => {
      if(playlistsData.next) {
        const { data } = await axios.get(playlistsData.next);
        setPlaylistsData(data);
      }
    };

    // use functional update to update play.ists state variable 
    // to avoid including playlists as a dependency for this hook
    // and creating an infinite loop
    setPlaylists(playlists => ([
      ...playlists ? playlists : [],
      ...playlistsData.items
    ]));

    //Fetch next set of playlists as needed 
    catchErrors(fetchMoreData());
  }, [playlistsData]);

  return (
    <main>
      <SectionWrapper title="Public Playlists" breadcrumb={true}>
        {PlaylistsGrid && (
          <PlaylistsGrid playlists={playlists} />
        )}
      </SectionWrapper>
    </main>
  );

};

export default Playlists;