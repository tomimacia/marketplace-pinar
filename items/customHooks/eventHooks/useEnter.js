import { useOnKeyPress } from "./useOnKeyPress";


// ref => element that has to be active to trigger
// callback => callback function that enter will do
export const useEnter = (ref, callback) => {
    const callBackEnter = (ref, callback) => {
        if (document.activeElement === ref) {
          callback();
        }
      };
  return useOnKeyPress("Enter", ()=>callBackEnter(ref, callback));
};
