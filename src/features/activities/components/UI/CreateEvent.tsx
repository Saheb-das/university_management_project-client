import EventForm from "./EventForm";
import EventList from "./EventLists";

const CreateEvent = () => {
  return (
    <div className="min-h-screen  py-3 ">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-3">
          <EventForm />

          <EventList />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
