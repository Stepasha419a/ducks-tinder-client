const ProfileUserImageSetting: React.FC = () => {
    return(
        <div className="tinder__content-change">
            <div className="tinder__content-change-btns">
                <button className="tinder__content-change-button tinder__content-change-button--border tinder__content-change-button--active">Change</button>
                <button className="tinder__content-change-button">Preview</button>
            </div>
            <div className="tinder__content-change-panel">
                <div className="tinder__content-change-images">
                    <div className="tinder__content-change-images-col">
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                    </div>
                    <div className="tinder__content-change-images-col">
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                    </div>
                    <div className="tinder__content-change-images-col">
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                        <div className="tinder__content-change-images-col-item">
                            <img src="#" alt="#" className="tinder__content-change-images-col-item-img" />
                        </div>
                    </div>
                </div>
                <div className="tinder__content-change-descr">
                    Add more photos to fill out your profile by 
                    another 4% and get more likes.
                </div>
                <div className="tinder__content-change-save">
                    <button className="tinder__content-change-save-btn">Save changes</button>
                </div>
            </div>
        </div>
    )
}

export default ProfileUserImageSetting