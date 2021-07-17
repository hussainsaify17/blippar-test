import { useEffect, useState } from 'react';
import './App.css';
import { url } from './constant';

function App() {
  const [resultSet, updateResultSet] = useState([])
  const [searchString, setSearchString] = useState('')
  const [flteredResult, udpateFilteredResult] = useState([])
  const [initializing, setInitializing] = useState(false)
  const [cachedResult, setCachedResult] = useState({})

  useEffect(() => {
    setInitializing(true)
    fetch(url).then(res => res.text())
      .then(res => {
        updateResultSet(res.split('\n'))
      })
      .finally(() => setInitializing(false))
  }, [])

  const handleChange = (e) => {
    let val = e.target.value
    setSearchString(e.target.value)
    if (val.length <= 3 || e.target.value.trim()==='') {
      udpateFilteredResult([])
      return
    }
    else if (cachedResult[val.substring(0, val.length - 1)]){
      let filterResult = cachedResult[val.substring(0, val.length - 1)].filter(x=> x.includes(val))
      udpateFilteredResult(filterResult)
      setCachedResult({
        ...cachedResult,
        [val]: filterResult
      })
    }
    else {
      let filterResult = resultSet.filter(x => x.includes(val))
      udpateFilteredResult(filterResult)
      setCachedResult({
        ...cachedResult,
        [val]: filterResult
      })
    }
  }
  const mark = (text) => {
    return text.replace(searchString,"<mark>"+searchString+"</mark>")

}

  return (
    <>
      <div className="App">
        Developer Name - Hussain Saify
        <div>
        {initializing ? <>Initializing...</> : (
            <input
              type='text'
              value={searchString}
              onChange={handleChange} />
        )}
        </div>
      </div>
      <ul>
        {flteredResult.map(val => <li key={val} dangerouslySetInnerHTML={{
          __html: mark(val)
        }}></li>)}
      </ul>
    </>
  );
}

export default App;
