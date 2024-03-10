// import Versions from './components/Versions'
// import electronLogo from './assets/electron.svg'

function App() {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <div>Hello</div>
    </>
  )
}

export default App
