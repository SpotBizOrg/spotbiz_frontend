// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Nousernavbar from './components/Nousernavbar'
import Customernavbar from './components/Customernavbar'
import Businessnavbarsidebar from './components/Businessnavbarsidebar';
import Adminnavbarsidebar from './components/Adminnavbarsidebar';
import Guided from './pages/Guided'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guided2 from './pages/Guided2';
import Guided3 from './pages/Guided3';

function App() {
 

  return (

	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Guided />} />
			<Route path="/guided" element={<Guided2 />} />
			<Route path="/guided3" element={<Guided3 />} />
	
		</Routes>
	</BrowserRouter>
  )
}

export default App
