import React from 'react'
import formatDistance from 'date-fns/formatDistance'

function TimeComponent({ dateStr }) {
    const str = formatDistance(
        new Date(dateStr),
        new Date()
    );
    return <p className='text-xs'>{str} ago</p>
}
export default TimeComponent