import React from 'react'
import { parseISO, formatDistanceToNow } from 'date-fns'    // parsing and formatting dates

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = ''
  if (timestamp) {
    const date = parseISO(timestamp)            //
    const timePeriod = formatDistanceToNow(date)
    timeAgo = `${timePeriod} ago`
  }
  //&nbsp表示1个空格,且该空格占据宽度受【字体】影响明显而强烈
  //&emsp; 占据的宽度正好是1个中文宽度，且基本上不受字体影响 
  return (
    <span title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </span>
  )
}