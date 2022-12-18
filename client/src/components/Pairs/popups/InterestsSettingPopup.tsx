import { interestsList } from '../../../models/IUser';

interface InterestsSettingPopupProps {
  pairInterests: string[];
  addSort: (sort: string, field: string) => void;
  deleteSort: (sort: string, field: string) => void;
  setIsInterestsSettingPopupOpen: (setting: boolean) => void;
}

const InterestsSettingPopup: React.FC<InterestsSettingPopupProps> = ({
  pairInterests,
  addSort,
  deleteSort,
  setIsInterestsSettingPopupOpen,
}) => {
  return (
    <div className="pairs__popup">
      <div className="pairs__popup-body">
        <div className="pairs__popup-content pairs__popup-content--overflow">
          <div className="pairs__popup-title">Interests</div>
          <div
            onClick={() => setIsInterestsSettingPopupOpen(false)}
            className="pairs__popup-close"
          ></div>
          <div className="pairs__popup-sort-items">
            {interestsList.map((item) => {
              return (
                <div
                  onClick={() => {
                    pairInterests.includes(item)
                      ? deleteSort(item, 'interests')
                      : addSort(item, 'interests');
                  }}
                  key={item}
                  className={`pairs__popup-setting-item${
                    pairInterests.includes(item)
                      ? ' pairs__popup-setting-item--active'
                      : ''
                  }`}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setIsInterestsSettingPopupOpen(false)}
            className="pairs__popup-btn pairs__popup-btn--sorts-list"
          >
            Confirm
          </button>
        </div>
        <div
          onClick={() => setIsInterestsSettingPopupOpen(false)}
          className="pairs__popup-close-area"
        ></div>
      </div>
    </div>
  );
};

export default InterestsSettingPopup;
