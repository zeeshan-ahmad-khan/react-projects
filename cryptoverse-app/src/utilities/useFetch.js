import { useState, useEffect } from "react";


function useFetch(url) {

    const [reqData, setData] = useState();
    const [isPending, setIsPending] = useState(true)

    useEffect(() => {
        setTimeout(fetchData(url), 1000)
    }, [url])

    const fetchData = (url) => {


        fetch(`https://coinranking1.p.rapidapi.com/${url}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coinranking1.p.rapidapi.com",
                "x-rapidapi-key": "cf02ab27b8mshb23938f825c9faap10a879jsn01ad69e099df"
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Data could not be fetched")
                }
                return res.json();
            })
            .then(data => {
                setData(data.data)
                setIsPending(false);
            })
            .catch(err => {
                console.log(err);
                setIsPending(false);
            })
    }

    return { reqData, isPending };
}

export default useFetch;