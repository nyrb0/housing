import Router from './providers/Router';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <div>
            <Router />
            <Toaster position={'top-right'} />
        </div>
    );
}

export default App;
