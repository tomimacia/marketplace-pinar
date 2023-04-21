import { useOnKeyPress } from "./useOnKey";

export const useEnter = (ref, callback) => {
    const callBackEnter = (ref, callback) => {
        if (document.activeElement === ref) {
          callback();
        }
      };
  return useOnKeyPress("Enter", ()=>callBackEnter(ref, callback));
};
