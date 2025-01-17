import { useCallback, useEffect, useRef, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Reading from './pages/Reading';
import Write from './pages/Write';
import All from './pages/All';
import logo from './logo.svg';
import angry from './OIP__4_-removebg-preview.png'
function App() {
  const [Page, setPage] = useState(1)
  const [Englishs, setEnglish] = useState([])
  const [vietnameses, setVietnamese] = useState([])
  const [Topics, setTopics] = useState([])
  const [TopicActive, setTopicActive] = useState(1)
  const minhthuRef = useRef()
  const getVocabulary = async (Id, page) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v12/getvocabulary?Id=${Id}&Index=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      const Vietnamese = handleRandom(result.Vietnamese)
      const English = handleRandom(result.English)
      setVietnamese(Vietnamese)
      setEnglish(English)
    } catch (error) {
      alert('Có lõi xảy ra')
    }
  }
  const handleChangeTopic = (e) => {
    setPage(1)
    setTopicActive(e.target.value)
    getVocabulary(e.target.value, 1)
  }
  const handleClickNext = () => {
    getVocabulary(TopicActive, Page + 1)
    setPage(prev => prev += 1)
  }
  const handleClickPrev = () => {
    if (Page > 0) {
      getVocabulary(TopicActive, Page - 1)
      setPage(prev => prev -= 1)
    }
  }
  const handleRandom = (arr) => {
    const newArr = [...arr]
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr
  }
  const handleCheckResuilt = useCallback((result) => {
    if (result) {
      minhthuRef.current.classList.add('success')
      setTimeout(() => {
        minhthuRef.current.classList.remove('success')
      }, 500)
    }
    else {
      minhthuRef.current.classList.add('angry')
      setTimeout(() => {
        minhthuRef.current.classList.remove('angry')
      }, 500)
    }

  }, [])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/v12/gettopics');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setTopics(result.topics)
      } catch (error) {
        alert('Có lõi xảy ra')
      }
    };
    getVocabulary(1, 1)
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className='Container_box'>
        <div className='Sidebar_container'>
          <div className='Sidebar_container-item'>
            <Link to='/' className='Sidebar_container_item--title'>Đọc-Hiểu</Link>
          </div>
          <div className='Sidebar_container-item'>
            <Link to='/write' className='Sidebar_container_item--title'>Viết-Hiểu</Link>
          </div>
          <div className='Sidebar_container-item'>
            <Link to='/all' className='Sidebar_container_item--title'>Tổng-Hợp</Link>
          </div>
        </div>
        <div className='Content_box'>
          <h1>LearnEnglishApp</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <div ref={minhthuRef} className="minhthu">
            <span className="loader"></span>
            <img className='angry_item' src={angry} />
          </div>
          <div className='Content_box_topics'>
            <select onChange={(e) => handleChangeTopic(e)} className='Content_box_topics-select'>
              {Topics.map((topic) => (
                <option key={topic.Id} value={topic.Id}>{topic.Name}</option>
              ))}
            </select>
          </div>
          <div className='Table_content'>
            <Routes>
              <Route path='/' element={<Reading Englishs={Englishs} vietnameses={vietnameses} handleCheckResuilt={handleCheckResuilt} />} />
              <Route path='/write' element={<Write handleClickNext={handleClickNext} Englishs={Englishs} setEnglishs={setEnglish} vietnameses={vietnameses} setVietnamese={setVietnamese} handleCheckResuilt={handleCheckResuilt} />} />
              <Route path='/all' element={<All handleCheckResuilt = {handleCheckResuilt} />} />
            </Routes>
          </div>
          <button onClick={() => handleClickNext()} className='button_next'>Next</button>
          <button onClick={() => handleClickPrev()} className='button_prev'>Prev</button>
        </div>
      </div>
    </div>
  );
}

export default App;
