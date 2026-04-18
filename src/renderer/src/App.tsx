export function App(): React.JSX.Element {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-100 text-base-content p-4">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-5xl font-bold text-primary">MapsLeads</h1>
        <p className="text-lg">Get leads data from a maps information efficiently.</p>
        <div className="card bg-base-200 shadow-xl p-8">
          <div className="card-body items-center text-center">
            <h2 className="card-title mb-4">Ready to start?</h2>
            <div className="card-actions">
              <button
                className="btn btn-primary"
                onClick={() => window.electron.ipcRenderer.send('ping')}
              >
                Ping Main Process
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
