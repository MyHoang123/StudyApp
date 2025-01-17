import { memo, useEffect, useRef, useState } from "react";
function Write({Englishs, vietnameses, setEnglishs, setVietnamese, handleCheckResuilt, handleClickNext}) {
    const [Content,setEnglish] = useState({})
    const [Sum,setSum] = useState(0)
    const [active,setActive] = useState('E')
    const content = useRef()
    const SuccessEnglish = useRef()
    const SuccessVn = useRef()
    const handleString = (stringg) => {
        const withoutDiacritics = stringg.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); 
        const result = withoutDiacritics.replace(/\s+/g, '').toLowerCase(); 
        return result;
    }
    const handleCheckMatch = (Id,Result) => {
          SuccessVn.current.classList.add(`${Result}`)
          SuccessEnglish.current.classList.add(`${Result}`)
          setTimeout(() => {
            content.current.value = ''
            SuccessVn.current.classList.remove(`${Result}`)
            SuccessEnglish.current.classList.remove(`${Result}`)
            if(Result === 'sucessdelay') {
                if(Englishs.length > 1) {
                    setEnglishs(() => Englishs.filter((Eng) => Eng.Id !== Id))
                    setVietnamese(() => vietnameses.filter((Vn) => Vn.Id !== Id))
                }
                else {
                    handleClickNext()
                }
            }
          }, 500)
      }
    const handleClickSubmitVietnamese = (e) => {
        e.preventDefault()
       const value = handleString(content.current.value)
        vietnameses.forEach(element => {
            if(element.Id === Content.Id) {
               const result = handleString(element.Vietnamese)
               if(result === value) {
                    setSum(0)
                    handleCheckMatch(element.Id,'sucessdelay')
                    handleCheckResuilt(true)
               }else {
                    if(Sum < 2) {
                        handleCheckMatch(element.Id,'fail')
                        handleCheckResuilt(false)
                        setSum(prev => prev += 1 )
                    }
                    else {
                        alert(element.Vietnamese)
                        setSum(0)
                    }
               }
            }
        });
    }
    const handleClickSubmitEnglish = (e) => {
        e.preventDefault()
        const value = handleString(content.current.value)
        Englishs.forEach(element => {
            if(element.Id === Content.Id) {
                const result = handleString(element.English)
                if(result === value) {
                    setSum(0)
                    handleCheckMatch(element.Id,'sucessdelay')
                    handleCheckResuilt(true)
               }else {
                if(Sum < 3) {
                    handleCheckMatch(element.Id,'fail')
                    handleCheckResuilt(false)
                    setSum(prev => prev += 1 )
                }
                else {
                    alert(element.English)
                    setSum(0)
                }
               }
            }
        });
    }
    useEffect(() => {
        if(Englishs.length > 0 || vietnameses.length > 0) {
            if(active === 'E') {
                const Index = Math.floor(Math.random() * Englishs.length)
                setEnglish(Englishs[Index])
            }else {
                const Index = Math.floor(Math.random() * vietnameses.length)
                setEnglish(vietnameses[Index])
            }
        }
    },[Englishs,active,vietnameses])
    return (
        <>
            <div className='Table_content_item'>
                <h2 onClick={() => setActive('E')}>English</h2>
                <form onSubmit={(e) => handleClickSubmitEnglish(e)}>
                    <div className="Content_Enlish_container">
                            <label ref={SuccessEnglish} className='Content_Enlish'>
                                {active === 'E' ? Content.English : (
                                    <input spellCheck={false} ref={content} className="Content_Enlish-input" type="text"/>
                                )}
                            </label>
                    </div>
                    <button type="submit" className="btn-class-name English">
                            <span className="back"></span>
                            <span className="front"></span>
                    </button>
                </form>
            </div>
            <div className='Table_content_item'>
                <h2 onClick={() => setActive('V')}>Vietnamese</h2>
                <form onSubmit={(e) => handleClickSubmitVietnamese(e)}>
                    <div className="Content_vietnamese_container">
                            <label ref={SuccessVn} className='Content_Enlish'>
                                {active === 'V' ? Content.Vietnamese : (
                                    <input spellCheck={false} ref={content} className="Content_Enlish-input" type="text"/>
                                )}
                            </label>
                    </div>
                        <button type="submit" className="btn-class-name">
                            <span className="back"></span>
                            <span className="front"></span>
                        </button>
                </form>
            </div>
        </>
    );
}

export default memo(Write);