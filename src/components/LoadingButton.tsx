interface LoadingButtonProps { 
    children: React.ReactNode; 
    loading: boolean;
    styles?: string;
    type?: "submit" | "reset" | "button" | undefined;
    onClick?: () => void;
}
function LoadingButton({ children, loading, styles, type, onClick }: LoadingButtonProps) {
  return (
    <button className={"btn " + styles} type={type} disabled={loading} onClick={onClick}>
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
