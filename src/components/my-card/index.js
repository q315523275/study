import React from 'react'
import style from './style.less'

export default ({
  children, title = 'title', padding = '40px 0 0', className,
}) => (
  <div
    className={`${className} ${style.myCard}`}
    style={{ padding }}
  >
    <div className={style.myCardTip} />
    <div className={style.myCardTitle}>{title} </div>
    {children}
  </div>
)
