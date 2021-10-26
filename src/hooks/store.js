import { useStore } from "../store";
import shallow from "zustand/shallow";

const useStoreProps = (variableStrings) => {
  return useStore(
    (state) =>
      variableStrings.reduce(
        (result, variableString) => ({
          ...result,
          [variableString]: state[variableString],
        }),
        {}
      ),
    shallow
  );
};

export { useStoreProps };
