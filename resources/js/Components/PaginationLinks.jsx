import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const PaginationLinks = ({ itemsPerPage, data, setPageNumber, pageNumber}) => {

    /* const [data, setData] = useState([]); */
    /* const [pageNumber, setPageNumber] = useState(0); */

    /* const itemsPerPage = 2; */
    /* const pagesVisited = pageNumber * itemsPerPage; */

    /* useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `/api/react_interview?page=${pageNumber + 1}`
            );
            setData(response.data.products);
            console.log(response)
        };
        fetchData();
    }, [pageNumber]); */
    

    const pageCount = Math.ceil(data?.total / itemsPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(pageNumber +1);
    };

    return (
        <div>
            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"page-link"}
                nextLinkClassName={"page-link"}
                disabledClassName={"disabled"}
                activeClassName={"active"}
            />
        </div>
    );
};

export default PaginationLinks;
