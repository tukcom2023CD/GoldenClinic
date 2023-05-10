import React from 'react';
import classes from './MainPage.module.css';

const MainPage = () => {
    const imglist = ["https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/a47bfcb8-63df-4be5-a60f-9434baa6da18.jpg", "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/20139e33-d871-4de9-a2e8-18a3024af36d.jpg", "https://product-image.kurly.com/cdn-cgi/image/quality=85/banner/main/pc/img/f736706e-a26a-4105-b1d2-f1843b9f2aef.jpg"]
    const delay = 2500;

    const [State, setState] = React.useState(0);
    const timeRef = React.useRef(null);

    function resetTimeout() {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }
    }

    React.useEffect(() => {
        resetTimeout();
        timeRef.current = setTimeout(
            () =>
                setState((prevState) =>
                    prevState === 3 - 1 ? 0 : prevState + 1), delay);

        return () => {
            resetTimeout();
        };
    }, [State]);

    return (
        <div>
            <div className={classes.headerSpacer}></div>
            <div className="marketimg">
                <img src={imglist[State]} alt="banner"></img>
            </div>
            <div className={classes.underAdContainer}>
                <div>추천 여행지</div>
                <div className={classes.container}>
                    <button></button>
                    <button></button>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
            </div>
        </div>
    )

};

export default MainPage;
