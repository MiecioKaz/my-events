const NewEventLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-4/5 sm:w-1/2 h-fit mx-auto mt-28 sm:mt-40 p-4 sm:p-6 bg-slate-100 rounded-2xl shadow-xl dark:bg-slate-500">
      {children}
    </div>
  );
};
export default NewEventLayout;
