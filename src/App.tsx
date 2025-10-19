import Router from './providers/Router';
import { Toaster } from 'react-hot-toast';
import { authService } from './services/auth.service';

function App() {
    console.log(authService.getMe());
    return (
        <div>
            <Router />
            <Toaster position={'top-right'} />
        </div>
    );
}

export default App;
