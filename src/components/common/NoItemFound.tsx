import React from "react"
import { useSelector } from "react-redux"
import { getIsBlack } from "../../redux/theme-selectors"

const NoItemFound: React.FC = () => {

   const isBlack = useSelector(getIsBlack)

   const style = {
      paddingLeft: '20px',
      background: `${isBlack ? 'rgba(255, 255, 255, 0.05)' : '#F8F8F7'}`,
      display: 'flex',
      height: '60px',
      borderRadius: '10px',
      alignItems: 'center'
   }

   const textStyle = {
      fontFamily: 'Jost',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      color: '#8C8C8C',
   }

   return <div style={style}>
      <span style={textStyle}>No item found</span>
   </div>
}

export default NoItemFound