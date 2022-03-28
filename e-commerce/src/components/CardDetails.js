import { useParams } from "react-router-dom"

function CardDetails() {

    const { id } = useParams()
    console.log(id);

    return (
        <div>CardDetails</div>
    )
}

export default CardDetails