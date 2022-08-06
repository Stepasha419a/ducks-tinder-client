import { Link } from 'react-router-dom'
import headerImg from '../../assets/images/auth/img-01.png'

const Policy = () => {
    return (
        <div className="tinder__policy">
            <header className="tinder__policy-header">
                <div className="container">
                    <Link to='/' className="tinder__policy-header-link">
                        <img src={headerImg} alt="IMG" className='tinder__policy-header-img'/>
                        <span className="tinder__policy-header-text">ducks tinder</span>
                    </Link>
                </div>
            </header>
            <hr className="tinder__policy-hr"/>
            <div className="tinder__policy-content">
                <div className="container">
                    <h1 className="tinder__policy-content-h1">Community Rules</h1>
                    <p className="tinder__policy-content-p">
                        Welcome to the Ducks Tinder community. If you are 
                        honest, kind and respectful towards others, we will 
                        always be glad to see you here. However, if you 
                        behave differently, unfortunately, we will be forced 
                        to part with you. Our goal is for users to be able 
                        to express themselves freely as long as it doesn't 
                        hurt the feelings of others. There is a single 
                        standard of behavior for everyone on Tinder. We 
                        ask you to treat others with respect, think carefully 
                        about your actions and follow the rules of our 
                        community both online and offline. That's right: 
                        your offline behavior may lead to the blocking 
                        of your Tinder account.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Policy