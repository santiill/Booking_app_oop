import HomePage from "./components/homePage/HomePage";
import Reserves from "./components/reserves/Reserves";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* const BookCalendar = () => {

  const [data, setData] = useState(new Date())

  const handleChange = (data) => {
      setData(data)
  } 

  return (
      <div >
          <Calendar className='calendar' onChange={handleChange} value={data} />
          {console.log(data)}
          {data.toString()}
      </div>
  )
} */

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/reserves" element={<Reserves />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
