import React, { useRef, useState } from 'react';
import styles from './RecipeDropzone.module.css';

interface RecipeDropzoneProps {
    onFileSelect: (file: File) => void;
    selectedFile: File | null;
}

export const RecipeDropzone: React.FC<RecipeDropzoneProps> = ({ onFileSelect, selectedFile }) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files[0]);
        }
    };

    return (
        <div
            className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                accept="image/*"
                className={styles.hiddenInput}
            />

            <div className={styles.content}>
                <div className={styles.icon}>📷</div>
                <p className={styles.text}>
                    {selectedFile ? selectedFile.name : 'Drag & Drop Ingredients Photo\nor Click to Upload'}
                </p>
            </div>
        </div>
    );
};
