import styles from './TitleBar.module.css';

export const TitleBar = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cookidea - Recipe Generator</h1>
        </div>
    );
};
