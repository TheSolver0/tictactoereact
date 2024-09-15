export function Case({val, onClick})
{
    return(
        <>
            <td onClick={onClick}> {val} </td>
        </>
    )
}