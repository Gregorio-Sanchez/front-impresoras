import ReactDOM from 'react-dom/client'
import { SapsprintApp2 } from './SapsprintApp2.jsx'
import { BrowserRouter } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    {/* // <React.StrictMode> */}
    <SapsprintApp2 />
    {/* // </React.StrictMode>, */}
  </BrowserRouter>
)