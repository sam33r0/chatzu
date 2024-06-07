import React from 'react'
import formatDistance from 'date-fns/formatDistance'

function TimeComponent({ dateStr }) {
    const str = formatDistance(
        new Date(dateStr),
        new Date()
    );
    return <h1>{str} ago</h1>
}
export default TimeComponent