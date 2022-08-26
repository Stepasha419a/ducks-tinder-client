interface ProfileDialogUploadPropsInterface{
    onImageChange: (e: any) => void
    setIsDialogUploadOpen: (setting: boolean) => void
}

const ProfileDialogUpload: React.FC<ProfileDialogUploadPropsInterface> = ({onImageChange, setIsDialogUploadOpen}) => {
    

    return(
        <div className="tinder__popup tinder__upload">
            <div className="tinder__popup-body tinder__upload">
                <div className="tinder__popup-content tinder__upload-content">
                    <div className="tinder__upload-close">
                        <div onClick={() => setIsDialogUploadOpen(false)} className="tinder__upload-close-btn"></div>
                    </div>
                    <div className="tinder__upload-title">Upload</div>
                    <div className="tinder__upload-descr">Choose context type</div>
                    <div className="tinder__upload-inputs">
                        <div className="tinder__upload-input-wrapper">
                            <label htmlFor="upload-input-gallery" className="tinder__upload-input-label">
                                <span className="tinder__upload-input-span">
                                    Upload from<br/>
                                    <span className="tinder__upload-input-span--bold">Gallery</span>
                                </span>
                                <input onChange={(e) => onImageChange(e)} accept="image/*" type="file" name="" id="upload-input-gallery" className="tinder__upload-input" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDialogUpload