// eslint-disable-next-line import/no-extraneous-dependencies
import { LineWave } from "react-loader-spinner"

export const LoaderView = () => (
  <div className="absolute top-0 left-0 right-0 bottom-0 m-auto w-32 h-32 flex justify-center items-center">
    <LineWave
      visible
      height="100"
      width="100"
      color="#2D0D4C"
      ariaLabel="line-wave-loading"
      wrapperStyle={{}}
      wrapperClass=""
      firstLineColor=""
      middleLineColor=""
      lastLineColor=""
    />
  </div>
)