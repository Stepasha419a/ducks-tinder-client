interface ProfileDialogUploadPropsInterface{
    onImageChange: (e: any) => void
    setIsDialogUploadOpen: (setting: boolean) => void
}

const ProfileDialogUpload: React.FC<ProfileDialogUploadPropsInterface> = ({onImageChange, setIsDialogUploadOpen}) => {
    return(
        <div className="popup upload">
            <div className="popup__body upload">
                <div className="popup__content upload__content">
                    <div className="upload__close">
                        <div onClick={() => setIsDialogUploadOpen(false)} className="upload__close-btn"></div>
                    </div>
                    <div className="upload__title">Upload</div>
                    <div className="upload__descr">Choose context type</div>
                    <div className="upload__inputs">
                        <div className="upload__input-wrapper">
                            <label htmlFor="upload__input-gallery" className="upload__input-label">
                                <span className="upload__input-span">
                                    Upload from<br/>
                                    <span className="upload__input-span--bold">Gallery</span>
                                </span>
                                <input onChange={(e) => onImageChange(e)} accept="image/*" type="file" name="" id="upload__input-gallery" className="upload__input" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDialogUpload