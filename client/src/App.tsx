import MainNavigation from "./components/layout/MainNavigation";
import MainPage from "./pages/MainPage";

export default function App(){
    return(
        <div style={{height: '100vh'}}>
            <MainNavigation/>
            <MainPage/>
        </div>
    );
}
