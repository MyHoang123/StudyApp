import { memo, useRef, useState } from "react";
function Reading({Englishs, vietnameses, handleCheckResuilt}) {
  const [active, setActive] = useState({ E: 0, V: 0 })
    const SuccessEnglish = useRef([])
    const SuccessVn = useRef([])
    const handleAddSuccess = (Id) => {
        SuccessEnglish.current[Id].classList.add('success')
        SuccessVn.current[Id].classList.add('success')
    }
    const handleRemoveFail = (Id,Click) => {
      if(Click === 'E') {
        SuccessEnglish.current[active.E].classList.remove('fail')
        SuccessVn.current[Id].classList.remove('fail')
      }
      else {
        SuccessEnglish.current[Id].classList.remove('fail')
        SuccessVn.current[active.V].classList.remove('fail')
      }
    }
    const handleCheckMatch = (Id, Click, Result) => {
        if (Click === 'E') {
          SuccessVn.current[active.V].classList.add(`${Result}`)
          SuccessEnglish.current[Id].classList.add(`${Result}`)
          setActive({ E: 0, V: 0 })
          setTimeout(() => {
            Result === 'sucessdelay' ? handleAddSuccess(Id) : handleRemoveFail(Id,'V')
          }, 500)
        }
        else {
          SuccessEnglish.current[active.E].classList.add(`${Result}`)
          SuccessVn.current[Id].classList.add(`${Result}`)
          setActive({ E: 0, V: 0 })
          setTimeout(() => {
            Result === 'sucessdelay' ? handleAddSuccess(Id) : handleRemoveFail(Id,'E')
          }, 500)
        }
      }
      const handleClickActive = (Vocabulary, Id) => {
        if (Vocabulary === 0) {
          if (active.V !== 0) {
            if (Id === active.V) {
              handleCheckMatch(Id, 'E', 'sucessdelay')
              handleCheckResuilt(true)
            }
            else {
              handleCheckMatch(Id, 'E', 'fail')
              handleCheckResuilt(false)
            }
          }
          else {
            setActive({ E: Id, V: 0 })
          }
        }
        else {
          if (active.E !== 0) {
            if (Id === active.E) {
              handleCheckMatch(Id, 'V', 'sucessdelay')
              handleCheckResuilt(true)
            }
            else {
              handleCheckMatch(Id, 'V', 'fail')
              handleCheckResuilt(false)
            }
          }
          else {
            setActive({ E: 0, V: Id })
          }
        }
      }
    return (
        <>
            <div className='Table_content_item'>
                <h2>English</h2>
                {Englishs.map((english) => (
                    <div className="Content_Enlish_container" key={english.Id}>
                        <input checked={active.E === english.Id} onChange={() => handleClickActive(0,english.Id)} type="radio" id={`checkType-${english.Id}`} name="English" className="checkbox_input"/>
                        <label htmlFor={`checkType-${english.Id}`} ref={e => SuccessEnglish.current[english.Id] = e}  className='Content_Enlish'>{english.English}
                        </label>
                    </div>
                ))}
            </div>
            <div className='Table_content_item'>
                <h2>Vietnamese</h2>
                {vietnameses.map((vietnamese) => (
                    <div className="Content_vietnamese_container" key={vietnamese.Id}>
                        <input checked={active.V === vietnamese.Id} onChange={() => handleClickActive(1, vietnamese.Id)} type="radio" id={`checkTypevn-${vietnamese.Id}`} name="vietnamese" className="checkbox_input"/>
                        <label htmlFor={`checkTypevn-${vietnamese.Id}`} ref={e => SuccessVn.current[vietnamese.Id] = e}  className='Content_vietnamese'>{vietnamese.Vietnamese}
                        </label></div>
                ))}
            </div>
        </>
    );
}

export default memo(Reading);