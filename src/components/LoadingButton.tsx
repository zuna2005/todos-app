interface LoadingButtonProps { 
    children: React.ReactNode; 
    loading: boolean;
    styles?: string;
    onClick?: () => void;
}
function LoadingButton({ children, loading, styles, onClick }: LoadingButtonProps) {
  return (
    <button className={"btn " + styles} disabled={loading} onClick={onClick}>
      {loading && (
        <>
          <span
            className="spinner-border spinner-border-sm me-1"
            aria-hidden="true"
          ></span>
        </>
      )}
      {children}
    </button>
  );
}

export default LoadingButton;
