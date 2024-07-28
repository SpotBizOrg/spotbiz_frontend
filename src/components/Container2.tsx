function Container2({ children }: { children?: React.ReactNode }) {
    return (
          <div className="mx-auto w-full font-body h-full bg-gray-100 relative py-10 overflow-auto">
              {children}
          </div>
      );
  }
  
  export default Container2;
  