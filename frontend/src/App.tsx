// src/App.tsx
import React, {JSX} from 'react';
import Tableau from './components/Tableau';
import ThemeToggle from './components/ThemeToggle';

export default function App(): JSX.Element {
    return (
        <div style={{padding: 16}}>
            <header style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
                <h1 style={{margin: 0}}>Mon application</h1>
                <ThemeToggle/>
            </header>

            <Tableau/>
        </div>
    );
}