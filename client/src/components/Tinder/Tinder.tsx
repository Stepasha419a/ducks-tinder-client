interface TinderPropsInterface{
    
}

const Tinder: React.FC<TinderPropsInterface> = () => {

    return(
        <div className="tinder__content">
            <div className="tinder__content-search">
                <div className="tinder__content-search-photo">
                    <div className="tinder__content-search-descr">
                        <div className="tinder__content-search-descr-person">
                            Polina <span className="tinder__content-search-descr-years">17</span>
                        </div>
                        <div className="tinder__content-search-descr-distance">
                            30 
                            <span className="tinder__content-search-distance-text">
                                &nbsp;miles from you
                            </span>
                        </div>
                    </div>
                    <div className="tinder__content-search-buttons">
                        <button className="tinder__content-search-btn tinder__content-search-btn--small">cancel</button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--large">dislike</button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--small">super like</button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--large">like</button>
                        <button className="tinder__content-search-btn tinder__content-search-btn--small">boost</button>
                    </div>
                </div>
            </div>
            <div className="tinder__content-instructions">

            </div>
        </div>
    )
}

export default Tinder