function Container({ children }: { children?: React.ReactNode }) {
  return (
        <div className="mx-auto w-full font-body h-auto bg-gray-100 relative py-10 overflow-auto">
            {children}
        </div>
    );
}

export default Container;
