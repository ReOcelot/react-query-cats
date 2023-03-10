import {useQuery} from '@tanstack/react-query'
import Axios from "axios";
import { ThemeContext } from '..';
import React from 'react';

export default function Catfact()
{
    const {theme, setTheme} = React.useContext(ThemeContext)

    async function getCatFact()
    {
        const res = await Axios.get("https://catfact.ninja/fact")
        const data = res.data 
        return data
    }
    const {data:catFact, isLoading, isError, refetch} = useQuery(["cat"], getCatFact);
    return(
        <div className={`container ${theme==="dark"&&"dark"}`}>
            <h1>Large Cat Fact</h1>
            {
                isError?(
                    <h2>Couldn't grab a cat fact :O</h2>
                ):
                (
                    !isLoading?(
                        <>
                            <h2>{catFact?.fact}</h2>
                            <button onClick={refetch}>New Fact</button>
                        </>
                    ):
                    (
                        <h2>Grabbing Cat Fact</h2>
                    )
                )      
            }
        </div>
    )
}