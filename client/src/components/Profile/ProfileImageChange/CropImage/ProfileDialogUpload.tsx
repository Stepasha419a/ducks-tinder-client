interface ProfileDialogUploadPropsInterface{
    onImageChange: (e: any) => void
    setIsDialogUploadOpen: (setting: boolean) => void
}

const ProfileDialogUpload: React.FC<ProfileDialogUploadPropsInterface> = ({onImageChange, setIsDialogUploadOpen}) => {
    return(
        <div className="popup upload">
            <div className="popup-body upload">
                <div className="popup-content upload-content">
                    <div className="upload-close">
                        <div onClick={() => setIsDialogUploadOpen(false)} className="upload-close-btn"></div>
                    </div>
                    <div className="upload-title">Upload</div>
                    <div className="upload-descr">Choose context type</div>
                    <div className="upload-inputs">
                        <div className="upload-input-wrapper">
                            <label htmlFor="upload-input-gallery" className="upload-input-label">
                                <span className="upload-input-span">
                                    Upload from<br/>
                                    <span className="upload-input-span--bold">Gallery</span>
                                </span>
                                <input onChange={(e) => onImageChange(e)} accept="image/*" type="file" name="" id="upload-input-gallery" className="upload-input" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileDialogUpload