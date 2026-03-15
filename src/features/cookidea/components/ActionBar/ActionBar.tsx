import React, { useState } from 'react';
import styles from './ActionBar.module.css';

interface ActionBarProps {
    onGenerate: (country: string) => void;
    isLoading: boolean;
    disabled: boolean;
}

const COUNTRIES = [
    'Global / Fusion',
    'Algerian',
    'Saudi',
    'Levantine',
    'Italian',
    'Mexican',
    'Japanese',
    'Indian',
    'French',
    'Thai',
    'Mediterranean',
    'American'
];

export const ActionBar: React.FC<ActionBarProps> = ({ onGenerate, isLoading, disabled }) => {
    const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);

    return (
        <div className={styles.actionBar}>
            <select
                className={styles.dropdown}
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                disabled={isLoading}
            >
                {COUNTRIES.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>

            <button
                className={`${styles.button} ${isLoading ? styles.loading : ''}`}
                onClick={() => onGenerate(selectedCountry)}
                disabled={disabled || isLoading}
            >
                {isLoading ? 'Generating...' : 'Generate Recipe'}
            </button>
        </div>
    );
};
