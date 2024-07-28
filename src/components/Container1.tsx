function Container({ children }: { children?: React.ReactNode }) {
    return (
          <div className="mx-auto w-full font-body h-full bg-gray-100 relative py-4">
              {children}
          </div>
      );
  }
  
  export default Container;
  