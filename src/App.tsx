import { animate } from "framer-motion"
import { useEffect, useState } from "react"
import Button from "./Button"
import ButtonAlt from "./ButtonAlt"


function App() {
  const [freeplay] = useState(false)
  const [toggle] = useState(true)
  const [shadow] = useState(true)
  const [timerDisplay, setTimerDisplay] = useState("")

  let pressedKeys: any[] = []
  let timer: any = null
  let start = false
  let sameAsAns = false
  let level = 1
  let waitReload = false
  
  const keys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
  let ans: any[] = []

  var keys1 = keys.slice(0, 10)
  var keys2 = keys.slice(10, 19)
  var keys3 = keys.slice(19, 26)
  
  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if(e.repeat) return
      if(e.key === ' ') {
        spacebarPress()
      }
    }, true)
  }, [])
  
  const spacebarPress = () => {
    if(start && sameAsAns) right()
    if(start && !sameAsAns) wrong()
    if(toggle) reload()
    clearTimeout(timer)
  }

  const reload = () => {
    waitReload = false
    sameAsAns = false
    start = true
    let ansIdx = generateRandomNumbers(level)
    pressedKeys = []
    ans = []
    ansIdx.map((n) => {
      ans.push(keys[n])
    })
    if(freeplay) ans = []
    keys.map((e: any) => {
      animate("#keyDiv"+e, 
        {
          y: 0,
          boxShadow: shadow ? "0px .8rem #ffffff" : '0px 0rem #ffffff',
          backgroundColor: ans.includes(e) ? '#4B5DA5' : '#0f172a'
        }, { 
          duration: .1
        }
      )
      animate("#keyTextDiv"+e, 
        {
          color: "#ffffff"
        }, { 
          duration: .1
        }
      )
    })
    clearTimeout(timer)
    setTimerDisplay("")
    timer = setTimeout(() => {
      setTimerDisplay("Timeout")
      wrong()
    }, 5000)
  }

  const pressKey = (keyboard: any) => {
    if(!freeplay && start && !pressedKeys.includes(keyboard)){
      pressedKeys = [...pressedKeys, keyboard]
      if(!(pressedKeys.sort().every((element) => ans.sort().includes(element)))){
        wrong()
      }
      if((pressedKeys.sort().length === ans.sort().length) && pressedKeys.sort().every((value, index) => value === ans.sort()[index])) sameAsAns = true
    }
  }

  const wrong = () => {
    if(!waitReload){
      level = 1
      waitReload = true
      keys.map((e) => {
        animate("#keyDiv"+e, 
          {
            y: 0,
            boxShadow: shadow ? "0px .8rem #ffffff" : '0px 0rem #ffffff',
            backgroundColor: '#A5824B'
          }, { 
            duration: .1
          }
        )
      })
    }
  }
  
  const right = () => {
    if(waitReload) return
    if(level == 26) level = 0
    level++
  }

  function generateRandomNumbers(length: any) {
    let uniqueNumbers: number[] = [];
    
    while (uniqueNumbers.length < length) {
      const randomNum = Math.floor(Math.random() * 26); // Generates a random number between 0 and 25
      
      if (!uniqueNumbers.includes(randomNum)) {
        uniqueNumbers.push(randomNum);
      }
    }
  
    return uniqueNumbers;
  }

  // const shadowSwitch = () => {
  //   setShadow(prevState => prevState ? false : true)
  //   consoleLog()
  // }

  // const toggleSwitch = () => {
  //   if(freeplay){
  //     setToggle(prevState => prevState ? false : true)
  //   }
  //   consoleLog()
  //   // console.log(toggle)
  // }
  
  // const freeplaySwitch = () => {
  //   setFreeplay(prevState => prevState ? false : true)
  //   setToggle(prevState => freeplay ? true : prevState)
  //   consoleLog()
  // }
  
  // const consoleLog = () => {
  //   console.log(freeplay)
  //   console.log(toggle)
  //   console.log(shadow)
  // }
  
  return (
    <>
      {/* <LockedFunctionComponent/> */}
      <div className='h-screen w-full bg-slate-900 relative'>
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col gap-6">
          <div className="flex gap-4">
            {keys1.map((e) => {
              return (
                <Button key={e} keyboard={e} onPress={() => pressKey(e)} toggle={toggle ? true : false} shadow={shadow}/>
              )
            })}
          </div>
          <div className="flex gap-4 translate-x-4">
            {keys2.map((e) => {
              return (
                <Button key={e} keyboard={e} onPress={() => pressKey(e)} toggle={toggle ? true : false} shadow={shadow}/>
              )
            })}
          </div>
          <div className="flex gap-4 translate-x-16">
            {keys3.map((e) => {
              return (
                <Button key={e} keyboard={e} onPress={() => pressKey(e)} toggle={toggle ? true : false} shadow={shadow}/>
              )
            })}
          </div>
          <div className="flex gap-4 translate-x-64">
            <ButtonAlt key={' '} keyboard={' '} onPress={() => { spacebarPress() } } shadow={shadow}/>
          </div>
        </div>
        {/* <div className="flex p-4 gap-4">
          <div className="p-1 text-slate-600" onClick={freeplaySwitch}>FREEPLAY : {freeplay ? 'ON' : 'OFF'}</div>
          <div className="p-1 text-slate-600" onClick={toggleSwitch}>TOGGLE : {toggle ? 'ON' : 'OFF'}</div>
          <div className="p-1 text-slate-600" onClick={shadowSwitch}>Shadow : {shadow ? 'ON' : 'OFF'}</div>
          <div className="p-1 text-slate-600" onClick={consoleLog}>press</div>
        </div> */}
        <div className="text-center p-8 text-white text-3xl">{timerDisplay}</div>
      </div>
    </>
  )
}

export default App
