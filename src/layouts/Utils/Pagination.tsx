// React.FC is a type statement in TypeScript, FC stands for function type
// the {} in <> defines the type of props, which is object and has three properties
export const Pagination : React.FC<{currentPage: number,
    totalPages: number,
    paginate:any
}> = (props) => {
    // 这段代码会动态控制当前页码前显示的页面，如果当期页码是1，就一起显示，因为1前面没有页码了
    // e.g. 当前页面是1，总页码3，显示1 2 3
    // 当前页码是2，总页码5，数组加入1
    // 当前页码是4，总页码5，数组加入 2,3
    // 当前页码是5，总页码5，数组加入 3,4
    // 当前页码是2，总页码2，数组加入 1

    const pageNumbers = [];
    if(props.currentPage === 1){
        pageNumbers.push(props.currentPage)
        if(props.totalPages >= props.currentPage + 1){
            pageNumbers.push(props.currentPage + 1)
        }
        if(props.totalPages >= props.currentPage + 2){
            pageNumbers.push(props.currentPage + 2)
        }
    }else if(props.currentPage > 1){
        if(props.currentPage >= 3){
            pageNumbers.push(props.currentPage - 2)
            pageNumbers.push(props.currentPage - 1)
        }else{
            pageNumbers.push(props.currentPage - 1)
        }
    

    // 再加入当前的页码，此时数组中最多有三个页码，当前页码前的页码和当前的页码
    pageNumbers.push(props.currentPage)

    // 后面的这段页面主要是控制当前页码后面的页码
    // e.g. 当前页码是4，总页码是5，目前数组中已经有[2,3,4]
    // 此时 会把5加进去 数组更新为[2,3,4,5]
    if(props.totalPages >= props.currentPage + 1){
        pageNumbers.push(props.currentPage + 1)
    }

    // 如果总页数是6， 此时数组更新为[2,3,4,5,6]
    // 也就是说，当前页码前后的页码都控制在最多两页
    if(props.totalPages >= props.currentPage + 2){
        pageNumbers.push(props.currentPage + 2)
    }

}

    return (
        <nav aria-label='...'>
            <ul className="pagination">
                <li className="page-item" onClick={() => props.paginate(1)}>
                    <button className="page-link">
                        First Page
                    </button>
                </li>
                {/* map函数直接返回一个新的数组进行渲染 */}
                {pageNumbers.map(
                    number => (
                        <li key={number} onClick={() => props.paginate(number)}
                        className={'page-item' + (props.currentPage === number? 'active' : '')}>
                            <button className="page-link">
                                {number}
                            </button>
                        </li>
                    ))}
                    <li className="page-item" onClick={() => props.paginate(props.totalPages)}>
                        <button className="page-link">
                            Last Page
                        </button>
                    </li>
            </ul>

        </nav>

    )
} 