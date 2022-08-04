import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBriefcase, faMagnifyingGlass, faFireFlameCurved, faUser } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import { logoutThunk } from "../../redux/authReducer"
import { AppStateType } from "../../redux/reduxStore"
import { updateUserThunk } from "../../redux/usersReducer"

const Profile = () => {

    const dispatch = useDispatch()

    const currentUser = useSelector((state: AppStateType) => state.usersPage.currentUser)

    const [currentDistanceSetting, setCurrentDistanceSetting] = useState(currentUser.partnerSettings.distance.toString())

    //dispatch(updateUserThunk({currentUser, inputName: 'distance', changedData: 90, innerObjectName: 'partnerSettings'}) as any)

    // objectName for inner object in user object if it is
    const submitSettings = (inputName: string, changedData: string | number, innerObjectName?: string) => { 
        dispatch(updateUserThunk({currentUser, inputName, changedData, innerObjectName}) as any)
    }

    return (
        <div className="tinder">
            <aside className="tinder__info tinder__info--gray">
                <div className="tinder__info-user">
                    <Link className="tinder__info-main-link" to='/'>
                        <FontAwesomeIcon icon={faFireFlameCurved}/>
                    </Link>
                    <div className="tinder__info-review">
                        <Link className="tinder__info-review-link" to='#'>
                            <FontAwesomeIcon icon={faBriefcase} />
                        </Link>
                    </div>
                    <div className="tinder__info-work-mode">
                        <Link className="tinder__info-work-mode-link" to='#'>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Link>
                    </div>
                </div>
                <div className="tinder__settings-groups">
                    <div className="tinder__settings-group">
                        <div className="tinder__settings-group-title">
                            Account Settings
                        </div>
                        <div className="tinder__settings-group-items">
                            <div className="tinder__settings-group-item">
                                <div className="tinder__settings-group-item-descr">
                                    <div className="tinder__settings-group-item-descr-title">
                                        Email
                                    </div>
                                    <div className="tinder__settings-group-item-descr-setting">
                                        {currentUser.email}
                                    </div>
                                </div>
                            </div>
                            <div className="tinder__settings-group-item">
                                <div className="tinder__settings-group-item-descr">
                                    <div className="tinder__settings-group-item-descr-title">
                                        Name
                                    </div>
                                    <div className="tinder__settings-group-item-descr-setting">
                                        {currentUser.name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tinder__settings-group-descr">
                            Verified email adress helps to protect your account
                        </div>
                    </div>
                    <div className="tinder__settings-group">
                        <div className="tinder__settings-group-title">
                        Find Settings
                        </div>
                        <div className="tinder__settings-group-items">
                            <div className="tinder__settings-group-item">
                                <div className="tinder__settings-group-item-descr">
                                    <div className="tinder__settings-group-item-descr-title">
                                        Place
                                    </div>
                                    <div className="tinder__settings-group-item-descr-setting">
                                        {currentUser.partnerSettings.place}
                                    </div>
                                </div>
                            </div>
                            <div className="tinder__settings-group-item">
                                <div className="tinder__settings-group-item-descr">
                                    <div className="tinder__settings-group-item-descr-title">
                                        Distance
                                    </div>
                                    <div className="tinder__settings-group-item-descr-setting">
                                        {currentUser.partnerSettings.distance} км.
                                    </div>
                                </div>
                                <div className="tinder__settings-group-item-setting">
                                    <div className="tinder__settings-group-item-setting-change">
                                        <input 
                                            value={currentDistanceSetting}
                                            onChange={(e) => setCurrentDistanceSetting(e.target.value)}
                                            onBlur={(e) => submitSettings('distance', e.target.value, 'partnerSettings')}
                                            className="tinder__settings-group-item-setting-change-input" 
                                            type="text"
                                        />
                                    </div>
                                    <div className="tinder__settings-group-item-setting-descr">
                                        Show people only in this range
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tinder__settings-group-descr">
                            When the local profiles are over, you will be able to 
                            switch to the Global Mode for dating people from all over the world.
                        </div>
                    </div>
                    <div className="tinder__settings-group">
                        <div className="tinder__settings-group-items">
                            <div onClick={() => dispatch(logoutThunk() as any)} className="tinder__settings-group-item tinder__settings-group-item--sumple-button">
                                <div className="tinder__settings-group-item-descr">
                                    <div className="tinder__settings-group-item-descr-title tinder__settings-group-item-descr-title--center">
                                        Log out
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
            <div className="tinder__content">
                <div className="tinder__content-search tinder__content-search--profile">
                    <div className="tinder__content-search-photo tinder__content-search-photo--profile">
                    </div>
                    <div className="tinder__content-info tinder__content-info--profile">
                        <div className="tinder__content-info-descr">
                            <div className="tinder__content-info-descr-name">
                                {currentUser.name}
                                <span className="tinder__content-info-descr-years">
                                    {currentUser.age}
                                </span>
                            </div>
                            <div className="tinder__content-info-descr-sex">
                                <FontAwesomeIcon icon={faUser}  className="tinder__content-info-descr-sex-icon"/>
                                {currentUser.sex}
                            </div>
                        </div>
                        <hr className="tinder__content-info-separator"/>
                        <div className="tinder__content-change-info-wrapper">
                            <div className="tinder__content-change-info">
                                <Link to="edit">
                                    <span className="tinder__content-change-info-text">Edit Info</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile