import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './ResultArea.module.css';

interface ResultAreaProps {
    markdown: string;
    error: string | null;
}

export const ResultArea: React.FC<ResultAreaProps> = ({ markdown, error }) => {
    if (error) {
        return (
            <div className={`${styles.container} ${styles.error}`}>
                <p>⚠️ {error}</p>
            </div>
        );
    }

    if (!markdown) {
        return (
            <div className={`${styles.container} ${styles.empty}`}>
                <p>Upload ingredients and select a country to generate a recipe.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.markdownContent}>
                <ReactMarkdown children={markdown} />
            </div>
        </div>
    );
};
