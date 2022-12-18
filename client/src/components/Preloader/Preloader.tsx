import styles from './Preloader.module.scss'

const Preloader = () => {
  return(
    <div className={styles.ring}><div></div><div></div><div></div><div></div></div>
  )
}

export default Preloader