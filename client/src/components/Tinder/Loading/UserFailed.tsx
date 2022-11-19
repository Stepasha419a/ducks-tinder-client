import { Link } from "react-router-dom"

const TinderUserFailed = () => {
    return(
        <Link to='/profile' className="content__no-user">
            <div className="content__no-user-text">You don't have users currently</div>
            <div className="content__no-user-subtext">Click to change your prefer settings to get more opportunities</div>
        </Link>
    )
}

export default TinderUserFailed