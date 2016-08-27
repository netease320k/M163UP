import React from 'react'

const Pagination = ({
    pagination:{
        first, last, prev, next,
    }, issuePage,
    onPageClick
})=> (first+last+prev+next!=0?
    <ul className="pagination">
        {prev && <li><a onClick={()=>onPageClick(prev)}>&laquo;</a></li>}

        {first && first < prev && <li><a onClick={()=>onPageClick(first)}>{first}</a></li>}
        {first && prev - first > 1 && (prev == 3 ? <li><a onClick={()=>onPageClick(2)}>2</a></li> : <li className="disabled"><span>...</span></li>)}

        {prev && <li><a rel="prev" onClick={()=>onPageClick(prev)}>{prev}</a></li>}
        <li className="active"><span>{issuePage}</span></li>
        {next && <li><a rel="next" onClick={()=>onPageClick(next)}>{next}</a></li>}

        {last && last - next > 1 && (last - next == 2 ? <li><a onClick={()=>onPageClick(last - 1)}>{last - 1}</a></li> :
            <li className="disabled"><span>...</span></li>)}
        {last && next < last && <li><a onClick={()=>onPageClick(last)}>{last}</a></li>}

        {next && <li><a onClick={()=>onPageClick(next)}>&raquo;</a></li>}
    </ul>:null
);

export default Pagination