import React from 'react'
import styles from './loader.module.css'
export default function Loader() {
  return (
   <div className="h-[500px] flex justify-center items-center">
     <div className={`${styles.loader} `}>
      </div>
   </div>
  )
}
