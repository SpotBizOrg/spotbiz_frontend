// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Guided from './pages/Guided'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Guided2 from './pages/Guided2';
import Guided3 from './pages/Guided3';
import AdminVerify from './pages/BusinessVerify';


function App() {
 

  return (

	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Guided />} />
			<Route path="/guided" element={<Guided2 />} />
			<Route path="/guided3" element={<Guided3 />} />
			<Route path="/admin_verify" element={<AdminVerify />} />
	
		</Routes>
	</BrowserRouter>
  )
}

export default App
