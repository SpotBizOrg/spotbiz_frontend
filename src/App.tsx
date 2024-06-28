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
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Sidebar2 from './components/Sidebar2';

function App() {
 

  return (

	// <div className="h-screen flex">
  //     <Sidebar />
  //     <div className="flex-1 flex flex-col">
  //       <Navbar />
  //       <div className="flex-1 flex felx-row items-center bg-yellow">
	// 		<div className='w-1/6 bg-gray-200'>
	// 			this is another div
	// 		</div>
  //     {/* <Sidebar2 /> */}
  //         <div className="flex flex-col items-center w-5/6 justify-center bg-gray-500">
  //           <h1 className="text-3xl font-bold">Centered Content</h1>
  //           <p className="mt-4">This content is centered both vertically and horizontally.</p>
  //         </div>
  //       </div>
  //     </div>
  //   </div>


	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Guided />} />
			<Route path="/guided" element={<Guided2 />} />
	// 		{/* <Route path="/customer" element={<Customernavbar />} />
	// 		<Route path="/business" element={<Businessnavbarsidebar />} />
	// 		<Route path="/admin" element={<Adminnavbarsidebar />} /> */}


		</Routes>
	</BrowserRouter>
  )
}

export default App
