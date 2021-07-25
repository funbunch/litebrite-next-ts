import React, {useState, useEffect } from "react"
import Peg from "../components/Peg"
import styles from "../styles/Litebrite.module.scss"
import router, { useRouter } from 'next/router'
//import { useHistory } from 'react-router-dom'
import { NextPage } from 'next'

// interface Props {
//   userAgent?: string;
// }

const colors: string[] = ["red", "orange", "blue", "yellow", "lime", "hotpink"];

export default (props) => {

  const [activeLights, setActiveLights] = useState({})
  const [selectedColor, setSelectedColor] = useState('orange')

  console.log('activeLights', activeLights)
  //const history = useHistory()
  const router = useRouter()

  useEffect(() => {
    setActiveLights(props.activeLights || {})
  }, [props.activeLights])

  return (
    <div
      className={`styles.lite-brite ${
        props.classic ? " lite-brite--classic" : ""
      }`}
    >
      <div className="styles.lite-brite__lights">
        {Array.from(new Array(props.rows)).map((_, x) => (
          <div className={styles.row} id={`row-${x}`} key={`row-${x}`}>
            {Array.from(
              new Array(
                props.classic
                  ? x % 2 !== 0
                    ? props.cols - 1
                    : props.cols
                  : props.cols
              )
            ).map((_, y) => {
              const pegState = activeLights[`${x},${y}`];
              return (
                <div
                  className="column"
                  id={`cols-${x}-${y}`}
                  key={`cols-${x}-${y}`}
                >
                  <Peg
                    onClick={() => {
                      const updatedLights = { ...activeLights };
                      const coordinateString = `${x},${y}`;

                      if (updatedLights[coordinateString]) delete updatedLights[coordinateString]
                      else {
                        updatedLights[coordinateString] = {
                          active: true,
                          color: selectedColor
                        }
                      }

                      setActiveLights(updatedLights)

                      // console.log({
                      //   updatedLights,
                      //   string: btoa(JSON.stringify(updatedLights))
                      // })
                      // setActiveLights(updatedLights)
                      const encodedSheet = btoa(JSON.stringify(updatedLights))
                      router.push(`/sheet/${encodedSheet}`)

                    }}
                    color={
                      pegState ? pegState.color : selectedColor
                    }
                    isActive={pegState ? pegState.active : false}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="styles.light-brite__colors">
        {colors.map((color, i) => (
          <button
          key={i} className={`styles.color-picker styles.color-picker--${color} ${
              color === selectedColor
                ? " styles.color-picker--active"
                : ""
            }`}
            onClick={() => {
              /** setState of selectedColor to 'blue' **/
              setSelectedColor(color)
            }}
          >
            {color}
          </button>
        ))}

        <button
          onClick={() => {
            const shouldClear = window.confirm("You sure you want to clear?");
            /** setState of selectedColor to 'blue' **/
            if (shouldClear) {
              router.push('/')
            }
          }}
        >
          Clear
        </button>
      </div>
    </div>
  )
}
