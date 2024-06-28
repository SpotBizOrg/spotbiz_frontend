function Container({ children }: { children?: React.ReactNode }) {
  return (
        <div className="container bg-gray-100 h-screen relative">
            {children}
        </div>
    );
}

export default Container;