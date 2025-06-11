import { useAppSelector } from "../state-manager/hooks";
import { selectLoading } from "../state-manager/loaderSlice";

function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const loading = useAppSelector(selectLoading);
  return (
    <div className="position-relative min-vh-100 p-3">
      {loading && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center z-3 bg-white bg-opacity-10">
          <div className="spinner-border text-primary"></div>
        </div>
      )}
      {children}
    </div>
  );
}

export default LoaderWrapper;
