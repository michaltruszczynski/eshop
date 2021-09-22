import { useState, useLayoutEffect } from 'react';

const useWindowSize = () => {
      const [windowSize, setWindowSize] = useState({
            width: null,
            height: null
      });

      useLayoutEffect(() => {
            function handleResize() {
                  console.log(window.innerHeight, window.innerWidth)
                  setWindowSize({
                        width: window.innerWidth,
                        height: window.innerHeight
                  });
            }

            window.addEventListener('resize', handleResize);

            handleResize();

            return () => {
                  window.removeEventListener('resize', handleResize);
            }
      }, []);

      return windowSize;
}

export default useWindowSize;
