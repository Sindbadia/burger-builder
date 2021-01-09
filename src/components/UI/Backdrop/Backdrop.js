import React from 'react'
import classes from './Backdrop.module.css'

const Backdrop = ({ show, clicked }) =>
	show ? <div onClick={clicked} className={classes.Backdrop}></div> : null

export default Backdrop
