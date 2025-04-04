const EventsLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <div className="mt-28">
      {modal}
      {children}
    </div>
  );
};
export default EventsLayout;
