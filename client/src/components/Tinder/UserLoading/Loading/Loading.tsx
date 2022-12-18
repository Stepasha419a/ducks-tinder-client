import Preloader from '../../../Preloader/Preloader'
import styles from './Loading.module.scss'

const TinderUserLoading = () => {
    return(
        <div className={styles.loading}>
            <div className={`${styles.text} ${styles.text_left}`}>loading...</div>
            <Preloader />
            <div className={`${styles.text} ${styles.text_right}`}>loading...</div>
        </div>
    )
}

export default TinderUserLoading