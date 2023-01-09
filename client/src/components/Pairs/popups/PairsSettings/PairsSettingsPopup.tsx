import { useEffect, useState } from 'react';
import RangeSlider, { IRange } from '../../../Slider/RangeSlider/RangeSlider';
import { ISorts } from '../../utils/PairsUtils';

interface PairsSettingsPopupProps {
  pairSorts: ISorts;
  clearSorts: () => void;
  addSort: (
    sortSetting: string | number | { min: number; max: number },
    field: string
  ) => void;
  deleteSort: (
    sortSetting: string | number | { min: number; max: number },
    field: string
  ) => void;
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
  setIsSortPopupOpen: (setting: boolean) => void;
}

const PairsSettingsPopup: React.FC<PairsSettingsPopupProps> = ({
  pairSorts,
  clearSorts,
  addSort,
  deleteSort,
  setIsInterestsSettingPopupOpen,
  setIsSortPopupOpen,
}) => {
  const [distanceSetting, setDistanceSetting] = useState(pairSorts.distance);
  const [ageSetting, setAgeSetting] = useState<{ min: number; max: number }>(
    pairSorts.age
  );
  const [photoCount, setPhotoCount] = useState(pairSorts.photos);

  const arrForLoop = [];
  for (let i = 1; i <= 9; i++) {
    arrForLoop.push(i);
  }

  const setPhotosCountHandler = (value: number) => {
    addSort(value, 'photos');
    setPhotoCount(value);
  };

  useEffect(() => {
    setDistanceSetting(pairSorts.distance);
    setAgeSetting(pairSorts.age);
    setPhotoCount(pairSorts.photos);
  }, [pairSorts]);

  const distanceHandler = () => {
    addSort(distanceSetting, 'distance');
  };

  const ageHandler = () => {
    addSort(ageSetting, 'age');
  };

  return (
    <div className="pairs__popup">
      <div className="pairs__popup-body">
        <div className="pairs__popup-content">
          <div className="pairs__popup-title">Likes filter</div>
          <div
            onClick={() => setIsSortPopupOpen(false)}
            className="pairs__popup-close"
          ></div>
          <div className="pairs__popup-setting">
            <div className="pairs__popup-setting-title">Max distantion</div>
            <div className="pairs__popup-setting-value">
              {distanceSetting} km
            </div>
            <div className="pairs__popup-setting-change pairs__popup-setting-change--margin-top">
              <RangeSlider
                value={distanceSetting}
                setValue={(value: number | IRange) =>
                  setDistanceSetting(value as number)
                }
                completeValue={() => distanceHandler()}
                min={2}
                max={100}
              />
            </div>
          </div>
          <div className="pairs__popup-hr"></div>
          <div className="pairs__popup-setting">
            <div className="pairs__popup-setting-title">Age range</div>
            <div className="pairs__popup-setting-value">
              from {ageSetting.min} to {ageSetting.max}
            </div>
            <div className="pairs__popup-setting-change pairs__popup-setting-change--margin-top">
              <RangeSlider
                value={ageSetting}
                setValue={(value: number | IRange) =>
                  setAgeSetting(value as IRange)
                }
                completeValue={() => ageHandler()}
                min={18}
                max={100}
                isMultiple
              />
            </div>
          </div>
          <div className="pairs__popup-hr"></div>
          <div className="pairs__popup-setting">
            <div className="pairs__popup-setting-title">Min photo's count</div>
            <div className="pairs__popup-setting-change pairs__popup-setting-change--flex">
              {arrForLoop.map((item) => {
                return (
                  <div
                    onClick={() => setPhotosCountHandler(item)}
                    key={item}
                    className={`pairs__popup-setting-item${
                      photoCount === item
                        ? ' pairs__popup-setting-item--active'
                        : ''
                    }`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="pairs__popup-hr"></div>
          <div className="pairs__popup-setting">
            <div className="pairs__popup-setting-title">Interests</div>
            <div className="pairs__popup-setting-change pairs__popup-setting-change--flex">
              {['music', 'travelling', 'movies'].map((item) => {
                return (
                  <div
                    onClick={() => {
                      pairSorts.interests.includes(item)
                        ? deleteSort(item, 'interests')
                        : addSort(item, 'interests');
                    }}
                    key={item}
                    className={`pairs__popup-setting-item${
                      pairSorts.interests.includes(item)
                        ? ' pairs__popup-setting-item--active'
                        : ''
                    }`}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => setIsInterestsSettingPopupOpen(true)}
              className="pairs__popup-setting-show-all"
            >
              Show all
            </div>
          </div>
          <div className="pairs__popup-hr"></div>
          <div
            onClick={() => {
              pairSorts.account.includes('identify confirmed')
                ? deleteSort('identify confirmed', 'account')
                : addSort('identify confirmed', 'account');
            }}
            className="pairs__popup-setting pairs__popup-setting--cursor"
          >
            <div className="pairs__popup-setting-change pairs__popup-setting-change--checkbox">
              <div className="pairs__popup-setting-descr">
                Identify confirmed
              </div>
              <label className="pairs__popup-setting-label">
                <input
                  checked={pairSorts.account.includes('identify confirmed')}
                  className="pairs__popup-setting-checkbox"
                  type="checkbox"
                  id="pairs__popup-identify-checkbox"
                />
                <div
                  onClick={() => {
                    pairSorts.account.includes('identify confirmed')
                      ? deleteSort('identify confirmed', 'account')
                      : addSort('identify confirmed', 'account');
                  }}
                  className="pairs__popup-setting-label-checked"
                ></div>
              </label>
            </div>
          </div>
          <div className="pairs__popup-hr"></div>
          <div
            onClick={() => {
              pairSorts.account.includes('have interests')
                ? deleteSort('have interests', 'account')
                : addSort('have interests', 'account');
            }}
            className="pairs__popup-setting pairs__popup-setting--cursor"
          >
            <div className="pairs__popup-setting-change pairs__popup-setting-change--checkbox">
              <div className="pairs__popup-setting-descr">Have interests</div>
              <label className="pairs__popup-setting-label">
                <input
                  checked={pairSorts.account.includes('have interests')}
                  className="pairs__popup-setting-checkbox"
                  type="checkbox"
                  id="pairs__popup-identify-checkbox"
                />
                <div
                  onClick={() => {
                    pairSorts.account.includes('have interests')
                      ? deleteSort('have interests', 'account')
                      : addSort('have interests', 'account');
                  }}
                  className="pairs__popup-setting-label-checked"
                ></div>
              </label>
            </div>
          </div>
          <div className="pairs__popup-hr"></div>
          <div className="pairs__popup-buttons">
            <button
              onClick={() => clearSorts()}
              className="pairs__popup-btn pairs__popup-btn--left-border"
            >
              Clear
            </button>
            <button
              onClick={() => setIsSortPopupOpen(false)}
              className="pairs__popup-btn pairs__popup-btn--right-border"
            >
              Confirm
            </button>
          </div>
        </div>
        <div
          onClick={() => setIsSortPopupOpen(false)}
          className="pairs__popup-close-area"
        ></div>
      </div>
    </div>
  );
};

export default PairsSettingsPopup;
