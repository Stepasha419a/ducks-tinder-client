import { Link } from 'react-router-dom'
import headerImg from '../../assets/images/auth/img-01.png'

const Policy = () => {
    return (
        <div className="policy">
            <header className="policy__header">
                <div className="container">
                    <Link to='/' className="policy__header-link">
                        <img src={headerImg} alt="IMG" className='policy__header-img'/>
                        <span className="policy__header-text">ducks tinder</span>
                    </Link>
                </div>
            </header>
            <hr className="policy__hr"/>
            <div className="policy__content">
                <div className="container">
                    <h1 className="policy__content-h1">Community Rules</h1>
                    <p className="policy__content-p">
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