import { useState, useEffect } from 'react';
import { catchErrors } from '../utils';
import { getCurrentUserProfile, getCurrentUserPlaylists } from '../spotify';
import { StyledHeader } from '../styles';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const UserProfile = await getCurrentUserProfile();
      setProfile(UserProfile.data);

      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylist(userPlaylists.data);

      console.log("hello playlist", userPlaylists.data)
    }

    catchErrors(fetchData());
  }, []);

  return (
    <>
      {profile && (
        <>
          <StyledHeader type="user">
            <div className="header__inner">
              {profile.images.length && profile.images[0].url && (
                <img className="header__img" src={profile.images[0].url} alt="Avatar" />
              )}

              <div className="header__overline">Profile
                <h1 className="header__name">{profile.display_name}</h1>
                <p className="header__meta">
                  <span>{profile.followers.total} Follower {profile.followers.total !== 1 ? 's' : ''}
                  </span>
                </p>
              </div>
            </div>
          </StyledHeader>
        </>
      )}
    </>
  )
}

export default Profile;