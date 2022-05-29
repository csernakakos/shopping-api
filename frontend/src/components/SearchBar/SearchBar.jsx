import { useState } from "react";
import styles from "./SearchBar.css";

export default function SearchBar({setSearchWord, setChecked, checked}) {
    return (
        <div className="search-bar">
            <input
                placeholder="Search for a product..."
                onChange={(e) => setSearchWord(e.target.value)}
            />
            <label>
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    />
                Discounts only
            </label>
        </div>

    )
}