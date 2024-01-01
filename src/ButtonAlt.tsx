import { animate, motion } from 'framer-motion'
import { useEffect } from 'react'

const ButtonAlt = (props: {keyboard: any, onPress: any, shadow: any}) => {

  const keyboard = props.keyboard === ' ' ? 'space' : props.keyboard

  const classList = props.keyboard === ' ' ? "w-[32rem] h-20 rounded-3xl border-white border-4 flex items-center" : "w-20 h-20 rounded-3xl border-white border-4 flex items-center"

  const animateSpaceBarDiv = (n: any) => {
    if(n){
      animate("#keyDiv"+keyboard, 
        {
          y: ".8rem",
          boxShadow: props.shadow ? "0px 0rem #ffffff" : '0px 0rem #ffffff',
          backgroundColor: "#ffffff"
        }, { 
          duration: .1
        }
      )
      animate("#keyTextDiv"+keyboard, 
        {
          color: "#ffffff"
        }, { 
          duration: .1
        }
      )
    }
    else {
      animate("#keyDiv"+keyboard, 
        {
          y: 0,
          boxShadow: props.shadow ? "0px .8rem #ffffff" : '0px 0rem #ffffff',
          backgroundColor: "#0f172a"
        }, { 
          duration: .1
        }
      )
      animate("#keyTextDiv"+keyboard, 
        {
          color: "#ffffff"
        }, { 
          duration: .1
        }
      )
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', (e) => keyOnHold(e.key, true), true)
    document.addEventListener('keyup', (e) => keyOnHold(e.key, false), true)
  }, [])

  const keyOnHold = (key: any, n: any) => {
    if(key === props.keyboard){
      animateSpaceBarDiv(n)
    }
  }
  
  return (
    <motion.div 
      id={"keyDiv"+keyboard}
      className={classList}
      initial={{ boxShadow: props.shadow ? "0px .8rem #ffffff" : '0px 0rem #ffffff', backgroundColor: "#0f172a" }}
      animate={{ boxShadow: props.shadow ? "0px .8rem #ffffff" : '0px 0rem #ffffff', backgroundColor: "#0f172a" }}
      onMouseDown={() => {
        keyOnHold(props.keyboard, true)
        props.onPress()
      }}
      onMouseUp={() => {keyOnHold(props.keyboard, false)}}
      onMouseLeave={() => {keyOnHold(props.keyboard, false)}}
    >
      <motion.p 
        id={"keyTextDiv"+keyboard} 
        className='text-2xl w-full text-center'
        initial={{ color: "#ffffff" }}
        animate={{ color: "#ffffff" }}
      >
        {keyboard}
      </motion.p>
    </motion.div>
  )
}

export default ButtonAlt