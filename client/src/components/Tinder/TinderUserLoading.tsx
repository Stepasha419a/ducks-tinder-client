const TinderUserLoading = () => {
    return(
        <div className="content__user content__user--loading">
            <div className="content__loading-text content__loading-text--left">loading...</div>
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            <div className="content__loading-text content__loading-text--right">loading...</div>
        </div>
    )
}

export default TinderUserLoading