import { formateDuration } from '../utils';
import { StyledTrackList } from '../styles';

const TrackList = ({ tracks }) => (
  <>
    {tracks && tracks.length ? (
      <StyledTrackList type="tracks">
        {tracks.map((track, i) => (
          <li className="track__item" key={i}>
            <div className="track__item__num">{track.images[0] && (
              <div className="track__item__img">
                <img src={track.album.image[2].url} alt={track.name} />
              </div>
            )}
              <div className="track__item__name-artist">
                <div className="track__item__name overflow--ellipsis">
                  {track.name}
                </div>
                <div className="track__item__artist overflow-ellipsis">
                  {track.artists.map((artist, i) => (
                    <span key={i}>
                      {artist.name}{i !== track.artists.length - 1 && ', '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="track__item__album overflow-ellipsis">
              {track.album.name}
            </div>
            <div className="track__item__duration">
              {formatDuration(track.duration_ms)}
            </div>
          </li>
        ))}
      </StyledTrackList>
    )}
  </>
)