import React, { useEffect, useRef } from 'react';
import { Dispatch, SetStateAction } from 'react'; // Import Dispatch and SetStateAction
import styles from './CurrencyModal.module.css';
import "../../../app/globals.css"
import { quicksand } from '../../../../libs/allFonts';

type Props = {
    setIsSelectingCurrency: Dispatch<SetStateAction<boolean>>,
    setCurrency: Dispatch<SetStateAction<string>>,
    currency : string
};

const currencies = ["USD", "EUR", "GBP", "AUD", "BHD", "OMR", "AED", "KWD", "SEK", "NZD", "CHF", "SAR", "CAD", "QAR"];

export default function CurrencyModal({ setIsSelectingCurrency,currency,setCurrency}: Props) {


    const overlay = useRef<HTMLDivElement>(null)



    const handleChangeCurrency = (selectedCurrency: string) => {
        setCurrency(selectedCurrency);
        setIsSelectingCurrency(false);
        window.location.reload()
    }
    


    useEffect(() => {
        const bodyElement = document.querySelector("body");
        let overlayRef = overlay.current; // Copy overlay.current to a variable
    
        if (bodyElement) {
            bodyElement.style.overflow = "hidden";
        }
    
        if (overlayRef) {
            overlayRef.style.visibility = "visible";
        }
    
        return () => {
            if (bodyElement) {
                bodyElement.style.overflow = "";
            }
    
            if (overlayRef) {
                overlayRef.style.visibility = "hidden";
            }
        };
    }, []);
    
    



    return (
        <>
        <div className={styles.main_modal_container}>
            <button onClick={() => setIsSelectingCurrency(false)} className={styles.close_modal_button}>&#x2716;</button>
            <h3 className={styles.title}>Select Currency</h3>
            <p className={quicksand.className}>Please select your preferred currency from the options below.</p>
            <div className={styles.currencies_list}>
            {currencies.map(eachCurrency => (
            <button
            onClick = {() => handleChangeCurrency(eachCurrency)}
                key={eachCurrency}
                className={`${styles.currency} ${eachCurrency === currency ? styles.active : null}`}
            >
                {eachCurrency}
            </button>
            ))}
      </div>
        </div>
        <div ref={overlay} className="dark_overlay"></div>
        </>
    );
}
