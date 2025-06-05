function SubmitButton({ children, loading }: { children: string; loading: boolean }) {
  return (
    <button className="btn btn-success mt-3" type="submit" disabled={loading}>
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

export default SubmitButton;
